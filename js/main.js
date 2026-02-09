/* ============================================
   Portfolio — main.js
   ============================================ */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  });

  // --- Mobile menu toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('nav__links--open');
    });
    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('nav__links--open');
      });
    });
  }

  // --- Scroll-triggered fade-in ---
  const faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    faders.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    faders.forEach(el => el.classList.add('fade-in--visible'));
  }

  // --- Active nav link highlight on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector('.nav__links a[href="#' + id + '"]');
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.color = 'var(--color-accent)';
        } else {
          link.style.color = '';
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNav);
})();
