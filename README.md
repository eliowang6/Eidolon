# instarmony_website

Source for **instarmony.com** — the Instarmony AI Lab site, the Eidolon product pages under
`/eidolon/`, and the bilingual documentation site. It used to live inside the Eidolon app
repository as `eidolon_github/`, a git submodule; it is now its own repository with its own
build and release path, so shipping a page no longer waits on a desktop release.

```
instarmony.com/                →  index.html          Instarmony lab homepage
instarmony.com/eidolon/        →  eidolon/index.html  Eidolon product homepage
instarmony.com/eidolon/<page>  →  eidolon/*.html      features, pricing, download, about,
                                                      docs, privacy, terms
instarmony.com/team/<handle>/  →  team/<handle>/index.html
instarmony.com/docs/build/     →  docs/build/         Docusaurus output (zh-Hans)
instarmony.com/docs/build/en/  →  docs/build/en/      Docusaurus output (en)
```

## Layout

| Path | What it is |
|------|------------|
| `index.html`, `style.css`, `script.js` | Root brand page and its own CSS/JS (no build step) |
| `404.html` | Not-found page, served by both GitHub Pages and the Eidolon server |
| `eidolon/` | Product site. Its own `index/style/script` plus `features`, `pricing`, `download`, `about`, `docs`, `privacy`, `terms`, and `login`/`contact` redirect stubs |
| `team/` | One directory per person, e.g. `team/eli0wang6/index.html` |
| `assets/` | Shared images, screenshots and sticker art (root and `eidolon/assets/` are separate sets) |
| `docs/` | Docusaurus 3 project. `docs/docs/` is the zh-Hans source, `docs/i18n/en/docusaurus-plugin-content-docs/current/` the English source |
| `scripts/seo-submit.mjs` | Regenerates `sitemap.xml` + `robots.txt`, then pings IndexNow / Baidu / Google |
| `scripts/publish-site.py` | Builds, packages and uploads the production release |
| `scripts/install-site.sh` | Runs on the server: verifies, extracts and atomically swaps the release |
| `.github/workflows/static.yml` | GitHub Pages deploy on every push to `main` |

`docs/build/` and `docs/node_modules/` are generated, not tracked. `docs/build/` is still what
visitors read — the publish script builds it before packaging, and Pages CI builds it in the job.

## Working locally

Nothing needs a server for the marketing pages: open `index.html`, or serve the repo root with
`python -m http.server 8080`.

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

### Production — instarmony.com

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
target defaults to `/home/ec2-user/instarmony_website` (`--site-root` to change, and it refuses
a directory that contains `.git`).

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
