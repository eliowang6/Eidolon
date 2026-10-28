# instarmony_website

Source for **instarmony.com** — the Instarmony AI Lab site, the Eidolon product pages under
`/eidolon/`, and the bilingual documentation site. It used to live inside the Eidolon app
repository as `eidolon_github/`, a git submodule; it is now its own repository with its own
build and release path, so shipping a page no longer waits on a desktop release.

```
instarmony.com/                →  index.html          Instarmony lab homepage
instarmony.com/eidolon/        →  eidolon/index.html  0-second redirect to eidolon.instarmony.com
instarmony.com/eidolon/<page>  →  eidolon/*.html      0-second redirects to the product sub-domain
eidolon.instarmony.com/        →  eidolon-site/       Astro build of eidolon-web/ (zh + en)
instarmony.com/team/<handle>/  →  team/<handle>/index.html
instarmony.com/docs/build/     →  docs/build/         Docusaurus output (zh-Hans)
instarmony.com/docs/build/en/  →  docs/build/en/      Docusaurus output (en)
```

## Layout

| Path | What it is |
|------|------------|
| `index.html`, `style.css`, `script.js` | Root brand page and its own CSS/JS (no build step) |
| `404.html` | Not-found page, served by both GitHub Pages and the Eidolon server |
| `eidolon/` | Legacy product directory: `login`/`contact` stubs plus 0-second redirect stubs to the sub-domain. `eidolon/assets/` stays untouched because the Web client resolves `/assets/...` here |
| `eidolon-web/` | Astro 5 source for the Eidolon product sub-domain (bilingual zh/en, Daylight Margin design system). Builds into `eidolon-site/` |
| `eidolon-site/` | Generated Astro output; the EdgeOne product ZIP is packaged from this directory (never edited by hand) |
| `team/` | One directory per person, e.g. `team/eli0wang6/index.html` |
| `assets/` | Shared images, screenshots and sticker art (root and `eidolon/assets/` are separate sets) |
| `docs/` | Docusaurus 3 project. `docs/docs/` is the zh-Hans source, `docs/i18n/en/docusaurus-plugin-content-docs/current/` the English source |
| `scripts/seo-submit.mjs` | Regenerates `sitemap.xml` + `robots.txt`, then pings IndexNow / Baidu / Google |
| `scripts/publish-site.py` | Builds, packages and uploads the production release to Cloudflare R2 |
| `scripts/publish-edgeone.py` | Builds, packages and deploys both sites to EdgeOne Pages (Makers) |
| `scripts/install-site.sh` | Runs on the server: verifies, extracts and atomically swaps the release |
| `.github/workflows/static.yml` | GitHub Pages deploy on every push to `main` |

`docs/build/` and `docs/node_modules/` are generated, not tracked. `docs/build/` is still what
visitors read — the publish script builds it before packaging, and Pages CI builds it in the job.

## Working locally

Nothing needs a server for the main marketing pages: open `index.html`, or serve the repo root with
`python -m http.server 8080`.

The Eidolon product sub-domain is a real Astro build (`eidolon-web/`, outputs to
`../eidolon-site/`):

```bash
cd eidolon-web
npm ci
npm run dev        # http://localhost:4321, zh at / and en at /en/
npm run build      # clean output → astro build → i18n shape + banned-copy checks
npm run preview    # serve the built site
```

The docs site needs its dependencies once (`npm ci` installs ~330 MB into `docs/node_modules`):

```bash
cd docs
npm ci
npm start          # http://localhost:3000, hot reload
npm run build      # writes docs/build (zh-Hans + en)
```

`docs/docusaurus.config.ts` keeps `onBrokenLinks: 'throw'`, so a dead internal link fails the
build rather than shipping a 404.

## Publishing

There are two independent release channels. They build the same files but ship
them to different places, and neither one calls the other.

| Channel | Script | Destination | Serves |
|---------|--------|-------------|--------|
| **EdgeOne Pages** | `publish-edgeone.py` | Pages projects, one per host | the marketing sites |
| **R2 + server** | `publish-site.py` | Cloudflare R2 → Azure origin | the API's static mount |

### EdgeOne Pages — the marketing sites

```bash
python scripts/publish-edgeone.py                        # build → package → deploy both projects
python scripts/publish-edgeone.py --no-deploy            # stop after writing the ZIPs
python scripts/publish-edgeone.py --skip-docs-build      # reuse an existing docs/build
python scripts/publish-edgeone.py --skip-site-build      # reuse an existing eidolon-site
python scripts/publish-edgeone.py --only sub             # deploy just one project (main|sub)
python scripts/publish-edgeone.py --env preview          # preview environment instead of production
python scripts/publish-edgeone.py --dry-run              # resolve everything, deploy nothing
```

Two independent Makers projects, one per host:

| ZIP | Project | Default URL |
|-----|---------|-------------|
| `dist/instarmony-website-pages.zip` | `instarmony-main-overseas` | `instarmony-main-overseas.edgeone.dev` |
| `dist/eidolon-product-pages.zip` | `eidolon-overseas-test` | `eidolon-overseas-test.edgeone.dev` |

The main ZIP is built from the repository root minus `eidolon-site/` and the
`eidolon-web/` source tree; the product ZIP is built from the Astro output in
`eidolon-site/` after `npm run build` in `eidolon-web/`. Both are checked for
the entries the site needs before anything is uploaded.

After each deploy the script probes the returned URL and prints its status.

#### Choosing an acceleration area

The CLI's `-a` flag only accepts `global` or `overseas`, and they behave very
differently:

| Area | Default domain | Reachable? | Custom domain |
|------|----------------|------------|---------------|
| `overseas` | `*.edgeone.dev` | **Yes, immediately** — no token, no ICP filing | Allowed |
| `global` | `*.edgeone.cool` | Only via a token preview URL (`?eo_token=…&eo_time=…`, 3 h validity); otherwise **401** | Disabled until the domain is ICP-filed |

This project deploys to **`overseas`** (`EDGEONE_AREA=overseas`). Two
consequences worth keeping in mind:

- Mainland visitors are blocked by EdgeOne policy on `overseas`. That is fine for
  a preview/backup channel, but the main site must stay on the Azure origin while
  the domain is unfiled.
- On `global`, a bare `*.edgeone.cool` URL answering 401 **does not mean the
  deploy failed** — it is the token-preview policy. The console's Preview button
  hands out a working link; the edge answers a 302 that sets `eo_token` /
  `eo_time` cookies, so a probe must follow redirects *with* a cookie jar or it
  reports a false failure.

> **Reachable ≠ usable for production traffic.** The `overseas` area works
> without ICP filing, but mainland visitors are blocked, so `instarmony.com`
> stays on the Azure origin until the domain is filed. At that point switch
> `EDGEONE_AREA=global`, bind the domain, and the same script publishes to a
> mainland-reachable site.

Deployment shells out to the EdgeOne CLI:

```bash
npx --yes edgeone@latest pages deploy <zip> -n <project> -e <env> -a <area> -t $EDGEONE_API_TOKEN --json
```

Credentials and overrides come from the environment, optionally seeded from an
untracked `.env` in this directory:

- `EDGEONE_API_TOKEN` — API Token from the Pages console. Without it the script
  still packages and prints what it *would* deploy, then stops.
- `EDGEONE_MAIN_PROJECT` / `EDGEONE_SUB_PROJECT` — override the project names
  if the console uses different ones.
- `EDGEONE_AREA` — `overseas` (default) or `global`.

### R2 + server — the API's static mount

```bash
python scripts/publish-site.py                 # docs build → sitemap → package → R2 upload
python scripts/publish-site.py --no-upload     # stop at dist/Instarmony_Website_Release.tar.gz
python scripts/publish-site.py --skip-docs-build   # reuse an existing docs/build
```

The script refuses to package unless the four entries the server requires are present
(`index.html`, `eidolon/index.html`, `docs/build/index.html`, `docs/build/en/index.html`), then
prints the archive's SHA-256. Credentials come from the environment or an untracked `.env` in
this directory: `CF_R2_ACCOUNT_ID`, `CF_R2_ACCESS_KEY_ID`, `CF_R2_SECRET_ACCESS_KEY`, and
optionally `CF_R2_BUCKET_NAME` (default `eidolon`) and `CF_R2_PUBLIC_URL`
(default `https://storage.instarmony.com`). `--purge-cache` additionally purges the uploaded
object URL and needs `CF_ZONE_ID` + `CF_API_TOKEN`.

Then install it on the server — no git clone needed there, the script arrives over ssh:

```bash
ssh <server> "bash -s" "<sha256>" < scripts/install-site.sh
```

`install-site.sh` downloads `/deploy/Instarmony_Website_Release.tar.gz`, re-checks the digest,
rejects unsafe member paths, extracts to a staging directory beside the target, verifies the
required entries, then renames the live directory aside and the staged one in. Any failure after
that point restores the previous release; a concurrent run is refused by a lock directory. The
target defaults to `/home/azureuser/instarmony_website` (`--site-root` to change, and it refuses
a directory that contains `.git`). That is the Azure host; the retired AWS path
`/home/ec2-user/` is no longer the default.

### GitHub Pages

A push to `main` runs `.github/workflows/static.yml`, which builds the docs with
`DOCS_BASE_URL=/Eidolon/docs/build/` and publishes the repository root to
`https://eliowang6.github.io/Eidolon/`. That is why `docs/docusaurus.config.ts` reads
`DOCS_URL` / `DOCS_BASE_URL` from the environment: production serves the docs at `/docs/build/`
and Pages at `/Eidolon/docs/build/`.

### Search engines

`node scripts/seo-submit.mjs generate` runs inside `publish-site.py`; run
`node scripts/seo-submit.mjs submit` yourself after a deploy to ping IndexNow, Baidu and Google
Search Console. Both degrade gracefully when `SEO_INDEXNOW_KEY` / `SEO_GSC_ACCESS_TOKEN` are
unset. Register a new crawlable page in the `PAGES` list at the top of that script — the sitemap
is generated from the list, not discovered.

## Contract with the Eidolon server

`instarmony.com` is served by the FastAPI app in the neighbouring `eidolon` repository, which
reads this directory and owns these behaviours (see `server/app/main.py` there):

- `/` → root `index.html`; `/eidolon` → `/eidolon/`; `/eidolon/index.html` → `/eidolon/`
- `/about.html`, `/pricing.html`, `/features.html`, `/contact.html` → 308 to the same name
  under `/eidolon/`
- `/docs` and `/docs/` → `/eidolon/docs.html`; extensionless page aliases such as
  `/eidolon/pricing` → `/eidolon/pricing.html`
- `/assets/...` falls back to `/eidolon/assets/...` so the web client's absolute asset URLs work
- dot-prefixed paths (`.git`, `.env`) are never served, even if they exist in the directory
- the directory itself is configurable as `INSTARMONY_WEBSITE_PATH`; the default is the sibling
  `instarmony_website` checkout, and `/eidolon/api/health` reports `public_site_mounted`

So a page added here is reachable at `instarmony.com/<path>` without touching the server, but a
new *redirect* belongs to the server, not to this repository.

Note that `instarmony.com` is expected to be served by EdgeOne Pages, with the Azure
origin kept only as a fallback for the API. The server-side mapping above still
governs `INSTARMONY_WEBSITE_PATH` while that fallback is in place; the Pages
release path is `scripts/publish-edgeone.py`.
