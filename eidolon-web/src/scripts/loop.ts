const section = document.querySelector<HTMLElement>('[data-loop-section]');
if (section) {
  const desktopStage = section.querySelector<HTMLElement>('.loop-desktop');
  const panels = [...(desktopStage?.querySelectorAll<HTMLElement>('[data-loop-panel]') ?? [])];
  const bars = [...(desktopStage?.querySelectorAll<HTMLElement>('[data-loop-bar]') ?? [])];
  const steps = [...(desktopStage?.querySelectorAll<HTMLElement>('[data-loop-step]') ?? [])];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 1024px)');

  const setStep = (index: number) => {
    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
    bars.forEach((bar, i) => bar.classList.toggle('on', i <= index));
    steps.forEach((step, i) => {
      step.classList.toggle('on', i === index);
      step.querySelector('button')?.setAttribute('aria-current', i === index ? 'step' : 'false');
    });
  };

  setStep(0);
  let trigger: any = null;

  steps.forEach((step, i) => {
    step.querySelector('button')?.addEventListener('click', () => {
      if (trigger) {
        const total = trigger.end - trigger.start;
        window.scrollTo({ top: trigger.start + total * ((i + 0.5) / 5), behavior: 'smooth' });
      } else {
        const mobile = section.querySelector<HTMLElement>(`[data-loop-mobile-step="${step.dataset.loopStep}"]`);
        (mobile ?? step).scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  const start = async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    section.classList.add('js-loop');
    let current = 0;
    trigger = ScrollTrigger.create({
      id: 'eidolon-loop',
      trigger: section,
      start: 'top top',
      end: '+=320%',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self: any) => {
        const index = Math.min(4, Math.floor(self.progress * 4.999));
        if (index !== current) {
          current = index;
          setStep(index);
        }
      },
      onRefresh: () => {
        setTimeout(() => window.dispatchEvent(new Event('eidolon:layout')), 60);
      },
    });
    window.dispatchEvent(new Event('eidolon:layout'));
  };

  const stop = () => {
    trigger?.kill(true);
    trigger = null;
    section.classList.remove('js-loop');
    setStep(0);
    window.dispatchEvent(new Event('eidolon:layout'));
  };

  if (!desktop.matches || reduce.matches) {
    stop();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          start();
        }
      },
      { rootMargin: '500px 0px' }
    );
    observer.observe(section);
  }

  desktop.addEventListener('change', (event) => {
    if (event.matches && !reduce.matches) {
      if (!trigger) start();
    } else {
      stop();
    }
  });
  reduce.addEventListener('change', (event) => {
    if (event.matches) stop();
    else if (desktop.matches && !trigger) start();
  });
}
