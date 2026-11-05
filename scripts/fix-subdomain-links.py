#!/usr/bin/env python3
"""One-shot fix: adapt eidolon-site/ internal links to the sholarel.instarmony.com root.

The restructure-for-subdomain.py migration copied eidolon/ -> eidolon-site/ but
never rewrote the site-internal links inside the copy, so every in-site link
still carries the main-site /eidolon/ prefix and 404s on the sub-domain.

Rules applied (in order), only inside eidolon-site/:
  A. absolute SEO URLs   https://instarmony.com/eidolon/... -> https://sholarel.instarmony.com/...
  B. in-site root links  "/eidolon/xxx  / '/eidolon/xxx / url=/eidolon/xxx -> "/xxx (nav-logo, footer_home, meta refresh)
  C. docs portal links   href="/docs/build/... -> https://instarmony.com/docs/build/...
  D. main-site links     nav-parent-pill / footer_lab_home / abt_team_portal / "Instarmony Portal" / #research
                                                           -> https://instarmony.com/...
footer_home ("产品首页") keeps href="/" (sub-domain home) — untouched by rule D.
"""
import re
from pathlib import Path

ROOT = Path(r"D:\work\instarmony_website")
SITE = ROOT / "eidolon-site"
SUB = "https://sholarel.instarmony.com"
MAIN = "https://instarmony.com"

MAIN_HREF = f'href="{MAIN}/"'
RULES = [
    # A. canonical / og:url / JSON-LD item absolute URLs
    (re.compile(r"https://instarmony\.com/eidolon/"), f"{SUB}/", "A"),
    # B. in-site root-prefixed links: quoted form (href|src|url in "/eidolon/...") and bare url=/eidolon/... (meta refresh)
    (re.compile(r'(?P<pre>["\'(])/eidolon/(?P<rest>[^"\')\s<>]*)'), r'\g<pre>/\g<rest>', "B1"),
    (re.compile(r'(?P<pre>url=)/eidolon/(?P<rest>[^"\')\s<>]*)'), r'\g<pre>/\g<rest>', "B2"),
    # C. docs portal lives only on the main site
    (re.compile(r'(?P<pre>href=")/docs/build/(?P<rest>[^"]*)'), r'\g<pre>https://instarmony.com/docs/build/\g<rest>', "C"),
    # D. return-to-main-site links, distinguished by the attribute context that follows
    (re.compile(r'(?P<pre>href="/")(?=\s+class="nav-parent-pill")'), MAIN_HREF, "D1"),
    (re.compile(r'(?P<pre>href="/")(?=\s+data-i18n="footer_lab_home")'), MAIN_HREF, "D2"),
    (re.compile(r'(?P<pre>href="/")(?=[^>]*data-i18n="abt_team_portal")'), MAIN_HREF, "D3"),
    (re.compile(r'(?P<pre>href="/")(?=>Instarmony Portal</a>)'), MAIN_HREF, "D4"),
    (re.compile(r'(?P<pre>href="/")(?=#research")'), f'href="{MAIN}/#research"', "D5"),
]

counts: dict[str, int] = {}
for p in sorted(SITE.rglob("*.html")):
    text = p.read_text(encoding="utf-8")
    orig = text
    for pat, repl, tag in RULES:
        text, n = pat.subn(repl, text)
        if n:
            counts[tag] = counts.get(tag, 0) + n
    if text != orig:
        p.write_text(text, encoding="utf-8")
        print(f"  updated {p.relative_to(ROOT).as_posix()}")

print("\nReplacements by rule:", ", ".join(f"{k}={v}" for k, v in sorted(counts.items())) or "none")
print("FIX_DONE")
