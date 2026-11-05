/**
 * The thread: one line that runs down the page margin, threading a bead
 * through every section eyebrow, then turns and drops into the ∞ in the
 * footer. It is drawn up to the reader's eye line as they scroll.
 * It lives only in the margin, so it never crosses text; when the margin
 * is too narrow (tablets, phones) it simply isn't drawn.
 */
type Point = { x: number; y: number };

const home = document.querySelector<HTMLElement>('[data-thread-home]');
const svg = home?.querySelector<SVGSVGElement>('[data-thread]');

if (home && svg) {
  const NS = 'http://www.w3.org/2000/svg';
  const path = svg.querySelector<SVGPathElement>('.thread-path')!;
  const beadsGroup = svg.querySelector<SVGGElement>('.thread-beads')!;
  const tip = svg.querySelector<SVGCircleElement>('.thread-tip')!;
  const gradient = svg.querySelector<SVGLinearGradientElement>('linearGradient')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  let total = 0;
  let lut: { len: number; y: number }[] = [];
  let beads: { el: SVGCircleElement; y: number }[] = [];
  let active = false;
  let ticking = false;
  let timer = 0;

  const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const isDark = (color: string) => {
    const m = color.match(/\d+(\.\d+)?/g);
    if (!m) return false;
    const [r, g, b, a = '1'] = m.map(Number) as unknown as [number, number, number, number];
    if (Number(a) === 0) return false;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 110;
  };

  const sectionBg = (el: Element) => {
    const section = el.closest('section');
    const bg = section ? getComputedStyle(section).backgroundColor : '';
    return bg && !/rgba?\(0, 0, 0, 0\)|transparent/.test(bg) ? bg : getComputedStyle(document.documentElement).backgroundColor;
  };

  const wave = (a: Point, b: Point, i: number) => {
    const s = (i % 2 === 0 ? 1 : -1) * Math.min(16, Math.abs(b.y - a.y) * 0.02);
    const dy = b.y - a.y;
    return ` C ${a.x + s} ${a.y + dy * 0.35}, ${b.x - s} ${a.y + dy * 0.65}, ${b.x} ${b.y}`;
  };

  const measure = () => {
    const width = home.clientWidth;
    const height = home.scrollHeight;
    const homeRect = home.getBoundingClientRect();
    const originX = homeRect.left;
    const originY = homeRect.top;
    const container = home.querySelector<HTMLElement>('.container');
    const start = home.querySelector<HTMLElement>('[data-thread-start]');
    const end = home.querySelector<HTMLElement>('[data-thread-end]');
    const nodes = [...home.querySelectorAll<HTMLElement>('[data-thread-node]')];
    if (!container || !start || !end || nodes.length === 0) return;

    const cRect = container.getBoundingClientRect();
    const contentLeft = cRect.left - originX + parseFloat(getComputedStyle(container).paddingLeft);
    active = width >= 1024 && contentLeft >= 48;
    svg.classList.toggle('is-on', active);
    if (!active) return;

    const x = contentLeft - Math.min(48, contentLeft * 0.42);
    const yOf = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top - originY + r.height / 2;
    };

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const points: Point[] = [{ x, y: yOf(start) }, ...nodes.map((el) => ({ x, y: yOf(el) }))];
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) d += wave(points[i], points[i + 1], i);

    // Down the margin, a rounded turn, across the bottom, and down into the footer's ∞.
    const endRect = end.getBoundingClientRect();
    const endY = endRect.top - originY;
    const cx = width / 2;
    const r = 40;
    const turnY = endY - 72;
    const last = points[points.length - 1];
    d += wave(last, { x, y: turnY - r }, points.length);
    d += ` C ${x} ${turnY - r * 0.45}, ${x + r * 0.45} ${turnY}, ${x + r} ${turnY}`;
    d += ` L ${cx - r} ${turnY}`;
    d += ` C ${cx - r * 0.45} ${turnY}, ${cx} ${turnY + r * 0.45}, ${cx} ${turnY + r}`;
    d += ` L ${cx} ${endY}`;
    path.setAttribute('d', d);

    total = path.getTotalLength();
    path.style.strokeDasharray = `${total}`;
    lut = [];
    const samples = 480;
    for (let i = 0; i <= samples; i++) {
      const len = (total * i) / samples;
      lut.push({ len, y: path.getPointAtLength(len).y });
    }

    // Ink colour flips to light wherever the thread crosses a dark band.
    const ink = cssVar('--ink');
    const light = cssVar('--night-text');
    const limeDeep = cssVar('--lime-deep');
    const stops: [number, string][] = [[0, ink]];
    home.querySelectorAll<HTMLElement>('section').forEach((section) => {
      if (!isDark(getComputedStyle(section).backgroundColor)) return;
      const sr = section.getBoundingClientRect();
      const top = sr.top - originY;
      const bottom = top + sr.height;
      stops.push([top - 1, ink], [top, light], [bottom, light], [bottom + 1, ink]);
    });
    stops.push([turnY - 120, ink], [endY, document.documentElement.dataset.daypart === 'night' ? cssVar('--lime') : limeDeep]);
    gradient.setAttribute('y2', String(height));
    gradient.replaceChildren(
      ...stops
        .sort((a, b) => a[0] - b[0])
        .map(([y, color]) => {
          const stop = document.createElementNS(NS, 'stop');
          stop.setAttribute('offset', String(Math.min(1, Math.max(0, y / height))));
          stop.setAttribute('stop-color', color);
          return stop;
        })
    );

    beads = nodes.map((el) => {
      const bead = document.createElementNS(NS, 'circle');
      const y = yOf(el);
      const bg = sectionBg(el);
      bead.setAttribute('cx', String(x));
      bead.setAttribute('cy', String(y));
      bead.setAttribute('r', '4');
      bead.setAttribute('class', `thread-bead${isDark(bg) ? ' on-dark' : ''}`);
      bead.style.fill = bg;
      return { el: bead, y };
    });
    beadsGroup.replaceChildren(...beads.map((b) => b.el));
    update();
  };

  const update = () => {
    if (!active || !total) return;
    const homeTop = home.getBoundingClientRect().top + window.scrollY;
    const eye = window.scrollY + innerHeight * 0.62 - homeTop;
    if (reduce.matches) {
      path.style.strokeDashoffset = '0';
      tip.style.opacity = '0';
      beads.forEach((b) => b.el.classList.add('lit'));
      return;
    }
    let len = 0;
    if (eye >= lut[lut.length - 1].y) len = total;
    else {
      for (let i = 1; i < lut.length; i++) {
        if (lut[i].y > eye) {
          len = lut[i - 1].len;
          break;
        }
      }
    }
    path.style.strokeDashoffset = String(total - len);
    const p = path.getPointAtLength(len);
    tip.setAttribute('cx', String(p.x));
    tip.setAttribute('cy', String(p.y));
    tip.style.opacity = len > 0 && len < total ? '1' : '0';
    beads.forEach((b) => b.el.classList.toggle('lit', b.y <= eye));
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  const remeasure = () => {
    clearTimeout(timer);
    timer = window.setTimeout(measure, 150);
  };

  measure();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', remeasure);
  addEventListener('load', remeasure);
  addEventListener('eidolon:layout', remeasure);
  document.fonts?.ready.then(remeasure);
  new ResizeObserver(remeasure).observe(home);
  // Theme changes repaint the bands; wait for the colour transition to settle.
  new MutationObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(measure, 950);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-daypart'] });
  reduce.addEventListener('change', update);
}
