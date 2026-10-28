const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]')];
const chapters = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];

if (links.length && chapters.length) {
  const bar = document.querySelector<HTMLElement>('[data-chapter-nav]');
  const wrap = document.querySelector<HTMLElement>('.chapters');
  const pills = links[0]?.parentElement;
  let active = '';

  const setActive = (id: string) => {
    if (id === active) return;
    active = id;
    for (const link of links) {
      const on = link.dataset.chapterLink === id;
      link.classList.toggle('active', on);
      if (on) {
        link.setAttribute('aria-current', 'true');
        if (pills && pills.scrollWidth > pills.clientWidth) {
          pills.scrollTo({
            left: link.offsetLeft - (pills.clientWidth - link.offsetWidth) / 2,
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          });
        }
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };

  const measure = () => {
    const top = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const line = Math.max(top + (bar?.offsetHeight ?? 0) + 8, innerHeight * 0.32);
    let current = chapters[0].id;
    for (const chapter of chapters) {
      if (chapter.getBoundingClientRect().top <= line) current = chapter.id;
    }
    setActive(current);
    if (bar && wrap) {
      bar.classList.toggle('is-past', wrap.getBoundingClientRect().bottom <= top + bar.offsetHeight);
    }
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      measure();
    });
  };

  for (const link of links) {
    link.addEventListener('click', () => setActive(link.dataset.chapterLink ?? active));
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('hashchange', schedule);
  measure();
}
