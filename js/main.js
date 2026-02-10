/* ============================================
   Portfolio — Vaporwave x Code — main.js
   ============================================ */

(function () {
  'use strict';

  // =========================================================
  // 1. ANIMATED VAPORWAVE GRID BACKGROUND (Canvas)
  // =========================================================
  const canvas = document.getElementById('vaporwave-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let time = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse for parallax
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX / width;
      mouseY = e.clientY / height;
    });

    // Grid settings
    const GRID_LINES = 30;
    const HORIZON = 0.35; // horizon line at 35% from top
    const SPEED = 0.004;

    function drawGrid() {
      ctx.clearRect(0, 0, width, height);

      // Sky gradient (dark purple to deep navy)
      var skyGrad = ctx.createLinearGradient(0, 0, 0, height * HORIZON);
      skyGrad.addColorStop(0, '#0a0a1a');
      skyGrad.addColorStop(1, '#1a0a2e');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height * HORIZON);

      // Sun
      var sunX = width * 0.5 + (mouseX - 0.5) * 40;
      var sunY = height * HORIZON - 30 + (mouseY - 0.5) * 20;
      var sunRadius = Math.min(width, height) * 0.08;

      // Sun glow
      var glowGrad = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.5, sunX, sunY, sunRadius * 3);
      glowGrad.addColorStop(0, 'rgba(255, 113, 206, 0.3)');
      glowGrad.addColorStop(0.5, 'rgba(185, 103, 255, 0.1)');
      glowGrad.addColorStop(1, 'rgba(185, 103, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height * HORIZON + 50);

      // Sun body with horizontal stripes cut through it
      ctx.save();
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.clip();

      var sunBodyGrad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
      sunBodyGrad.addColorStop(0, '#ff71ce');
      sunBodyGrad.addColorStop(0.5, '#ff2975');
      sunBodyGrad.addColorStop(1, '#b967ff');
      ctx.fillStyle = sunBodyGrad;
      ctx.fillRect(sunX - sunRadius, sunY - sunRadius, sunRadius * 2, sunRadius * 2);

      // Horizontal slice lines through sun
      ctx.fillStyle = '#0a0a1a';
      for (var i = 0; i < 8; i++) {
        var sliceY = sunY + sunRadius * 0.2 + i * (sunRadius * 0.12);
        var sliceH = 2 + i * 0.8;
        ctx.fillRect(sunX - sunRadius, sliceY, sunRadius * 2, sliceH);
      }
      ctx.restore();

      // Ground plane gradient
      var groundGrad = ctx.createLinearGradient(0, height * HORIZON, 0, height);
      groundGrad.addColorStop(0, '#1a0a2e');
      groundGrad.addColorStop(0.3, '#0e0e2a');
      groundGrad.addColorStop(1, '#0a0a1a');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, height * HORIZON, width, height * (1 - HORIZON));

      // Perspective grid lines
      var horizonY = height * HORIZON;
      var vanishX = width * 0.5 + (mouseX - 0.5) * 60;

      // Vertical perspective lines
      ctx.strokeStyle = 'rgba(185, 103, 255, 0.25)';
      ctx.lineWidth = 1;
      for (var i = -GRID_LINES; i <= GRID_LINES; i++) {
        var baseX = vanishX + i * (width / GRID_LINES) * 2.5;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(baseX, height);
        ctx.stroke();
      }

      // Horizontal perspective lines (scrolling with time)
      var offset = (time * 2) % 1;
      for (var i = 0; i < 30; i++) {
        var t = (i + offset) / 30;
        // Exponential spacing for perspective
        var perspT = t * t;
        var y = horizonY + perspT * (height - horizonY);

        // Lines fade near horizon
        var alpha = 0.08 + perspT * 0.3;
        ctx.strokeStyle = 'rgba(1, 205, 254, ' + alpha + ')';
        ctx.lineWidth = 0.5 + perspT * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Floating particles / stars
      for (var i = 0; i < 50; i++) {
        var seed = i * 127.1 + 311.7;
        var px = ((Math.sin(seed) * 43758.5453) % 1 + 1) % 1 * width;
        var py = ((Math.sin(seed * 1.3) * 43758.5453) % 1 + 1) % 1 * height * HORIZON;
        var size = ((Math.sin(seed * 2.1) * 43758.5453) % 1 + 1) % 1 * 2 + 0.5;
        var twinkle = Math.sin(time * 3 + i) * 0.5 + 0.5;
        ctx.fillStyle = 'rgba(255, 251, 150, ' + (twinkle * 0.6 + 0.1) + ')';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate() {
      time += SPEED;
      drawGrid();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // =========================================================
  // 2. TYPED TERMINAL PROMPT
  // =========================================================
  var typedEl = document.getElementById('typed-prompt');
  if (typedEl) {
    var lines = [
      '> whoami',
      'christian_bakos_leirvaag',
      '> ls solutions/',
      'dnd-builder/  employee-platform/  habit-tracker/',
      '> ./portfolio --show-solutions'
    ];
    var lineIndex = 0;
    var charIndex = 0;
    var currentText = '';
    var typeSpeed = 45;
    var lineDelay = 600;
    var cmdDelay = 200;

    function typeNext() {
      if (lineIndex >= lines.length) return;

      var line = lines[lineIndex];
      if (charIndex < line.length) {
        currentText += line[charIndex];
        charIndex++;
        typedEl.textContent = currentText;
        setTimeout(typeNext, line.startsWith('>') ? typeSpeed : typeSpeed * 0.6);
      } else {
        // Line done
        lineIndex++;
        charIndex = 0;
        if (lineIndex < lines.length) {
          currentText += '\n';
          var delay = lines[lineIndex].startsWith('>') ? lineDelay : cmdDelay;
          setTimeout(typeNext, delay);
        }
      }
    }

    setTimeout(typeNext, 800);
  }

  // =========================================================
  // 3. NAVBAR SCROLL EFFECT
  // =========================================================
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  });

  // =========================================================
  // 4. MOBILE MENU TOGGLE
  // =========================================================
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle) {
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
  // 5. SCROLL-TRIGGERED FADE-IN
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
  // 6. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
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
          link.style.color = 'var(--color-pink)';
          link.style.textShadow = 'var(--glow-pink)';
        } else {
          link.style.color = '';
          link.style.textShadow = '';
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNav);

  // =========================================================
  // 7. FLOATING CODE SNIPPETS PARALLAX
  // =========================================================
  var codeFloats = document.querySelectorAll('.code-float');
  if (codeFloats.length) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      codeFloats.forEach(function (el, i) {
        var speed = 0.03 + i * 0.02;
        el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    });
  }

})();
