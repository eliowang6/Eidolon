type Companion = 'fea' | 'ael';

const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const getStored = (key: string, area: Storage | null = safeLocal()): string | null => {
  try {
    return area?.getItem(key) ?? null;
  } catch {
    return null;
  }
};
const setStored = (key: string, value: string, area: Storage | null = safeLocal()) => {
  try {
    area?.setItem(key, value);
  } catch {
    /* private mode: the site still works, it just forgets */
  }
};
const removeStored = (key: string, area: Storage | null = safeLocal()) => {
  try {
    area?.removeItem(key);
  } catch {
    /* ignore */
  }
};
function safeLocal(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
function safeSession(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/* ── nav ─────────────────────────────────────────────── */
const nav = document.getElementById('site-nav');
const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

const drawer = document.getElementById('nav-drawer');
const openButton = document.querySelector<HTMLButtonElement>('[data-drawer-open]');
let lastFocus: HTMLElement | null = null;
let drawerOpen = false;

function focusables(): HTMLElement[] {
  if (!drawer) return [];
  return [...drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  );
}
function openDrawer() {
  if (!drawer || drawerOpen) return;
  drawerOpen = true;
  lastFocus = document.activeElement as HTMLElement;
  drawer.hidden = false;
  requestAnimationFrame(() => drawer.classList.add('open'));
  root.classList.add('drawer-open');
  openButton?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  focusables()[0]?.focus();
}
function closeDrawer(returnFocus = true) {
  if (!drawer || !drawerOpen) return;
  drawerOpen = false;
  drawer.classList.remove('open');
  drawer.hidden = true;
  root.classList.remove('drawer-open');
  openButton?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  if (returnFocus) (lastFocus ?? openButton)?.focus();
}
openButton?.addEventListener('click', openDrawer);
document.querySelectorAll('[data-drawer-close]').forEach((el) => el.addEventListener('click', () => closeDrawer()));
drawer?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => closeDrawer(false)));
addEventListener('keydown', (e) => {
  if (!drawerOpen) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    closeDrawer();
    return;
  }
  if (e.key !== 'Tab') return;
  const items = focusables();
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});
matchMedia('(min-width: 1101px)').addEventListener('change', (e) => {
  if (e.matches) closeDrawer(false);
});

/* ── who you walk with ──────────────────────────────── */
const companionKey = 'sholarel_companion';
const current = (): Companion => (root.dataset.companion === 'ael' ? 'ael' : 'fea');

function paintWho(scope: ParentNode, who: Companion) {
  scope.querySelectorAll<HTMLElement>('[data-fea][data-ael]').forEach((el) => {
    el.textContent = (who === 'fea' ? el.dataset.fea : el.dataset.ael) ?? '';
  });
}

function paintCompanion(who: Companion) {
  root.dataset.companion = who;
  paintWho(document, who);
  document.querySelectorAll<HTMLElement>('[data-companion-set]').forEach((button) => {
    const on = button.dataset.companionSet === who;
    button.setAttribute('aria-pressed', String(on));
    button.classList.toggle('is-on', on);
  });
}
function setCompanion(who: Companion, persist = true) {
  const changed = who !== current();
  paintCompanion(who);
  if (persist) setStored(companionKey, who);
  if (changed) dispatchEvent(new CustomEvent('companionchange', { detail: who }));
}
// A shared link (?c=ael) counts as a choice.
const fromQuery = new URLSearchParams(location.search).get('c');
if (fromQuery === 'fea' || fromQuery === 'ael') setStored(companionKey, fromQuery);
paintCompanion(current());

document.querySelectorAll<HTMLElement>('[data-companion-set]').forEach((button) => {
  button.addEventListener('click', () => {
    const who = button.dataset.companionSet === 'ael' ? 'ael' : 'fea';
    setCompanion(who);
  });
});
// Keep other tabs in step.
addEventListener('storage', (e) => {
  if (e.key === companionKey && (e.newValue === 'fea' || e.newValue === 'ael')) paintCompanion(e.newValue);
});

/* ── language ───────────────────────────────────────── */
document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
  if (location.hash) a.href = `${a.href.split('#')[0]}${location.hash}`;
  a.addEventListener('click', () => setStored('instarmony_lang', a.dataset.langSwitch ?? 'zh'));
});

const langHint = document.getElementById('lang-hint');
const hintKey = 'instarmony_lang_hint';
if (langHint) {
  const dismissed = getStored(hintKey) === '1';
  const wantsEnglish = getStored('instarmony_lang') === 'en';
  if (wantsEnglish && !dismissed) langHint.hidden = false;
  langHint.querySelector('[data-lang-hint-close]')?.addEventListener('click', () => {
    langHint.hidden = true;
    setStored(hintKey, '1');
  });
}

/* ── reveal ─────────────────────────────────────────── */
root.classList.add('reveal-ready');
const revealItems = [...document.querySelectorAll<HTMLElement>('.reveal')];
if (revealItems.length) {
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    revealItems.forEach((el) => io.observe(el));
  }
}

/* ── whispers ───────────────────────────────────────── */
// Short notes in the companion's handwriting, tied to a few sections. They are
// rare by design: at most two per page, three per visit, never back to back,
// and one tap on "quiet" stops them for good.
const whisper = document.getElementById('whisper');
const whisperText = whisper?.querySelector<HTMLElement>('[data-whisper-text]') ?? null;
const quietKey = 'sholarel_quiet';
let whisperLines: Record<string, string> = {};
try {
  whisperLines = JSON.parse(document.getElementById('whisper-lines')?.textContent ?? '{}');
} catch {
  whisperLines = {};
}
const session = safeSession();
const seenKey = 'sholarel_whispers_seen';
const seen = new Set<string>((getStored(seenKey, session) ?? '').split(',').filter(Boolean));
let shownThisPage = 0;
let lastShown = 0;
let hideTimer = 0;

function hideWhisper() {
  if (!whisper) return;
  whisper.classList.remove('show');
  window.clearTimeout(hideTimer);
  window.setTimeout(() => {
    if (!whisper.classList.contains('show')) whisper.hidden = true;
  }, 520);
}
function showWhisper(key: string, anchor?: HTMLElement) {
  if (!whisper || !whisperText) return;
  const line = whisperLines[key];
  if (!line || seen.has(key)) return;
  if (getStored(quietKey) === '1') return;
  if (shownThisPage >= 2 || seen.size >= 3) return;
  if (Date.now() - lastShown < 25_000) return;
  if (drawerOpen) return;
  // 小屏首屏不弹：气泡固定在底部，会压住 hero 里的 CTA
  if (window.innerWidth < 700 && window.scrollY < window.innerHeight * 0.7) return;
  whisperText.innerHTML = line;
  paintWho(whisperText, current());
  whisper.hidden = false;
  // 先量一遍，和触发它的元素重叠就这次不弹（不记 seen，之后可再试）
  if (anchor) {
    const bubble = whisper.getBoundingClientRect();
    const target = anchor.getBoundingClientRect();
    const pad = 12;
    const overlap =
      bubble.left < target.right + pad &&
      bubble.right > target.left - pad &&
      bubble.top < target.bottom + pad &&
      bubble.bottom > target.top - pad;
    if (overlap) {
      whisper.hidden = true;
      return;
    }
  }
  seen.add(key);
  setStored(seenKey, [...seen].join(','), session);
  shownThisPage += 1;
  lastShown = Date.now();
  requestAnimationFrame(() => whisper.classList.add('show'));
  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(hideWhisper, 9000);
}
whisper?.querySelector('[data-whisper-close]')?.addEventListener('click', hideWhisper);
whisper?.querySelector('[data-whisper-quiet]')?.addEventListener('click', () => {
  setStored(quietKey, '1');
  hideWhisper();
});
whisper?.addEventListener('mouseenter', () => window.clearTimeout(hideTimer));
whisper?.addEventListener('mouseleave', () => {
  hideTimer = window.setTimeout(hideWhisper, 4000);
});

const whisperTargets = [...document.querySelectorAll<HTMLElement>('[data-whisper]')];
if (whisper && whisperTargets.length && 'IntersectionObserver' in window) {
  const dwell = new Map<Element, number>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          const delay = Number(el.dataset.whisperDelay ?? 1600);
          dwell.set(
            el,
            window.setTimeout(() => {
              showWhisper(el.dataset.whisper ?? '', el);
              io.unobserve(el);
            }, delay),
          );
        } else {
          window.clearTimeout(dwell.get(el));
        }
      }
    },
    { threshold: 0.45 },
  );
  whisperTargets.forEach((el) => io.observe(el));
}

/* ── forget this browser ────────────────────────────── */
document.querySelectorAll<HTMLButtonElement>('[data-forget]').forEach((button) => {
  button.addEventListener('click', () => {
    ['sholarel_companion', quietKey, 'instarmony_lang', hintKey, 'eidolon_theme', 'eidolon_visit', 'instarmony_theme'].forEach(
      (key) => removeStored(key),
    );
    removeStored(seenKey, session);
    paintCompanion('fea');
    const note = document.querySelector<HTMLElement>('[data-forget-note]');
    if (note) {
      note.hidden = false;
      window.setTimeout(() => {
        note.hidden = true;
      }, 6000);
    }
  });
});

/* ── live release version ───────────────────────────── */
// The version comes from the app server's release manifest (CORS-enabled,
// written by the release pipeline), so a release never needs a site rebuild.
// If it can't be fetched, the static text stays — never blank, never "undefined".
const RELEASE_TIMEOUT_MS = 4000;
const formatSize = (bytes: unknown) =>
  typeof bytes === 'number' && bytes > 0 ? `${Math.round(bytes / 1024 / 1024)} MB` : '';
// pub_date is UTC; render it in UTC+8 so both languages show the same date.
const formatDate = (value: unknown) => {
  if (typeof value !== 'string' || !value) return '';
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value.slice(0, 10);
  return new Date(parsed + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
};
type Manifest = {
  version?: unknown;
  pub_date?: unknown;
  size?: unknown;
  url?: unknown;
  fallback_url?: unknown;
};
const manifests = new Map<string, Promise<Manifest>>();
function loadManifest(endpoint: string): Promise<Manifest> {
  let pending = manifests.get(endpoint);
  if (!pending) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), RELEASE_TIMEOUT_MS);
    pending = fetch(`${endpoint}?ts=${Date.now()}`, { cache: 'no-store', signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: Manifest) => {
        if (typeof data.version !== 'string' || !data.version) throw new Error('missing version');
        return data;
      })
      .finally(() => window.clearTimeout(timeout));
    manifests.set(endpoint, pending);
  }
  return pending;
}
document.querySelectorAll<HTMLElement>('[data-release]').forEach((node) => {
  const endpoint = node.dataset.releaseEndpoint;
  if (!endpoint) return;
  const label = node.dataset.releaseLabel ?? '';
  const fallback = node.dataset.releaseFallback ?? node.textContent ?? '';
  const parts = (node.dataset.releaseParts ?? 'version,date,size').split(',');
  loadManifest(endpoint)
    .then((data) => {
      const values: Record<string, string> = {
        version: String(data.version),
        date: formatDate(data.pub_date),
        size: formatSize(data.size),
      };
      const text = parts.map((part) => values[part.trim()]).filter(Boolean).join(' · ');
      node.textContent = `${label} ${text}`.trim();
      node.classList.add('is-live');
    })
    .catch(() => {
      node.textContent = fallback;
    });
});

/* ── Windows installer: take it from the release manifest ── */
// The MSI channel is retired (3.0.20): an MSI install never runs the NSIS hooks,
// so it cannot migrate the old install directory, and `Eidolon_latest.msi` has
// no producer any more. There is no fixed Windows filename to link to, so the
// anchor starts on the manifest endpoint and is rewritten here to the manifest's
// versioned NSIS `url` (and its R2 `fallback_url`). A release therefore needs
// neither a site rebuild nor a hardcoded version.
document.querySelectorAll<HTMLAnchorElement>('a[data-dl-manifest]').forEach((link) => {
  const endpoint = link.dataset.dlManifest;
  if (!endpoint) return;
  loadManifest(endpoint)
    .then((data) => {
      const primary = typeof data.url === 'string' ? data.url : '';
      if (!primary) throw new Error('manifest has no url');
      const fallback = typeof data.fallback_url === 'string' ? data.fallback_url : '';
      if (link.hasAttribute('data-dl-backup')) {
        // 备用线路本身就指向 R2 直链，不参与主/备探测。
        link.href = fallback || primary;
        return;
      }
      link.href = primary;
      if (fallback) link.dataset.dlFallback = fallback;
    })
    .catch(() => {
      // 清单拿不到就保留占位（仍是清单端点而不是任何死掉的文件名）。
    });
});

/* ── download links with a backup line ──────────────── */
// The primary line is the CDN host, the backup is R2 direct. A static site
// can't check availability server-side, so probe on click with a no-cors HEAD:
// only DNS / TLS / connection failures reject. A timeout counts as reachable so
// the probe never holds anyone up.
const PROBE_TIMEOUT_MS = 3000;
document.querySelectorAll<HTMLAnchorElement>('a[data-dl-primary]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const fallback = link.dataset.dlFallback;
    if (!fallback) return;
    event.preventDefault();
    const primary = link.href;
    const timer = new Promise<boolean>((resolve) => setTimeout(() => resolve(true), PROBE_TIMEOUT_MS));
    const probe = fetch(primary, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
      .then(() => true)
      .catch(() => false);
    Promise.race([probe, timer]).then((ok) => {
      window.location.href = ok ? primary : fallback;
    });
  });
});

/* ── platform hint ──────────────────────────────────── */
// Point the main download button at the visitor's own platform.
const isAndroid = /android/i.test(navigator.userAgent);
if (isAndroid) root.classList.add('is-android');
