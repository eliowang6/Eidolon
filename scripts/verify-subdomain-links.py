#!/usr/bin/env python3
"""Verify every in-site link in eidolon-site/ resolves on sholarel.instarmony.com.

The sub-domain serves eidolon-site/ at its web root, so "/xxx" maps to
eidolon-site/xxx. Reports:
  - leftover /eidolon/ prefixed links (must be zero)
  - relative links whose target file does not exist (real 404s)
  - remaining bare href="/" occurrences, with context for a manual semantic check
"""
import re
from html.parser import HTMLParser
from pathlib import Path

SITE = Path(r"D:\work\instarmony_website\eidolon-site")
PAGES = {"about.html", "contact.html", "docs.html", "download.html", "features.html",
         "index.html", "login.html", "pricing.html", "privacy.html", "terms.html"}

class LinkCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links: list[tuple[int, str]] = []  # (line, url)
        self.refresh: list[tuple[int, str]] = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "a" and d.get("href"):
            self.links.append((self.getpos()[0], d["href"]))
        if tag == "meta" and d.get("http-equiv", "").lower() == "refresh" and d.get("content"):
            m = re.search(r"url=(.+)$", d["content"], re.I)
            if m:
                self.refresh.append((self.getpos()[0], m.group(1).strip()))

leftover, missing, root_links = [], [], []
for page in sorted(PAGES):
    p = SITE / page
    parser = LinkCollector()
    parser.feed(p.read_text(encoding="utf-8"))
    for line, url in parser.links + parser.refresh:
        if "/eidolon/" in url:
            leftover.append((page, line, url))
            continue
        if url.startswith(("http://", "https://", "mailto:", "#")):
            continue  # external or in-page anchors are out of scope
        target = url.split("#")[0]
        if target == "/":
            ctx = (p.read_text(encoding="utf-8").splitlines()[line - 1]).strip()
            root_links.append((page, line, ctx))
            continue
        if not target:
            continue
        t = target.lstrip("/")
        if not (SITE / t).exists():
            missing.append((page, line, url))

print(f"[leftover /eidolon/ links] {len(leftover)}")
for x in leftover: print("   ", x)
print(f"[missing targets (would 404)] {len(missing)}")
for x in missing: print("   ", x)
print(f"[bare href=\"/\" links, manual check] {len(root_links)}")
for page, line, ctx in root_links:
    tag = "OK product-home" if ("footer_home" in ctx or "nav-logo" in ctx) else "CHECK ME"
    print(f"    [{tag}] {page}:{line}: {ctx}")
print("VERIFY_DONE")
