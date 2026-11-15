/* Mirelle Paper Co. — site behaviour.
   Vanilla, no libraries. Everything degrades to a working page if JS is off. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- year ---- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- header height as a css var, so the mobile menu sits right under it ---- */
  var hdr = document.querySelector('.hdr');
  function setH() {
    if (hdr) document.documentElement.style.setProperty('--hdr-h', hdr.offsetHeight + 'px');
  }
  setH();
  window.addEventListener('resize', setH, { passive: true });

  /* ---- mobile menu ---- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- reveal on scroll ---- */
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
    // anything already on screen at load shows immediately
    requestAnimationFrame(function () {
      items.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in');
      });
    });
  }

  /* ---- hero parallax, desktop only, transform only, rAF throttled ---- */
  var art = document.querySelector('.hero-art');
  if (art && !reduce && window.matchMedia('(min-width: 1001px)').matches) {
    var floats = art.querySelectorAll('.float');
    var ticking = false, y = 0;
    window.addEventListener('scroll', function () {
      y = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          if (y < window.innerHeight * 1.4) {
            floats.forEach(function (f, i) {
              f.style.translate = '0 ' + (y * (0.05 + i * 0.035)).toFixed(1) + 'px';
            });
          }
          ticking = false;
        });
      }
    }, { passive: true });
  }

  /* ---- notify form: opens the user's mail app, no server, no tracking ---- */
  var form = document.getElementById('notify');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type=email]');
      var msg = document.getElementById('notify-msg');
      var v = (input.value || '').trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
        if (msg) msg.textContent = 'That email does not look right. Check it and try again.';
        input.focus();
        return;
      }
      window.location.href = 'mailto:hello@mirellepaper.co'
        + '?subject=' + encodeURIComponent('Tell me when the next two land')
        + '&body=' + encodeURIComponent('Please add ' + v + ' to the list.');
      if (msg) msg.textContent = 'Your mail app should open with the message ready. Send it and you are on the list.';
    });
  }
})();
