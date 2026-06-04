import {
  featuredCategories,
  works,
  illustrations,
  getSearchIndex,
} from './data.js';

/* —— DOM helpers —— */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* —— Render: Featured —— */
function renderFeatured() {
  const grid = $('#featured-grid');
  if (!grid) return;

  grid.innerHTML = featuredCategories
    .map(
      (cat) => `
    <a href="${cat.href}" class="featured-card reveal" data-reveal>
      <div class="featured-card__img-wrap">
        <img class="featured-card__img" src="${cat.img}" alt="${cat.title}" loading="lazy" width="400" height="300" />
      </div>
      <span class="featured-card__star" aria-hidden="true">✦</span>
      <div class="featured-card__body">
        <h3 class="featured-card__title">${cat.title}</h3>
        <p class="featured-card__sub">${cat.subtitle}</p>
      </div>
    </a>
  `
    )
    .join('');
}

/* —— Render: Toggle image block —— */
function toggleImageHTML(front, back, alt) {
  return `
    <div class="toggle-image" data-toggle-image tabindex="0" role="img" aria-label="${alt}">
      <img data-role="front" src="${front}" alt="${alt}" loading="lazy" />
      <img data-role="back" src="${back}" alt="${alt} — alternate view" loading="lazy" />
      <span class="toggle-image__badge" aria-hidden="true">✦</span>
    </div>
  `;
}

function renderWorks() {
  const grid = $('#works-grid');
  if (!grid) return;

  grid.innerHTML = works
    .map(
      (w) => `
    <article class="portfolio-card reveal" data-reveal>
      ${toggleImageHTML(w.imgFront, w.imgBack, w.title)}
      <div class="portfolio-card__body">
        <h3 class="portfolio-card__title">${w.title}</h3>
        <p class="portfolio-card__desc">${w.description}</p>
        <a href="${w.link}" class="btn-learn">Learn more</a>
      </div>
    </article>
  `
    )
    .join('');
}

function renderIllustrations() {
  const grid = $('#illustrations-grid');
  if (!grid) return;

  grid.innerHTML = illustrations
    .map(
      (item) => `
    <article class="portfolio-card portfolio-card--illus reveal" data-reveal>
      ${toggleImageHTML(item.imgFront, item.imgBack, item.title)}
      <div class="portfolio-card__body">
        <h3 class="portfolio-card__title">${item.title}</h3>
        <p class="portfolio-card__desc">${item.description}</p>
      </div>
    </article>
  `
    )
    .join('');
}

/* —— Image toggle (hover + touch + keyboard) —— */
function initToggleImages() {
  $$('[data-toggle-image]').forEach((el) => {
    const setHover = (on) => el.classList.toggle('is-hover', on);

    el.addEventListener('mouseenter', () => setHover(true));
    el.addEventListener('mouseleave', () => setHover(false));

    el.addEventListener('focus', () => setHover(true));
    el.addEventListener('blur', () => setHover(false));

    el.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
        const active = el.classList.contains('is-hover');
        $$('[data-toggle-image].is-hover').forEach((other) => {
          if (other !== el) other.classList.remove('is-hover');
        });
        setHover(!active);
      },
      { passive: false }
    );
  });
}

/* —— Mobile menu —— */
function initMobileMenu() {
  const toggle = $('#menu-toggle');
  const menu = $('#mobile-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
  });

  $$('.mobile-nav-link', menu).forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/* —— Search —— */
function initSearch() {
  const btn = $('#search-btn');
  const panel = $('#search-panel');
  const input = $('#search-input');
  const results = $('#search-results');
  const index = getSearchIndex();

  if (!btn || !panel || !input) return;

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
    panel.classList.toggle('is-open', open);
    if (open) {
      input.focus();
      document.body.style.overflow = 'hidden';
    } else {
      input.value = '';
      results.classList.add('hidden');
      results.innerHTML = '';
      document.body.style.overflow = '';
    }
  };

  btn.addEventListener('click', () => setOpen(true));
  $$('[data-close-search]').forEach((el) => {
    el.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      results.classList.add('hidden');
      results.innerHTML = '';
      return;
    }
    const matches = index.filter((item) => item.keywords.includes(q) || item.title.toLowerCase().includes(q));
    if (!matches.length) {
      results.innerHTML = '<li class="text-sm text-star-dim/60 py-2">No results found</li>';
    } else {
      results.innerHTML = matches
        .slice(0, 8)
        .map(
          (m) =>
            `<li><a href="${m.href}">${m.title} <span class="text-star-dim/50">· ${m.type}</span></a></li>`
        )
        .join('');
    }
    results.classList.remove('hidden');
  });
}

/* —— Header scroll + active nav —— */
function initHeader() {
  const header = $('#site-header');
  const sections = ['about', 'works', 'illustrations', 'featured'];

  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);

    const scrollPos = window.scrollY + 120;
    let current = 'home';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id === 'featured' ? 'home' : id;
    }
    $$('.nav-link').forEach((link) => {
      const nav = link.dataset.nav;
      link.classList.toggle('nav-link--active', nav === current || (current === 'home' && nav === 'home'));
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* —— Scroll reveal —— */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  const observeAll = () => $$('[data-reveal]').forEach((el) => observer.observe(el));

  observeAll();
  return observeAll;
}

/* —— Starfield canvas —— */
function initStarfield() {
  const canvas = $('#starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];
  let w = 0;
  let h = 0;
  let animId = 0;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    const count = Math.min(120, Math.floor((w * h) / 8000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.004,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((s) => {
      const flicker = prefersReduced
        ? s.opacity
        : s.opacity * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 240, 232, ${flicker})`;
      ctx.fill();
    });
    if (!prefersReduced) animId = requestAnimationFrame(draw);
  }

  resize();
  draw(0);
  window.addEventListener('resize', resize);
}

/* —— Footer year —— */
function initFooter() {
  const y = $('#year');
  if (y) y.textContent = String(new Date().getFullYear());
}

/* —— Boot —— */
function init() {
  renderFeatured();
  renderWorks();
  renderIllustrations();
  initToggleImages();
  initMobileMenu();
  initSearch();
  initHeader();
  initReveal();
  initStarfield();
  initFooter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
