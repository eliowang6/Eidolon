#!/usr/bin/env python3
"""Phase 1: restructure instarmony_website for the sub-domain split.

1. Copy eidolon/ -> eidolon-site/ (full product pages -> sholarel.instarmony.com source)
2. Replace eidolon/index.html with a slim redirect/landing page
3. Rewrite /eidolon/xxx links across the site to https://sholarel.instarmony.com/xxx
"""
import re
import shutil
from pathlib import Path

ROOT = Path(r"D:\work\instarmony_website")
SUB = "https://sholarel.instarmony.com"

# --- 1. copy eidolon/ -> eidolon-site/ ---
src = ROOT / "eidolon"
dst = ROOT / "eidolon-site"
if dst.exists():
    shutil.rmtree(dst)
shutil.copytree(src, dst)
print(f"[1] copied eidolon/ -> eidolon-site/ ({sum(1 for _ in dst.rglob('*') if _.is_file())} files)")

# --- 2. rewrite links in root-level & docs files (NOT eidolon-site/) ---
pat = re.compile(r'(?P<pre>(?:"|\'|\(|>|\s))(?P<url>/eidolon/(?P<rest>[^"\')\s<>]*))')
changed = []
for p in ROOT.rglob("*"):
    if not p.is_file():
        continue
    rel = p.relative_to(ROOT).as_posix()
    if rel.startswith("eidolon-site/") or rel.startswith("eidolon/") or rel.startswith("node_modules") or rel.startswith(".git") or rel.startswith("dist"):
        continue
    if p.suffix.lower() not in {".html", ".js", ".xml", ".json", ".css"}:
        continue
    try:
        text = p.read_text(encoding="utf-8", errors="strict")
    except Exception:
        continue
    new_text, n = pat.subn(lambda m: m.group("pre") + SUB + "/" + m.group("rest"), text)
    if n:
        p.write_text(new_text, encoding="utf-8")
        changed.append((rel, n))

print(f"[2] rewrote /eidolon/ links in {len(changed)} files:")
for rel, n in sorted(changed):
    print(f"    {rel}: {n} links")

# --- 3. slim landing page at eidolon/index.html ---
landing = """<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sholarel — 已迁移至新家 | Instarmony</title>
<meta name="description" content="Sholarel 产品页面已迁移至 sholarel.instarmony.com，即将为您跳转。">
<meta http-equiv="refresh" content="6; url=https://sholarel.instarmony.com/">
<link rel="icon" type="image/x-icon" href="https://sholarel.instarmony.com/assets/favicon.ico">
<style>
:root { --void:#0b0a14; --nebula:#7c3aed; --nebula-light:#9d5cf7; --symbio:#ec4899; --starlight:#f4f2fa; --star-dim:rgba(244,242,250,.65); }
* { margin:0; padding:0; box-sizing:border-box; }
body {
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  background: radial-gradient(ellipse 80% 60% at 70% 20%, rgba(124,58,237,.22), transparent),
              radial-gradient(ellipse 60% 50% at 20% 80%, rgba(236,72,153,.14), transparent),
              var(--void);
  font-family:'Segoe UI','PingFang SC','Microsoft YaHei',system-ui,sans-serif;
  color:var(--starlight); text-align:center; padding:2rem;
}
.card {
  max-width:560px; padding:3.5rem 2.5rem; border-radius:24px;
  background:rgba(20,18,31,.82); border:1px solid rgba(124,58,237,.4);
  box-shadow:0 0 60px rgba(124,58,237,.18);
}
.logo { font-size:2.2rem; font-weight:800; letter-spacing:.02em;
  background:linear-gradient(135deg,var(--nebula-light),var(--symbio));
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  margin-bottom:1rem; }
h1 { font-size:1.5rem; margin-bottom:.9rem; }
p { color:var(--star-dim); line-height:1.8; margin-bottom:.5rem; }
.sub { font-size:.95rem; margin-bottom:2rem; }
.btn {
  display:inline-block; padding:.9rem 2.4rem; border-radius:999px; text-decoration:none;
  font-weight:700; font-size:1.05rem; color:#fff;
  background:linear-gradient(135deg,var(--nebula),var(--symbio));
  box-shadow:0 8px 28px rgba(124,58,237,.4); transition:transform .2s, box-shadow .2s;
}
.btn:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(124,58,237,.55); }
.hint { margin-top:1.4rem; font-size:.85rem; color:var(--star-dim); }
.hint a { color:var(--nebula-light); }
.bar { height:3px; border-radius:2px; background:rgba(255,255,255,.08); margin-top:1.6rem; overflow:hidden; }
.bar i { display:block; height:100%; width:100%; background:linear-gradient(90deg,var(--nebula),var(--symbio));
  animation:drain 6s linear forwards; }
@keyframes drain { from{width:100%} to{width:0%} }
</style>
</head>
<body>
<main class="card">
  <div class="logo">Sholarel</div>
  <h1>Sholarel 已迁入专属新家</h1>
  <p>产品介绍、功能、下载与定价页面已整体迁移至独立子域名：</p>
  <p class="sub"><strong>sholarel.instarmony.com</strong></p>
  <a class="btn" href="https://sholarel.instarmony.com/">前往新地址 →</a>
  <div class="bar"><i></i></div>
  <p class="hint">将在 <span id="cd">6</span> 秒后自动跳转 · <a href="/">返回 instarmony.com 首页</a></p>
</main>
<script>
(function(){var s=6;var e=document.getElementById('cd');
var t=setInterval(function(){s--;if(e)e.textContent=s;if(s<=0){clearInterval(t);location.replace('https://sholarel.instarmony.com/');}},1000);})();
</script>
</body>
</html>
"""
(ROOT / "eidolon" / "index.html").write_text(landing, encoding="utf-8")
print("[3] wrote slim landing page -> eidolon/index.html")
print("PHASE1_DONE")
