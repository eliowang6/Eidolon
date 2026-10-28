const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.querySelectorAll<HTMLFormElement>('form[data-waitlist]').forEach((form) => {
  const input = form.querySelector<HTMLInputElement>('input[name="email"]');
  const honeypot = form.querySelector<HTMLInputElement>('input[name="company"]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const label = form.querySelector<HTMLElement>('[data-wl-label]');
  const message = form.querySelector<HTMLElement>('[data-wl-msg]');
  const fields = form.querySelector<HTMLElement>('.wl-fields');
  const success = form.querySelector<HTMLElement>('[data-wl-success]');
  if (!input || !button || !label || !message || !fields || !success) return;

  const original = form.dataset.label ?? label.textContent ?? '';
  const show = (text: string) => {
    message.textContent = text;
    message.hidden = false;
  };
  const clear = () => {
    message.hidden = true;
    input.removeAttribute('aria-invalid');
  };
  const done = () => {
    form.classList.add('done');
    fields.hidden = true;
    message.hidden = true;
    success.hidden = false;
  };

  input.addEventListener('input', clear);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (honeypot?.value) {
      done();
      return;
    }
    const email = input.value.trim();
    if (!EMAIL.test(email)) {
      input.setAttribute('aria-invalid', 'true');
      show(form.dataset.invalid ?? '');
      input.focus();
      return;
    }

    button.disabled = true;
    label.textContent = form.dataset.sending ?? '';
    message.hidden = true;
    const endpoint = form.dataset.endpoint ?? '';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          meta: {
            source: 'eidolon-site-v2',
            lang: form.dataset.lang ?? 'zh',
            page: location.pathname,
          },
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      done();
    } catch {
      show(form.dataset.error ?? '');
      button.disabled = false;
      label.textContent = original;
    }
  });
});
