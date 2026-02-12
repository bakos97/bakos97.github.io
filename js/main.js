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
  // 5. PROJECT FILTERING & SEARCH
  // =========================================================
  var projectsGrid = document.getElementById('projects-grid');
  var filterBtns = document.querySelectorAll('.projects-filter__btn');
  var searchInput = document.querySelector('.projects-filter__search');

  if (projectsGrid && filterBtns.length) {
    var activeFilter = 'all';
    var searchTerm = '';
    var debounceTimer = null;

    function filterProjects() {
      var cards = projectsGrid.querySelectorAll('.project-card');
      var visibleCount = 0;

      cards.forEach(function (card) {
        var category = card.getAttribute('data-category') || '';
        var searchData = (card.getAttribute('data-search') || '').toLowerCase();
        var matchesCategory = activeFilter === 'all' || category === activeFilter;
        var matchesSearch = !searchTerm || searchData.indexOf(searchTerm) !== -1;

        if (matchesCategory && matchesSearch) {
          card.classList.remove('project-card--hidden');
          visibleCount++;
        } else {
          card.classList.add('project-card--hidden');
        }
      });

      // Show/hide empty state
      var emptyMsg = projectsGrid.querySelector('.projects-grid__empty');
      if (visibleCount === 0) {
        if (!emptyMsg) {
          emptyMsg = document.createElement('p');
          emptyMsg.className = 'projects-grid__empty';
          emptyMsg.textContent = 'No projects match your search.';
          projectsGrid.appendChild(emptyMsg);
        }
        emptyMsg.style.display = '';
      } else if (emptyMsg) {
        emptyMsg.style.display = 'none';
      }
    }

    // Filter button clicks
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('projects-filter__btn--active'); });
        btn.classList.add('projects-filter__btn--active');
        activeFilter = btn.getAttribute('data-filter');
        filterProjects();
      });
    });

    // Search input with debounce
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          searchTerm = searchInput.value.trim().toLowerCase();
          filterProjects();
        }, 200);
      });
    }
  }

  // =========================================================
  // 6. HERO TYPING ANIMATION
  // =========================================================
  var typingTarget = document.getElementById('typing-target');
  if (typingTarget) {
    var fullText = typingTarget.getAttribute('data-text') || '';
    var charIndex = 0;
    var cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    typingTarget.textContent = '';
    typingTarget.appendChild(cursor);

    function typeChar() {
      if (charIndex < fullText.length) {
        // Insert text before cursor
        cursor.parentNode.insertBefore(
          document.createTextNode(fullText.charAt(charIndex)),
          cursor
        );
        charIndex++;
        setTimeout(typeChar, 35);
      }
    }

    // Delay start to let hero fade-in complete
    setTimeout(typeChar, 800);
  }

  // =========================================================
  // 7. PERSPECTIVE GRID CANVAS
  // =========================================================
  var canvas = document.getElementById('hero-grid');
  var hero = document.getElementById('hero');

  if (canvas && hero && window.matchMedia('(min-width: 769px)').matches) {
    var ctx = canvas.getContext('2d');
    var animFrame;

    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawGrid(timestamp) {
      var w = canvas.width;
      var h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grid parameters
      var horizonY = h * 0.35;
      var vanishX = w * 0.5;
      var gridLines = 20;
      var verticalLines = 16;
      var speed = 0.0003;

      // Scroll-based fade
      var heroBottom = hero.offsetTop + hero.offsetHeight;
      var scrollFade = 1 - Math.min(1, Math.max(0, window.scrollY / (heroBottom * 0.6)));
      var baseOpacity = 0.12 * scrollFade;
      if (baseOpacity <= 0) {
        animFrame = requestAnimationFrame(drawGrid);
        return;
      }

      // Moving offset for animation
      var timeOffset = (timestamp * speed) % 1;

      // Draw horizontal lines (perspective spacing)
      ctx.strokeStyle = 'rgba(167, 139, 250, ' + baseOpacity + ')';
      ctx.lineWidth = 1;
      for (var i = 0; i < gridLines; i++) {
        var t = (i + timeOffset) / gridLines;
        // Exponential spacing for perspective
        var perspT = t * t;
        var y = horizonY + perspT * (h - horizonY);
        if (y > h) continue;

        // Lines get more transparent near horizon
        var lineOpacity = baseOpacity * (0.3 + 0.7 * perspT);
        ctx.strokeStyle = 'rgba(167, 139, 250, ' + lineOpacity + ')';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw vertical lines (converging to vanishing point)
      for (var j = -verticalLines / 2; j <= verticalLines / 2; j++) {
        var spread = (j / (verticalLines / 2));
        var bottomX = vanishX + spread * w * 0.8;
        var lineOp = baseOpacity * (1 - Math.abs(spread) * 0.5);

        ctx.strokeStyle = 'rgba(167, 139, 250, ' + lineOp + ')';
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }

      // Gradient fade at top (horizon blend)
      var grad = ctx.createLinearGradient(0, 0, 0, horizonY + 40);
      grad.addColorStop(0, 'rgba(12, 12, 20, 1)');
      grad.addColorStop(0.7, 'rgba(12, 12, 20, 0.8)');
      grad.addColorStop(1, 'rgba(12, 12, 20, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, horizonY + 40);

      // Gradient fade at edges
      var edgeW = w * 0.15;
      var gradL = ctx.createLinearGradient(0, 0, edgeW, 0);
      gradL.addColorStop(0, 'rgba(12, 12, 20, 1)');
      gradL.addColorStop(1, 'rgba(12, 12, 20, 0)');
      ctx.fillStyle = gradL;
      ctx.fillRect(0, horizonY, edgeW, h - horizonY);

      var gradR = ctx.createLinearGradient(w, 0, w - edgeW, 0);
      gradR.addColorStop(0, 'rgba(12, 12, 20, 1)');
      gradR.addColorStop(1, 'rgba(12, 12, 20, 0)');
      ctx.fillStyle = gradR;
      ctx.fillRect(w - edgeW, horizonY, edgeW, h - horizonY);

      animFrame = requestAnimationFrame(drawGrid);
    }

    animFrame = requestAnimationFrame(drawGrid);
  }

  // =========================================================
  // 8. TIMELINE MARKER PULSE ON SCROLL
  // =========================================================
  var markers = document.querySelectorAll('.timeline__marker');
  if (markers.length && 'IntersectionObserver' in window) {
    var markerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline__marker--pulse');
            markerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    markers.forEach(function (m) { markerObserver.observe(m); });
  }

  // =========================================================
  // 9. PROJECT MODAL
  // =========================================================

  var projectData = {
    'dnd-builder': {
      category: 'Web App',
      title: 'D&D Character Builder',
      description: 'A streamlined tool for creating Dungeons & Dragons characters. Built because existing tools were slow and clunky. Through 7 iterations and testing with 20+ users, it\'s a fast, intuitive experience that outperforms alternatives.',
      techStack: ['Next.js', 'React', 'Supabase', 'GPT-4', 'Fly.io'],
      links: [
        { text: 'Try it live', url: 'https://dnd-creator.fly.dev', primary: true }
      ],
      image: 'assets/screenshots/dnd.png',
      icon: '\uD83D\uDC09'
    },
    'hyllest': {
      category: 'SaaS MVP',
      title: 'Hyllest',
      description: 'Built for companies with high turnover rates, especially remote teams. Tracks birthdays, milestones, and key moments \u2014 generates a personalized celebration website with colleagues\' messages and gift card options.',
      techStack: ['Full-Stack Web', 'Supabase', 'Fly.io'],
      links: [
        { text: 'View Site', url: 'https://employee-gifting-mvp.fly.dev', primary: true },
        { text: 'GitHub Repo', url: 'https://github.com/bakos97/employee-gifting-mvp', github: true }
      ],
      image: 'assets/screenshots/Hyllest.png',
      icon: '\uD83C\uDFC6'
    },
    'gold-habit-tracker': {
      category: 'Mobile App',
      title: 'Goald',
      description: 'A habit tracking app with a twist: a gold-based reward and punishment system. Miss a workout? Buy gold. Hit a goal? Sell gold. Features a Kanban board, a workout logger, and a gold economy. Built for myself, used daily.',
      techStack: ['React Native', 'Expo', 'TypeScript'],
      links: [],
      icon: '\uD83D\uDCB0'
    },
    'gender-disparities': {
      category: 'Data Analysis',
      title: 'Gender Disparities in Denmark',
      description: 'An in-depth analysis of gender gaps in income, parental leave, and education within Denmark. This project utilizes interactive maps and time-series charts to visualize disparities across different regions and time periods. The analysis reveals significant insights into how these gaps have evolved and where they are most pronounced.',
      techStack: ['Python', 'Pandas', 'Plotly', 'Jupyter Notebook'],
      links: [
        { text: 'View Analysis', url: 'projects/gender-disparities.html', primary: true },
        { text: 'GitHub Repo', url: 'https://github.com/bakos97/bakos97.github.io', github: true }
      ],
      image: 'gender_education2.png'
    },
    'randaberg-sauna': {
      category: 'Web App',
      title: 'Randaberg Sauna',
      description: 'A modern, responsive website built for a local sauna business. Features a clean design, booking information, and location details. Built with performance and user experience in mind, hosted on Fly.io for reliability.',
      techStack: ['HTML/CSS', 'JavaScript', 'Fly.io'],
      links: [
        { text: 'Live Site', url: 'https://randaberg-sauna.fly.dev', primary: true }
      ],
      image: 'assets/screenshots/bastue.png',
      icon: '\uD83E\uDDD6\u200D\u2642\uFE0F'
    },
    'music-network': {
      category: 'Social Graphs',
      title: 'Music Network Analysis',
      description: 'A network analysis project that investigates the relationships between artists on Spotify. By modeling artists as nodes and collaborations/similarities as edges, we used graph theory and community detection algorithms to uncover genres and influential artists within the network.',
      techStack: ['Python', 'NetworkX', 'Spotify API', 'Data Visualization'],
      links: [
        { text: 'GitHub Repo', url: 'https://github.com/bakos97/Final-project-Social-Graphs', primary: true, github: true }
      ],
      icon: '\uD83C\uDFB5'
    },
    'xray-segmentation': {
      category: 'Deep Learning',
      title: 'X-Ray Image Segmentation',
      description: 'Automated segmentation of ptychographic X-ray images using deep learning architectures. We implemented and compared UNet and VGGnet models to accurately identify features in complex X-ray data, aiming to improve analysis speed and accuracy for researchers.',
      techStack: ['PyTorch', 'UNet', 'VGGnet', 'Python', 'Computer Vision'],
      links: [
        { text: 'GitHub Repo', url: 'https://github.com/bakos97/AIStudentProjects', primary: true, github: true }
      ],
      icon: '\uD83E\uDDEC'
    },
    'heart-failure': {
      category: 'Machine Learning',
      title: 'Heart Failure Prediction',
      description: 'Development of machine learning models to predict patient survival outcomes based on clinical records. We explored various classification algorithms, performed feature engineering, and evaluated model performance to assist in early detection and treatment planning.',
      techStack: ['Scikit-learn', 'Python', 'Pandas', 'Matplotlib'],
      links: [
        { text: 'GitHub Repo', url: 'https://github.com/bakos97/Machine-learning-assignment-2', primary: true, github: true }
      ],
      icon: '\u2764\uFE0F'
    },
    'face-perception': {
      category: 'Cognitive Science',
      title: 'Face Perception Modelling',
      description: 'Computational modelling of human face perception using cognitive science methods. This project involves simulating how humans process and recognize faces, comparing model outputs with behavioral data to understand underlying cognitive mechanisms.',
      techStack: ['Python', 'Cognitive Modelling', 'Data Analysis'],
      links: [
        { text: 'GitHub Repo', url: 'https://github.com/bakos97/Cognitive-Modelling-Homework-2-Modelling-of-face-perception', primary: true, github: true }
      ],
      icon: '\uD83E\uDDE0'
    }
  };

  var modal = document.getElementById('project-modal');
  var modalContainer = modal.querySelector('.modal__container');
  var modalClose = modal.querySelectorAll('[data-close="true"]');

  // Elements to populate
  var mImageWrapper = document.getElementById('modal-image-wrapper');
  var mTag = document.getElementById('modal-tag');
  var mTitle = document.getElementById('modal-title');
  var mDesc = document.getElementById('modal-description');
  var mTech = document.getElementById('modal-tech');
  var mLinks = document.getElementById('modal-links');

  function openModal(id) {
    var data = projectData[id];
    if (!data) return;

    // Populate Data
    mTag.textContent = data.category;
    mTitle.textContent = data.title;
    mDesc.textContent = data.description;

    // Tech Stack
    mTech.innerHTML = '';
    data.techStack.forEach(function (tech) {
      var li = document.createElement('li');
      li.textContent = tech;
      mTech.appendChild(li);
    });

    // Links
    mLinks.innerHTML = '';
    data.links.forEach(function (link) {
      var a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = link.primary ? 'btn btn--primary' : 'btn btn--outline';
      if (link.github) {
        a.classList.add('btn--github');
        a.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>' + link.text;
      } else {
        a.textContent = link.text;
      }
      mLinks.appendChild(a);
    });

    // Image or Icon Placeholder
    mImageWrapper.innerHTML = '';
    if (data.image) {
      var img = document.createElement('img');
      img.src = data.image;
      img.alt = data.title;
      mImageWrapper.appendChild(img);
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'modal__placeholder';
      var icon = document.createElement('span');
      icon.className = 'modal__placeholder-icon';
      icon.textContent = data.icon || '🚀';
      placeholder.appendChild(icon);
      mImageWrapper.appendChild(placeholder);
    }

    // Show Modal
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event Listeners for Project Cards
  var clickables = document.querySelectorAll('.project-card[data-id]');
  clickables.forEach(function (el) {
    el.addEventListener('click', function () {
      openModal(el.getAttribute('data-id'));
    });
  });

  // Event Listeners for Closing Modal
  modalClose.forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

})();
