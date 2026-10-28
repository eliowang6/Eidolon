type Point = { x: number; y: number };

const home = document.querySelector<HTMLElement>('[data-thread-home]');
const svg = home?.querySelector<SVGSVGElement>('[data-thread]');
const path = svg?.querySelector<SVGPathElement>('path');

if (home && svg && path) {
  const anchors = [...home.querySelectorAll<HTMLElement>('[data-thread-anchor]')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let length = 0;
  let ticking = false;
  let measureTimer = 0;

  const pointFor = (el: HTMLElement, index: number, width: number, rect: DOMRect): Point => {
    const name = el.dataset.threadAnchor ?? '';
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;
    if (name === 'hero-word') {
      x = rect.right - 2;
      y = rect.bottom + 2;
    } else if (name === 'presence') {
      x = rect.left;
      y = rect.top + rect.height * 0.42;
    } else if (name.startsWith('torn-')) {
      y = rect.top + 6;
    } else if (name === 'loop') {
      x = rect.left + 28;
      y = rect.top + 22;
    } else if (name.startsWith('value-')) {
      x = rect.left + 26;
      y = rect.top + 34;
    } else if (name === 'compare') {
      x = rect.left + 10;
    } else if (name === 'road') {
      x = rect.left + 8;
      y = rect.top - 22;
    } else if (name === 'end') {
      y = rect.top + 10;
    }
    if (width < 768) {
      x = 12 + (index % 2 === 0 ? 0 : 6);
    }
    return { x, y };
  };

  const catmull = (points: Point[]): string => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
      const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
      d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const withMidpoints = (points: Point[], width: number, names: string[]): Point[] => {
    const out: Point[] = [];
    const sway = width < 768 ? 6 : 46;
    points.forEach((point, i) => {
      out.push(point);
      const next = points[i + 1];
      if (!next) return;
      if (names[i] === 'presence' && width >= 768) {
        // Leave the card down the right margin, then sweep left below the copy.
        out.push({ x: width - 70, y: point.y + 230 });
        return;
      }
      const dir = i % 2 === 0 ? 1 : -1;
      out.push({
        x: (point.x + next.x) / 2 + dir * sway,
        y: (point.y + next.y) / 2 + (next.y - point.y) * 0.04,
      });
    });
    return out;
  };

  const measure = () => {
    const homeRect = home.getBoundingClientRect();
    const width = home.clientWidth;
    const height = home.scrollHeight;
    const homeLeft = homeRect.left + window.scrollX;
    const homeTop = homeRect.top + window.scrollY;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const points = anchors.map((el, i) => {
      const r = el.getBoundingClientRect();
      const p = pointFor(el, i, width, r);
      return { x: p.x - homeLeft, y: p.y - homeTop };
    });
    const names = anchors.map((el) => el.dataset.threadAnchor ?? '');
    const d = catmull(withMidpoints(points, width, names));
    path.setAttribute('d', d);
    length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    update();
  };

  const update = () => {
    if (!length) return;
    if (reduce.matches) {
      path.style.strokeDashoffset = '0';
      return;
    }
    const homeRect = home.getBoundingClientRect();
    const top = homeRect.top + window.scrollY;
    const progress = Math.min(1, Math.max(0, (window.scrollY + innerHeight * 0.65 - top) / Math.max(1, home.scrollHeight)));
    path.style.strokeDashoffset = String(length * (1 - progress));
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
    clearTimeout(measureTimer);
    measureTimer = window.setTimeout(measure, 150);
  };

  measure();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', remeasure);
  addEventListener('eidolon:layout', remeasure);
  if (document.fonts?.ready) document.fonts.ready.then(remeasure);
  addEventListener('load', remeasure);
  new ResizeObserver(remeasure).observe(home);
  reduce.addEventListener('change', () => {
    update();
  });
}
