const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
const sections = [...document.querySelectorAll<HTMLElement>('[data-legal-section]')];

if (links.length && sections.length) {
  let active = '';
  const setActive = (id: string) => {
    if (id === active) return;
    active = id;
    for (const link of links) {
      const on = link.dataset.tocLink === id;
      link.classList.toggle('active', on);
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  const measure = () => {
    const navH = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const line = navH + 120;
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    }
    setActive(current);
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

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  measure();
}
