/* ============================================
   Portfolio — main.js
   ============================================ */

(function () {
  'use strict';

  // =========================================================
  // 1. NAVBAR SCROLL EFFECT
  // =========================================================
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    });
  }

  // =========================================================
  // 2. MOBILE MENU TOGGLE
  // =========================================================
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('nav__links--open');
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('nav__links--open');
      });
    });
  }

  // =========================================================
  // 3. SCROLL-TRIGGERED FADE-IN
  // =========================================================
  var faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('fade-in--visible'); });
  }

  // =========================================================
  // 4. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // =========================================================
  var sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav__links a[href="#' + id + '"]');
      if (link) {
        if (scrollY >= top && scrollY < top + sectionHeight) {
          link.style.color = 'var(--color-heading)';
        } else {
          link.style.color = '';
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNav);

  // =========================================================
  // 5. DRAGGABLE PROJECT CARDS (desktop only)
  // =========================================================
  var projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid && window.matchMedia('(min-width: 769px)').matches) {
    var dragSrcEl = null;

    function handleDragStart(e) {
      dragSrcEl = this;
      this.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.outerHTML);
    }

    function handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      this.classList.add('drag-over');
      return false;
    }

    function handleDragEnter(e) {
      e.preventDefault();
      this.classList.add('drag-over');
    }

    function handleDragLeave() {
      this.classList.remove('drag-over');
    }

    function handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (dragSrcEl !== this) {
        var parent = this.parentNode;
        var srcNext = dragSrcEl.nextElementSibling;
        var targetNext = this.nextElementSibling;

        if (srcNext === this) {
          parent.insertBefore(this, dragSrcEl);
        } else if (targetNext === dragSrcEl) {
          parent.insertBefore(dragSrcEl, this);
        } else {
          parent.insertBefore(dragSrcEl, targetNext);
          parent.insertBefore(this, srcNext);
        }
      }
      this.classList.remove('drag-over');
      return false;
    }

    function handleDragEnd() {
      this.classList.remove('is-dragging');
      projectsGrid.querySelectorAll('.project-card').forEach(function (card) {
        card.classList.remove('drag-over');
      });
    }

    var cards = projectsGrid.querySelectorAll('.project-card');
    cards.forEach(function (card) {
      card.setAttribute('draggable', 'true');
      card.addEventListener('dragstart', handleDragStart);
      card.addEventListener('dragover', handleDragOver);
      card.addEventListener('dragenter', handleDragEnter);
      card.addEventListener('dragleave', handleDragLeave);
      card.addEventListener('drop', handleDrop);
      card.addEventListener('dragend', handleDragEnd);
    });
  }

})();
