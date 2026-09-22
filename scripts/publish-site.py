#!/usr/bin/env python3
"""Build, package and publish the instarmony.com website to Cloudflare R2.

This is the site's own release channel; it no longer rides along with the
Eidolon desktop release. The server picks the package up with install-site.sh.

    python scripts/publish-site.py                 # docs build + SEO + package + upload
    python scripts/publish-site.py --no-upload     # stop at the local tarball
    python scripts/publish-site.py --skip-docs-build   # reuse an existing docs/build
    python scripts/publish-site.py --purge-cache   # purge the R2 object URL on the CDN

Credentials come from the environment, optionally seeded from <site root>/.env:
    CF_R2_ACCOUNT_ID / CF_R2_ACCESS_KEY_ID / CF_R2_SECRET_ACCESS_KEY
    CF_R2_BUCKET_NAME (default: eidolon)
    CF_R2_PUBLIC_URL  (default: https://storage.instarmony.com)
    CF_ZONE_ID + CF_API_TOKEN   (only needed for --purge-cache)
"""

import argparse
import hashlib
import io
import os
import subprocess
import sys
import tarfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT / "dist"
ARCHIVE_NAME = "Instarmony_Website_Release.tar.gz"
OBJECT_KEY = f"deploy/{ARCHIVE_NAME}"

# install-site.sh refuses a package that is missing any of these.
REQUIRED_ENTRIES = (
    "index.html",
    "eidolon/index.html",
    "docs/build/index.html",
    "docs/build/en/index.html",
)

# Build scratch and deployment plumbing never ship as site content.
PRUNE_DIRS = {".git", "node_modules", ".docusaurus", ".cache", "dist"}
SKIP_NAMES = {".env", ".DS_Store"}


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


def generate_seo() -> None:
    script = ROOT / "scripts" / "seo-submit.mjs"
    if not script.is_file():
        raise SystemExit("[ERROR] scripts/seo-submit.mjs not found — sitemap.xml would go stale.")
    run(["node", str(script), "generate"], cwd=ROOT)


def iter_payload():
    """Yield site files in a stable order, pruning build scratch from the walk."""
    stack = [ROOT]
    while stack:
        current = stack.pop()
        with os.scandir(current) as handle:
            entries = sorted(handle, key=lambda entry: entry.name)
        for entry in entries:
            path = Path(entry.path)
            if entry.is_dir(follow_symlinks=False):
                if entry.name in PRUNE_DIRS:
                    continue
                stack.append(path)
            elif entry.is_file(follow_symlinks=False):
                if entry.name in SKIP_NAMES or entry.name.endswith(".pyc"):
                    continue
                yield path
            else:
                print(f"[WARN] Skipping unsupported entry: {path.relative_to(ROOT).as_posix()}")


def package(archive: Path) -> int:
    """Write the deployment tarball; returns the number of files added.

    Member names are './<relative>' because install-site.sh maps them straight
    onto the site root and rejects anything absolute, escaped or duplicated.
    """
    DIST_DIR.mkdir(parents=True, exist_ok=True)
    if archive.exists():
        archive.unlink()
    files = 0
    with archive.open("wb") as sink, tarfile.open(fileobj=sink, mode="w:gz") as tar:
        for path in iter_payload():
            arcname = "./" + path.relative_to(ROOT).as_posix()
            payload = path.read_bytes()
            info = tarfile.TarInfo(arcname)
            info.size = len(payload)
            info.mtime = int(path.stat().st_mtime)
            info.mode = 0o755 if arcname.endswith(".sh") else 0o644
            info.type = tarfile.REGTYPE
            tar.addfile(info, io.BytesIO(payload))
            files += 1
    return files


def sha256_of(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def upload(archive: Path, dry_run: bool) -> bool:
    account_id = os.environ.get("CF_R2_ACCOUNT_ID")
    access_key = os.environ.get("CF_R2_ACCESS_KEY_ID")
    secret_key = os.environ.get("CF_R2_SECRET_ACCESS_KEY")
    bucket = os.environ.get("CF_R2_BUCKET_NAME", "eidolon")
    if not (account_id and access_key and secret_key):
        print("[NOTICE] R2 credentials absent (CF_R2_ACCOUNT_ID / CF_R2_ACCESS_KEY_ID / CF_R2_SECRET_ACCESS_KEY).")
        print("         Set them in <site root>/.env or the shell environment to publish.")
        return False
    try:
        import boto3
        from botocore.config import Config
    except ImportError:
        print("[ERROR] boto3 is required to upload: python -m pip install boto3")
        return False
    endpoint = f"https://{account_id}.r2.cloudflarestorage.com"
    if dry_run:
        print(f"[DRY-RUN] Would upload {archive.name} -> s3://{bucket}/{OBJECT_KEY} via {endpoint}")
        return True
    session = boto3.Session(
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name="auto",
    )
    client = session.client(
        "s3",
        endpoint_url=endpoint,
        config=Config(signature_version="s3v4", s3={"addressing_style": "path"}, retries={"max_attempts": 3}),
    )
    started = time.time()
    client.upload_file(
        str(archive),
        bucket,
        OBJECT_KEY,
        ExtraArgs={"CacheControl": "public, max-age=0, no-cache", "ContentType": "application/gzip"},
    )
    print(f"[OK] Uploaded {archive.name} ({archive.stat().st_size / 1024 / 1024:.2f} MB) in {time.time() - started:.1f}s")
    return True


def purge_cache(public_url: str) -> None:
    import json
    import urllib.request

    zone_id = os.environ.get("CF_ZONE_ID")
    api_token = os.environ.get("CF_API_TOKEN")
    if not (zone_id and api_token):
        print("[NOTICE] CDN purge skipped (CF_ZONE_ID / CF_API_TOKEN not set).")
        return
    request = urllib.request.Request(
        f"https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache",
        data=json.dumps({"files": [f"{public_url}/{OBJECT_KEY}"]}).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_token}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            print("[OK] CDN purge issued" if response.status < 300 else f"[WARN] CDN purge HTTP {response.status}")
    except Exception as error:  # noqa: BLE001 - a failed purge must not fail the publish
        print(f"[WARN] CDN purge failed: {error}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Package and publish instarmony.com")
    parser.add_argument("--no-upload", action="store_true", help="build and package only")
    parser.add_argument("--skip-docs-build", action="store_true", help="reuse the existing docs/build output")
    parser.add_argument("--dry-run", action="store_true", help="resolve everything, upload nothing")
    parser.add_argument("--purge-cache", action="store_true", help="purge the uploaded object URL on the CDN")
    args = parser.parse_args()

    print(f"Site root: {ROOT}")
    print(f"Seeded {load_env_file(ROOT / '.env')} keys from .env")

    build_docs(args.skip_docs_build)
    generate_seo()

    missing = [entry for entry in REQUIRED_ENTRIES if not (ROOT / entry).is_file()]
    if missing:
        print("[ERROR] Package would be incomplete:")
        for entry in missing:
            print(f"          - {entry}")
        return 1

    archive = DIST_DIR / ARCHIVE_NAME
    files = package(archive)
    digest = sha256_of(archive)
    print(f"[OK] Packaged {files} files, {archive.stat().st_size / 1024 / 1024:.2f} MB -> {archive}")
    print(f"     SHA-256: {digest}")

    if args.no_upload:
        print("[INFO] --no-upload: stopping here.")
        return 0

    public_url = os.environ.get("CF_R2_PUBLIC_URL", "https://storage.instarmony.com").rstrip("/")
    if not upload(archive, args.dry_run):
        return 1

    if args.purge_cache:
        purge_cache(public_url)
    print()
    print("Publish complete. Install it on the server with:")
    print(f"  ssh <server> 'cd ~/instarmony_website && git pull && bash scripts/install-site.sh {digest}'")
    print(f"  (package: {public_url}/{OBJECT_KEY})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
