document.addEventListener('DOMContentLoaded', () => {
    // ── Typing effect ──
    const words = ["Today.", "Now.", "Together.", "Forever."];
    let wordIdx = 0, charIdx = 0, deleting = false;
    const el = document.getElementById('typing-text');
    function type() {
        const w = words[wordIdx];
        if (deleting) { charIdx--; } else { charIdx++; }
        el.textContent = w.substring(0, charIdx);
        let speed = deleting ? 45 : 90;
        if (!deleting && charIdx === w.length) { speed = 2200; deleting = true; }
        else if (deleting && charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; speed = 400; }
        setTimeout(type, speed);
    }
    if (el) setTimeout(type, 800);

    // ── Navbar scroll ──
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ── Mobile hamburger ──
    const ham = document.getElementById('nav-hamburger');
    const links = document.getElementById('nav-links');
    if (ham) {
        ham.addEventListener('click', () => {
            links.classList.toggle('open');
            ham.classList.toggle('active');
        });
        // Close menu on link click
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => { links.classList.remove('open'); ham.classList.remove('active'); });
        });
    }

    // ── Smooth scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    // ── Scroll reveal ──
    const revealEls = document.querySelectorAll(
        '.vision-card, .cap-card, .scenario-card, .timeline-item, .tech-item, .waitlist-wrapper, .section-header, .symbiosis-card, .symbiosis-fusion, .story-card, .partner-item'
    );
    revealEls.forEach(el => el.classList.add('reveal'));
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 6) * 0.08}s`;
        revealObs.observe(el);
    });

    // ── 3D Tilt for cards ──
    document.querySelectorAll('.cap-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
            const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
            card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
            card.style.transition = 'none';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all .4s ease';
        });
    });

    // ── Waitlist form ──
    const form = document.getElementById('waitlist-form');
    const msg = document.getElementById('waitlist-message');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('waitlist-email').value.trim();
            const btn = document.getElementById('waitlist-submit');
            const btnText = btn.querySelector('.btn-text');
            const btnLoad = btn.querySelector('.btn-loading');
            if (!email) return;

            btn.disabled = true;
            btnText.style.display = 'none';
            btnLoad.style.display = 'inline-flex';
            msg.textContent = '';
            msg.className = 'waitlist-message';

            try {
                const res = await fetch('https://api.freewaitlists.com/waitlists/cmp7tkfdd01o401qtuocoduii', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, meta: { source: 'landing-page' } })
                });
                const data = await res.json();
                if (res.ok) {
                    msg.textContent = '🎉 You\'re on the list! Welcome to the future.';
                    msg.className = 'waitlist-message success';
                    document.getElementById('waitlist-email').value = '';
                } else {
                    msg.textContent = data.message || 'Something went wrong. Please try again.';
                    msg.className = 'waitlist-message error';
                }
            } catch (err) {
                msg.textContent = 'Network error. Please try again later.';
                msg.className = 'waitlist-message error';
            } finally {
                btn.disabled = false;
                btnText.style.display = 'inline';
                btnLoad.style.display = 'none';
            }
        });
    }
});
