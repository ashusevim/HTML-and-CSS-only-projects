/* =====================================================================
   showcase.js — shared interactions
   - Scroll-reveal via IntersectionObserver
   - Cursor-following glow + subtle 3D tilt for [data-tilt] elements
   Safe to include on any page; no-ops if elements are absent.
   ===================================================================== */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Scroll reveal ---------- */
    const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');

    if (reduceMotion) {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
    } else if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        revealTargets.forEach((el) => io.observe(el));
    } else {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
    }

    /* ---------- Cursor glow + tilt ---------- */
    if (!reduceMotion) {
        const tiltEls = document.querySelectorAll('[data-tilt]');
        const MAX_DEG = 6;

        tiltEls.forEach((el) => {
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;   // 0..1
                const py = (e.clientY - r.top) / r.height;   // 0..1
                el.style.setProperty('--mx', (px * 100) + '%');
                el.style.setProperty('--my', (py * 100) + '%');
                const rotX = (0.5 - py) * (MAX_DEG * 2);
                const rotY = (px - 0.5) * (MAX_DEG * 2);
                el.style.transform =
                    `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
            });

            el.addEventListener('pointerleave', () => {
                el.style.transform = '';
            });
        });
    }
})();
