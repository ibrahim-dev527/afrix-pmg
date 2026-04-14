/**
 * shared.js — Afrix Properties & Management Group
 * Common JavaScript for ALL pages:
 *   - Sticky navbar shadow on scroll
 *   - Mobile drawer navigation from LEFT
 *   - Page hero swiper (3 slides on every page)
 *   - Scroll reveal animations
 *
 * Developer: Ibratech | 0544823484
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. STICKY NAVBAR SHADOW
  ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     2. MOBILE DRAWER MENU (slides in from LEFT)
     - Clicking hamburger opens left drawer
     - Clicking overlay closes drawer
     - ESC key closes drawer
  ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Create overlay element once
  let overlay = document.getElementById('navOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'navOverlay';
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  function openDrawer() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }

  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Mobile dropdown toggles inside drawer
  document.querySelectorAll('.nav-links .dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = link.closest('.dropdown');
        // Close siblings
        document.querySelectorAll('.nav-links .dropdown.open').forEach(d => {
          if (d !== parent) d.classList.remove('open');
        });
        parent.classList.toggle('open');
      }
    });
  });

  // Close drawer when a nav link is clicked (not dropdown toggles on mobile)
  navLinks && navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768 && !a.closest('.dropdown > a')) {
        setTimeout(closeDrawer, 80);
      }
    });
  });

  /* ─────────────────────────────────────────
     3. PAGE HERO SWIPER (inner pages)
     - .ph-slide elements inside .page-hero
     - Auto-advance every 5 seconds
     - Arrow and dot navigation
  ───────────────────────────────────────── */
  function initPageHeroSwiper() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;

    const slides = hero.querySelectorAll('.ph-slide');
    const dots = hero.querySelectorAll('.ph-dot');
    const prevBtn = hero.querySelector('.ph-prev');
    const nextBtn = hero.querySelector('.ph-next');

    if (!slides.length) return;

    let current = 0;
    let timer;

    function goTo(index) {
      slides[current].classList.remove('ph-active');
      dots[current] && dots[current].classList.remove('ph-dot-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('ph-active');
      dots[current] && dots[current].classList.add('ph-dot-active');
    }

    function startAuto() {
      timer = setInterval(() => goTo(current + 1), 5000);
    }
    function stopAuto() { clearInterval(timer); }

    prevBtn && prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    nextBtn && nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAuto();
        goTo(+dot.dataset.dot);
        startAuto();
      });
    });

    // Pause on hover
    hero.addEventListener('mouseenter', stopAuto);
    hero.addEventListener('mouseleave', startAuto);

    // Touch/swipe support
    let touchStartX = 0;
    hero.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
    }, { passive: true });

    startAuto();
  }

  /* ─────────────────────────────────────────
     4. HOME HERO SWIPER (index.html)
     - .home-slide elements inside .home-hero-swiper
  ───────────────────────────────────────── */
  function initHomeHeroSwiper() {
    const swiper = document.getElementById('homeSwiper');
    if (!swiper) return;

    const slides = swiper.querySelectorAll('.home-slide');
    const dots = swiper.querySelectorAll('.hs-dot');
    const prevBtn = document.getElementById('hsPrev');
    const nextBtn = document.getElementById('hsNext');

    if (!slides.length) return;

    let current = 0;
    let timer;

    function goTo(index) {
      slides[current].classList.remove('hs-active');
      dots[current] && dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('hs-active');
      dots[current] && dots[current].classList.add('active');
    }

    function startAuto() { timer = setInterval(() => goTo(current + 1), 5500); }
    function stopAuto() { clearInterval(timer); }

    prevBtn && prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    nextBtn && nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach(d => d.addEventListener('click', () => { stopAuto(); goTo(+d.dataset.dot); startAuto(); }));

    let tx = 0;
    swiper.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    swiper.addEventListener('touchend', e => {
      const diff = tx - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
    }, { passive: true });

    startAuto();
  }

  /* ─────────────────────────────────────────
     5. SCROLL REVEAL ANIMATION
     - Elements with class="reveal" animate in
     - Add delay-1, delay-2, delay-3 for stagger
  ───────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => obs.observe(el));
  }

  /* ─────────────────────────────────────────
     6. COUNTER ANIMATION (stats numbers)
  ───────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count || el.textContent.replace(/[^0-9.]/g, ''));
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target * 10) / 10;
      el.textContent = prefix + (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  }

  /* ─────────────────────────────────────────
     INIT ALL
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initPageHeroSwiper();
    initHomeHeroSwiper();
    initReveal();
    initCounters();
  });

})();
