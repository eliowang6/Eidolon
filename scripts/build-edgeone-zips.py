#!/usr/bin/env python3
"""Build deployment zips for EdgeOne Makers.

Superseded by scripts/publish-edgeone.py, which builds the same two ZIPs and
also deploys them with an API Token. Kept for reference / manual repacking.

- instarmony-website.zip : main site (instarmony.com) — excludes local-only junk
- eidolon-product.zip    : sholarel.instarmony.com (full product pages)
"""
import re
import zipfile
from pathlib import Path

ROOT = Path(r"D:\work\instarmony_website")
OUT = ROOT / "dist"
OUT.mkdir(exist_ok=True)

EXCLUDE_DIRS = {"node_modules", ".docusaurus", ".cache", ".git", ".github", "scripts", "dist", "eidolon-site"}
EXCLUDE_FILES = {"README.md", ".gitignore", ".gitattributes", "w.html",
                 # web build mirror assets (local experiments, not deployed on AWS)
                 "main.3ea39a4c.js", "main.dfea661b.js"}

# Secrets must never ship: .env carries EDGEONE_API_TOKEN in plaintext and every
# ZIP member is publicly fetchable. Kept in sync with publish-edgeone.py.
EXCLUDE_SECRET_FILES = re.compile(r"^\.env(\..+)?$|^.*\.pem$|^.*\.key$|^id_(rsa|ed25519)")


def add_tree(zf: zipfile.ZipFile, base: Path, arc_base: str = "") -> int:
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
        # skip hashed web-build js at root (local experiments)
        if arc_base == "" and rel.parts[0] != "docs" and re.match(r"^[0-9a-f]{8}\.[0-9a-f]{8}\.js$", rel.name):
            continue
        zf.write(p, (Path(arc_base) / rel).as_posix())
        n += 1
    return n


# main site
main_zip = OUT / "instarmony-website-pages.zip"
with zipfile.ZipFile(main_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    n_main = add_tree(zf, ROOT)
print(f"main site: {n_main} files -> {main_zip.name} ({main_zip.stat().st_size/1024/1024:.1f} MB)")

# product sub-domain
prod_zip = OUT / "eidolon-product-pages.zip"
with zipfile.ZipFile(prod_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    n_prod = add_tree(zf, ROOT / "eidolon-site")
print(f"product site: {n_prod} files -> {prod_zip.name} ({prod_zip.stat().st_size/1024/1024:.1f} MB)")
print("ZIPS_DONE")
