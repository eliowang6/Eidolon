type ThemePref = 'auto' | 'light' | 'dark';

const root = document.documentElement;
const stored = <T,>(key: string): T | null => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') as T | null;
  } catch {
    return null;
  }
};
const setStored = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode — the site still works, it just forgets */
  }
};
const removeStored = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
};

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
  return [...drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
}
function openDrawer() {
  if (!drawer || drawerOpen) return;
  drawerOpen = true;
  lastFocus = document.activeElement as HTMLElement;
  drawer.hidden = false;
  root.classList.add('drawer-open');
  openButton?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  focusables()[0]?.focus();
}
function closeDrawer(returnFocus = true) {
  if (!drawer || !drawerOpen) return;
  drawerOpen = false;
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

/* ── daylight / theme ───────────────────────────────── */
const metaTheme = document.getElementById('meta-theme');
const themeButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-theme]')];
const themeKey = 'eidolon_theme';
const qaOverride = new URLSearchParams(location.search).get('t');
const autoPart = () => {
  const h = new Date().getHours();
  return h >= 5 && h < 10 ? 'dawn' : h >= 10 && h < 16 ? 'day' : h >= 16 && h < 19 ? 'dusk' : 'night';
};
const currentTheme = (): ThemePref => {
  try {
    const value = localStorage.getItem(themeKey);
    return value === 'light' || value === 'dark' ? value : 'auto';
  } catch {
    return 'auto';
  }
};
function paintTheme(pref: ThemePref, persist: boolean) {
  const part = qaOverride && !persist ? qaOverride : pref === 'light' ? 'day' : pref === 'dark' ? 'night' : autoPart();
  if (part === 'dawn' || part === 'day' || part === 'dusk' || part === 'night') {
    root.dataset.daypart = part;
  }
  const paper: Record<string, string> = { dawn: '#F6F0E9', day: '#F5F2EA', dusk: '#F4ECE1', night: '#0E1A15' };
  metaTheme?.setAttribute('content', paper[root.dataset.daypart ?? 'day'] ?? paper.day);
  if (persist) {
    if (pref === 'auto') removeStored(themeKey);
    else setStored(themeKey, pref);
  }
  themeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.theme === pref)));
}
paintTheme(currentTheme(), false);
themeButtons.forEach((button) => {
  button.addEventListener('click', () => paintTheme((button.dataset.theme as ThemePref) ?? 'auto', true));
});
setInterval(() => {
  if (currentTheme() === 'auto' && !qaOverride) paintTheme('auto', false);
}, 5 * 60 * 1000);

/* ── language ───────────────────────────────────────── */
document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
  if (location.hash) a.href = `${a.href.split('#')[0]}${location.hash}`;
  a.addEventListener('click', () => setStored('instarmony_lang', a.dataset.langSwitch ?? 'zh'));
});

const langHint = document.getElementById('lang-hint');
const hintKey = 'instarmony_lang_hint';
if (langHint) {
  let dismissed = false;
  try {
    dismissed = localStorage.getItem(hintKey) === '1';
  } catch {
    /* ignore */
  }
  let wantsEnglish = false;
  try {
    wantsEnglish = localStorage.getItem('instarmony_lang') === 'en';
  } catch {
    /* ignore */
  }
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
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealItems.forEach((el) => io.observe(el));
  }
}

/* ── visit memory + Fea's notes ─────────────────────── */
type Visit = { v: number; first: number; last: number; count: number; lastSection: string | null };
const visitKey = 'eidolon_visit';
const now = Date.now();
const previous = stored<Visit>(visitKey) ?? { v: 1, first: now, last: 0, count: 0, lastSection: null };
const returning = previous.count > 0;
const sameSession = returning && now - previous.last < 30 * 60 * 1000;
const gapDays = previous.last ? Math.floor((now - previous.last) / 86_400_000) : 0;
const visit: Visit = {
  v: 1,
  first: previous.first || now,
  last: now,
  count: sameSession ? Math.max(previous.count, 1) : previous.count + 1,
  lastSection: previous.lastSection,
};
setStored(visitKey, JSON.stringify(visit));

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);

const heroNote = document.querySelector<HTMLElement>('[data-hero-note]');
const heroNoteText = heroNote?.querySelector<HTMLElement>('[data-mnote-text]') ?? null;
function firstNote() {
  if (!heroNote) return '';
  return heroNote.dataset.noteFirst ?? '';
}
function renderHeroNote() {
  if (!heroNote || !heroNoteText) return;
  let html = firstNote();
  if (returning && previous.lastSection) {
    html = (heroNote.dataset.noteSection ?? html).replace('{section}', escapeHtml(previous.lastSection));
  } else if (returning && gapDays >= 2) {
    html = (heroNote.dataset.noteDays ?? html).replace('{n}', String(gapDays));
  }
  heroNoteText.innerHTML = html;
}
renderHeroNote();

const sections = [...document.querySelectorAll<HTMLElement>('[data-section-name]')];
if (sections.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const name = (entry.target as HTMLElement).dataset.sectionName?.trim();
        if (!name || name === '开始' || name === 'Start') continue;
        visit.lastSection = name;
        setStored(visitKey, JSON.stringify(visit));
      }
    },
    { threshold: 0.5 }
  );
  sections.forEach((section) => io.observe(section));
}

const stayNote = document.getElementById('stay-note');
if (stayNote) {
  let shown = false;
  try {
    shown = sessionStorage.getItem('eidolon_stay_note') === '1';
  } catch {
    /* ignore */
  }
  if (!shown) {
    setTimeout(() => {
      stayNote.hidden = false;
      requestAnimationFrame(() => stayNote.classList.add('show'));
      try {
        sessionStorage.setItem('eidolon_stay_note', '1');
      } catch {
        /* ignore */
      }
      setTimeout(() => {
        stayNote.classList.remove('show');
        setTimeout(() => {
          stayNote.hidden = true;
        }, 500);
      }, 8000);
    }, 180_000);
  }
}

/* ── forget me ──────────────────────────────────────── */
const forgetButton = document.querySelector<HTMLButtonElement>('[data-forget]');
const forgetNote = document.querySelector<HTMLElement>('[data-forget-note]');
forgetButton?.addEventListener('click', () => {
  removeStored(visitKey);
  removeStored(themeKey);
  removeStored('instarmony_theme');
  visit.count = 1;
  visit.lastSection = null;
  paintTheme('auto', false);
  if (heroNoteText) heroNoteText.innerHTML = firstNote();
  if (forgetNote) {
    forgetNote.hidden = false;
    setTimeout(() => {
      forgetNote.hidden = true;
    }, 6000);
  }
});

/* ── metric count-up ────────────────────────────────── */
const metrics = [...document.querySelectorAll<HTMLElement>('[data-metric]')];
if (metrics.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        const targetA = Number(el.dataset.to ?? 0);
        const targetB = el.dataset.rangeTo ? Number(el.dataset.rangeTo) : null;
        const prefix = el.dataset.prefix ?? '';
        const suffix = el.dataset.suffix ?? '';
        const start = performance.now();
        const duration = 800;
        const tick = (time: number) => {
          const progress = Math.min(1, (time - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          const a = Math.round(targetA * eased);
          el.textContent = targetB === null
            ? `${prefix}${a}${suffix}`
            : `${a}–${Math.round(targetB * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.5 }
  );
  metrics.forEach((metric) => observer.observe(metric));
}
