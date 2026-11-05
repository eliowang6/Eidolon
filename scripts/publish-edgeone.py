#!/usr/bin/env python3
"""Build and publish the static site to EdgeOne Pages (Makers).

This is the Pages release channel: the main site and the eidolon product
sub-domain are two separate Pages projects, each fed from one ZIP built here.
The eidolon FastAPI server keeps serving only the API; the marketing pages are
expected to be served by Pages, with Azure as the origin fallback until DNS is
cut over.

    python scripts/publish-edgeone.py                 # build → package → deploy all projects
    python scripts/publish-edgeone.py --no-deploy     # stop after writing the ZIPs
    python scripts/publish-edgeone.py --skip-docs-build   # reuse an existing docs/build
    python scripts/publish-edgeone.py --skip-site-build   # reuse an existing eidolon-site
    python scripts/publish-edgeone.py --only main     # deploy just one project
                                                # main|sub|dashboard|web
    python scripts/publish-edgeone.py --env preview   # deploy to the preview environment
    python scripts/publish-edgeone.py --dry-run       # resolve everything, deploy nothing

Credentials and project names come from the environment, optionally seeded from
<site root>/.env:

    EDGEONE_API_TOKEN   API Token from the Pages console (required to deploy)
    EDGEONE_MAIN_PROJECT       project serving instarmony.com            (default: instarmony-main-overseas)
    EDGEONE_SUB_PROJECT        project serving sholarel.instarmony.com    (default: eidolon-overseas-test)
    EDGEONE_DASHBOARD_PROJECT  project serving dashboard.eidolon.instarmony.com
                                                                            (default: eidolon-dashboard-overseas)
    EDGEONE_AREA           overseas | global                          (default: overseas)

    Pick `overseas` unless you have ICP filing. In the `global` area the default
    *.edgeone.cool domain only serves token-verified 3h previews (401 otherwise),
    and Add custom domain stays disabled until the domain is filed. The
    `overseas` area serves *.edgeone.dev directly, needs no token, and does allow
    custom domains — but mainland visitors are blocked by policy.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT / "dist"

# Project names are read lazily in main(), *after* load_env_file() seeds
# os.environ. Resolving them at import time would silently pin the defaults and
# make .env look like it was being ignored.
DEFAULT_MAIN_PROJECT = "instarmony-main-overseas"
DEFAULT_SUB_PROJECT = "eidolon-overseas-test"
DEFAULT_DASHBOARD_PROJECT = "eidolon-dashboard-overseas"
DEFAULT_WEB_PROJECT = "eidolon-web-overseas"

# The admin console is built in the eidolon repo (server/dashboard -> server/dashboard_dist),
# not here. Dashboard Pages deploys read the artifact from that sibling checkout so
# the admin UI ships through this single release channel.
EIDOLON_REPO = Path(os.environ.get("EIDOLON_REPO", r"D:\work\eidolon"))
DASHBOARD_DIST = EIDOLON_REPO / "server" / "dashboard_dist"
# The browser client (client -> client/dist) is the same story: built in the eidolon
# repo, ~288 MB of Live2D themes/models/animations, served from its own Pages project.
WEB_DIST = EIDOLON_REPO / "client" / "dist"

# Build scratch and deployment plumbing never ship as site content.
# The dot-directories are local tooling state: .edgeone/ holds the project id,
# .claude/ a local launch profile, .workbuddy-ai/ the internal working notes.
# None of them is site content, and a Pages ZIP makes every member fetchable —
# the working notes would be readable at https://instarmony.com/.workbuddy-ai/.
# .well-known/ is the opposite: those files (payment-provider verification) must
# be reachable, so it stays.
EXCLUDE_DIRS = {"node_modules", ".docusaurus", ".cache", ".git", ".github",
                "scripts", "dist", "eidolon-site", "eidolon-web",
                ".claude", ".edgeone", ".workbuddy-ai", "seo"}
EXCLUDE_FILES = {
    "README.md", ".gitignore", ".gitattributes", "w.html",
    # Astro content-layer scratch emitted next to the built HTML.
    "content-assets.mjs", "content-modules.mjs",
    # web build mirror assets (local experiments, not deployed on AWS)
    "main.3ea39a4c.js", "main.dfea661b.js",
    # The redirect rules live in a file the platform has to find at the ZIP
    # root. add_tree must not ship it as page content as well — that would
    # write the same member twice — so the deploy step injects it alone.
    "edgeone.json",
}

# The EdgeOne custom-rules file. It must be inside the ZIP for the platform to
# apply the redirects, but it is not site content: left in the package it would
# be served as a readable file at /edgeone.json, advertising the redirect map.
# `add_tree` drops it from the payload; the deploy step injects it separately.
EDGEONE_JSON = "edgeone.json"
# The product sub-domain is a separate Pages project with its own host, so it
# carries its own rules file.
EDGEONE_SUB_JSON = "edgeone.sub.json"

# Secrets and local tooling config must never ship. .env holds EDGEONE_API_TOKEN
# in plaintext, and a Pages ZIP makes every member publicly fetchable at
# /.env — shipping it would hand the deploy token to anyone. Matched by name so
# that .env.local / .env.production / .env.* are covered too.
EXCLUDE_SECRET_FILES = re.compile(r"^\.env(\..+)?$|^.*\.pem$|^.*\.key$|^id_(rsa|ed25519)")

# Hashed web-build js at the repo root is a local experiment, not site content.
ROOT_HASHED_JS = re.compile(r"^[0-9a-f]{8}\.[0-9a-f]{8}\.js$")

# The server's release script refuses a package missing any of these; keep the
# Pages payload honest about the same entries.
REQUIRED_MAIN_ENTRIES = ("index.html", "eidolon/index.html", "robots.txt",
                         "sitemap.xml")
REQUIRED_SUB_ENTRIES = (
    "index.html", "en/index.html", "404.html", "en/404.html",
    "features.html", "en/features.html",
    "how-it-works.html", "en/how-it-works.html",
    "beta.html", "en/beta.html",
    "pricing.html", "en/pricing.html",
    "download.html", "en/download.html",
    "about.html", "en/about.html",
    "docs.html", "en/docs.html",
    "privacy.html", "terms.html", "en/privacy.html", "en/terms.html",
    # The Docusaurus docs ship on this host, under /docs/.
    "docs/index.html", "docs/en/index.html",
    "assets/logo-infinity.png", "assets/og-zh.png", "assets/og-en.png",
    # Search-engine plumbing. A 404 robots.txt is a real indexing blocker for
    # Baidu/Bing, so it must never silently drop out of the package. sitemap.xml
    # is flattened from Astro's sitemap-0.xml by scripts/seo-submit.mjs.
    "robots.txt", "sitemap.xml",
)
# The console is a hash-router SPA: every route lives behind #, so a single
# index.html at the root is the whole site.
REQUIRED_DASHBOARD_ENTRIES = ("index.html",)
# The browser client is also an SPA: it uses history routing and loads hashed
# assets from /assets/, so index.html plus that directory prefix must ship.
REQUIRED_WEB_ENTRIES = ("index.html", "assets/")


def load_env_file(path: Path) -> int:
    """Seed os.environ from a KEY=VALUE file without overriding real env values."""
    if not path.is_file():
        return 0
    loaded = 0
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip().removeprefix("export ").strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value
            loaded += 1
    return loaded


def run(command: list[str], cwd: Path) -> None:
    print(f"[RUN] {' '.join(command)}  (cwd: {cwd.name})")
    completed = subprocess.run(command, cwd=str(cwd), shell=False)
    if completed.returncode != 0:
        raise SystemExit(f"[ERROR] Command failed with exit code {completed.returncode}: {' '.join(command)}")


def build_docs(skip_build: bool) -> None:
    docs = ROOT / "docs"
    if skip_build:
        if not (docs / "build" / "index.html").is_file():
            raise SystemExit("[ERROR] --skip-docs-build but docs/build/index.html is missing. Run without the flag first.")
        print("[INFO] Reusing the existing docs/build output.")
        return
    if not (docs / "package.json").is_file():
        raise SystemExit("[ERROR] docs/package.json not found — the docs project is missing.")
    npm = "npm.cmd" if os.name == "nt" else "npm"
    if not (docs / "node_modules").is_dir():
        run([npm, "ci"], cwd=docs)
    run([npm, "run", "build"], cwd=docs)


def build_product_site(skip_build: bool) -> None:
    """Build the Astro project into <repo>/eidolon-site (the sub-domain payload)."""
    project = ROOT / "eidolon-web"
    output = ROOT / "eidolon-site"
    if skip_build:
        if not (output / "index.html").is_file():
            raise SystemExit(
                "[ERROR] --skip-site-build but eidolon-site/index.html is missing. "
                "Run without the flag first."
            )
        print("[INFO] Reusing the existing eidolon-site output.")
        return
    if not (project / "package.json").is_file():
        raise SystemExit("[ERROR] eidolon-web/package.json not found — the Astro project is missing.")
    npm = "npm.cmd" if os.name == "nt" else "npm"
    if not (project / "node_modules").is_dir():
        run([npm, "ci"], cwd=project)
    run([npm, "run", "build"], cwd=project)


def generate_seo() -> None:
    script = ROOT / "scripts" / "seo-submit.mjs"
    if not script.is_file():
        raise SystemExit("[ERROR] scripts/seo-submit.mjs not found — sitemap.xml would go stale.")
    run(["node", str(script), "generate"], cwd=ROOT)


def add_tree(zf: zipfile.ZipFile, base: Path, at_repo_root: bool = False,
             skip_top: tuple[str, ...] = ()) -> int:
    """Add every publishable file under base at the ZIP root.

    at_repo_root marks the main-site walk, where hashed web-build JS sitting
    directly in the repository root is a local experiment. Nested builds (e.g.
    docs/build/assets/js/) must keep theirs, so the filter never applies there.

    skip_top names top-level directories to leave out of this particular
    archive. The docs build moved to the product sub-domain, so the main-site
    payload no longer carries it.
    """
    n = 0
    for p in sorted(base.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(base)
        parts = set(rel.parts[:-1]) | {rel.name}
        if parts & EXCLUDE_DIRS:
            continue
        if rel.name in EXCLUDE_FILES:
            continue
        if EXCLUDE_SECRET_FILES.match(rel.name):
            continue
        if at_repo_root and len(rel.parts) == 1 and ROOT_HASHED_JS.match(rel.name):
            continue
        if at_repo_root and rel.parts[0] in skip_top:
            continue
        zf.write(p, rel.as_posix())
        n += 1
    return n


def inject_edgeone_json(archive: Path, source: Path) -> None:
    """Put edgeone.json at the ZIP root so the platform applies its rules.

    The file is written straight into the archive after the payload walk: the
    platform needs it at the root to pick the redirects up, but it must not be
    part of the site's public file tree.
    """
    if not source.is_file():
        raise SystemExit(f"[ERROR] {source} is missing — the redirects would not be applied.")
    with zipfile.ZipFile(archive, "a", zipfile.ZIP_DEFLATED) as zf:
        zf.write(source, EDGEONE_JSON)


def add_docs_tree(zf: zipfile.ZipFile, docs_build: Path) -> int:
    """Add the Docusaurus output to a ZIP under /docs/.

    The docs are built with baseUrl /docs/, so their own asset and link URLs
    already point at /docs/... — dropping the tree under that prefix makes
    them resolve correctly at sholarel.instarmony.com/docs/...
    """
    if not docs_build.is_dir():
        raise SystemExit(
            f"[ERROR] {docs_build} is missing — the docs would be missing from the "
            "product site. Run the docs build first."
        )
    n = 0
    for p in sorted(docs_build.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(docs_build)
        parts = set(rel.parts[:-1]) | {rel.name}
        if parts & EXCLUDE_DIRS:
            continue
        if rel.name in EXCLUDE_FILES:
            continue
        if EXCLUDE_SECRET_FILES.match(rel.name):
            continue
        zf.write(p, (Path("docs") / rel).as_posix())
        n += 1
    return n


def package(archive: Path, base: Path, at_repo_root: bool = False,
            skip_top: tuple[str, ...] = ()) -> int:
    DIST_DIR.mkdir(parents=True, exist_ok=True)
    if archive.exists():
        # A viewer or a parallel run can still hold the old archive open.
        for attempt in range(5):
            try:
                archive.unlink()
                break
            except PermissionError:
                if attempt == 4:
                    raise SystemExit(
                        f"[ERROR] {archive.name} is locked by another process. "
                        "Close anything reading it and re-run."
                    )
                time.sleep(1.0)
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as zf:
        return add_tree(zf, base, at_repo_root, skip_top)


def verify(archive: Path, required: tuple[str, ...]) -> None:
    """Fail loudly if a package is missing an entry the site needs.

    A trailing "/" marks a directory requirement: it matches when at least one
    ZIP member sits under that prefix. ZIPs store files only, so "assets" would
    never appear in namelist() while "assets/index-abc.js" does.
    """
    with zipfile.ZipFile(archive) as zf:
        names = set(zf.namelist())
    missing: list[str] = []
    for entry in required:
        if entry.endswith("/"):
            prefix = entry
            if not any(name.startswith(prefix) for name in names):
                missing.append(entry)
        elif entry not in names:
            missing.append(entry)
    if missing:
        print(f"[ERROR] {archive.name} would be incomplete:")
        for entry in missing:
            print(f"          - {entry}")
        raise SystemExit(1)


def probe(url: str) -> tuple[str, str]:
    """Report the HTTP status of a freshly deployed URL.

    A bare `*.edgeone.cool` URL answers 401 by design: the default domain only
    serves token-verified previews (`?eo_token=...&eo_time=...`, valid 3h),
    which the edge exchanges for an HttpOnly cookie via a 302. So follow
    redirects *with* a cookie jar, or every deploy looks broken.

    Returns (status, note). A 401 after following redirects is the real signal
    that the deployment expired or a custom domain is missing.
    """
    import http.cookiejar
    import urllib.error
    import urllib.request

    jar = http.cookiejar.CookieJar()

    def probe_once(target: str) -> tuple[int, str]:
        request = urllib.request.Request(target, headers={"User-Agent": "publish-edgeone-probe"})
        opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
        try:
            with opener.open(request, timeout=30) as response:
                return response.status, ""
        except urllib.error.HTTPError as error:
            return error.code, error.headers.get("X-EOP-MSG", "") if error.headers else ""

    try:
        status, note = probe_once(url)
    except Exception as error:  # noqa: BLE001 - a probe must never fail the deploy
        return "unreachable", error.__class__.__name__

    if status == 401:
        if "eo_time" in note:
            return status, "default domain needs a token preview link (this is normal)"
        return status, "token preview missing/expired — regenerate it in the console"
    return status, note


def deploy(archive: Path, project: str, env: str, area: str, dry_run: bool) -> str:
    token = os.environ.get("EDGEONE_API_TOKEN", "").strip()
    if dry_run:
        print(f"[DRY-RUN] Would deploy {archive.name} -> project '{project}' "
              f"(env={env}, area={area}, token={'set' if token else 'MISSING'})")
        return ""
    if not token:
        print(f"[NOTICE] EDGEONE_API_TOKEN absent — skipping {project}.")
        print("         Generate one in the Pages console and put it in <site root>/.env.")
        return ""

    command = [
        "npx", "--yes", "edgeone@latest", "pages", "deploy", str(archive),
        "-n", project, "-e", env, "-a", area, "-t", token, "--json",
    ]
    print(f"[RUN] edgeone pages deploy -> project '{project}' (env={env})")
    completed = subprocess.run(command, cwd=str(ROOT), shell=True,
                               capture_output=True, text=True, encoding="utf-8", errors="replace")
    output = (completed.stdout or "") + (completed.stderr or "")
    print(output.strip())
    if completed.returncode != 0:
        print(f"[ERROR] edgeone CLI exited {completed.returncode} for project '{project}'.")
        raise SystemExit(1)

    deploy_url = ""
    for line in output.splitlines():
        line = line.strip()
        if line.startswith("{") and '"url"' in line:
            try:
                deploy_url = json.loads(line).get("url", "")
            except json.JSONDecodeError:
                pass
        if "EDGEONE_DEPLOY_URL" in line or '"deployUrl"' in line:
            print(f"[OK] {project}: {line}")

    if deploy_url:
        status, note = probe(deploy_url)
        print(f"[CHECK] {deploy_url} -> HTTP {status}" + (f" ({note})" if note else ""))
        if status == "401":
            print("[NOTE] The bare *.edgeone.cool domain only serves token-verified")
            print("       previews (3h validity). That 401 does NOT mean the deploy")
            print("       failed. For a permanent URL, bind a custom domain under")
            print("       Makers -> Domains.")
    return deploy_url


def main() -> int:
    parser = argparse.ArgumentParser(description="Package and publish the site to EdgeOne Pages")
    parser.add_argument("--no-deploy", action="store_true", help="build and package only")
    parser.add_argument("--skip-docs-build", action="store_true", help="reuse an existing docs/build")
    parser.add_argument("--skip-site-build", action="store_true", help="reuse an existing eidolon-site")
    parser.add_argument("--only", choices=["main", "sub", "dashboard", "web"],
                        help="deploy a single project")
    parser.add_argument("--env", choices=["production", "preview"], default="production",
                        help="EdgeOne Pages environment (default: production)")
    parser.add_argument("--dry-run", action="store_true", help="resolve everything, deploy nothing")
    args = parser.parse_args()

    print(f"Site root: {ROOT}")
    print(f"Seeded {load_env_file(ROOT / '.env')} keys from .env")
    area = os.environ.get("EDGEONE_AREA", "overseas")

    build_docs(args.skip_docs_build)
    build_product_site(args.skip_site_build)
    generate_seo()

    main_zip = DIST_DIR / "instarmony-website-pages.zip"
    sub_zip = DIST_DIR / "eidolon-product-pages.zip"

    # The docs now live on the product sub-domain, so the lab payload no longer
    # carries them. The old /docs/build/* URLs stay reachable through the 301
    # rules in edgeone.json.
    n_main = package(main_zip, ROOT, at_repo_root=True, skip_top=("docs",))
    print(f"[OK] main site: {n_main} files -> {main_zip.name} "
          f"({main_zip.stat().st_size / 1024 / 1024:.1f} MB)")
    verify(main_zip, REQUIRED_MAIN_ENTRIES)
    inject_edgeone_json(main_zip, ROOT / EDGEONE_JSON)

    n_sub = package(sub_zip, ROOT / "eidolon-site")
    # The Docusaurus build is a sibling of the Astro output, so it is added
    # under /docs/ to land at sholarel.instarmony.com/docs/. package() already
    # closed the archive, so it is reopened for the append.
    with zipfile.ZipFile(sub_zip, "a", zipfile.ZIP_DEFLATED) as zf:
        n_docs = add_docs_tree(zf, ROOT / "docs" / "build")
    print(f"[OK] product site: {n_sub + n_docs} files -> {sub_zip.name} "
          f"({sub_zip.stat().st_size / 1024 / 1024:.1f} MB)")
    verify(sub_zip, REQUIRED_SUB_ENTRIES)
    # The product sub-domain serves its own host, so it needs its own rules.
    # Today that is just HSTS; the lab's redirect rules would send sub-domain
    # traffic to the wrong place.
    inject_edgeone_json(sub_zip, ROOT / EDGEONE_SUB_JSON)

    # Admin console: built by the eidolon repo, deployed to its own Pages project.
    # Skipped with a notice when the artifact is absent so this script still works
    # on a machine that only has the website checkout.
    dash_zip = DIST_DIR / "eidolon-dashboard-pages.zip"
    dash_ready = False
    if DASHBOARD_DIST.is_dir():
        n_dash = package(dash_zip, DASHBOARD_DIST)
        print(f"[OK] dashboard: {n_dash} files -> {dash_zip.name} "
              f"({dash_zip.stat().st_size / 1024 / 1024:.1f} MB)")
        verify(dash_zip, REQUIRED_DASHBOARD_ENTRIES)
        dash_ready = True
    else:
        print(f"[SKIP] dashboard_dist not found at {DASHBOARD_DIST} — "
              f"build it with `npm run build` in eidolon/server/dashboard.")

    # Browser client. 288 MB of Live2D themes/models/animations; largest single
    # file is ~17 MB (models/default_female.vrm), well under the Pages per-file
    # limit, so it ships as one archive.
    web_zip = DIST_DIR / "eidolon-web-pages.zip"
    web_ready = False
    if WEB_DIST.is_dir():
        n_web = package(web_zip, WEB_DIST)
        print(f"[OK] web client: {n_web} files -> {web_zip.name} "
              f"({web_zip.stat().st_size / 1024 / 1024:.1f} MB)")
        verify(web_zip, REQUIRED_WEB_ENTRIES)
        web_ready = True
    else:
        print(f"[SKIP] client/dist not found at {WEB_DIST} — "
              f"build it with `npm run build` in eidolon/client.")

    targets = []
    if args.only in (None, "main"):
        targets.append((main_zip, os.environ.get("EDGEONE_MAIN_PROJECT", DEFAULT_MAIN_PROJECT)))
    if args.only in (None, "sub"):
        targets.append((sub_zip, os.environ.get("EDGEONE_SUB_PROJECT", DEFAULT_SUB_PROJECT)))
    if args.only in (None, "dashboard"):
        if dash_ready:
            targets.append((dash_zip, os.environ.get("EDGEONE_DASHBOARD_PROJECT",
                                                     DEFAULT_DASHBOARD_PROJECT)))
        elif args.only == "dashboard":
            raise SystemExit("[ERROR] --only dashboard requested but dashboard_dist is missing.")

    if web_ready:
        if args.only in (None, "web"):
            targets.append((web_zip, os.environ.get("EDGEONE_WEB_PROJECT", DEFAULT_WEB_PROJECT)))
    elif args.only == "web":
        raise SystemExit("[ERROR] --only web requested but client/dist is missing.")

    if args.no_deploy:
        print("[INFO] --no-deploy: stopping here.")
        return 0

    for archive, project in targets:
        deploy(archive, project, args.env, area, args.dry_run)

    print()
    print("Publish complete. Verify the live sites:")
    print("  https://instarmony.com/")
    print("  https://sholarel.instarmony.com/")
    if dash_ready:
        print("  https://dashboard.eidolon.instarmony.com/")
    if web_ready:
        print("  https://web.eidolon.instarmony.com/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
