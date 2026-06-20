/* ============================================================
   SkyStore – Main JS v2
   ============================================================ */

/* ─── ICONS ─────────────────────────────────────────────────── */
const ICONS = {
  truck:   `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  shield:  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  credit:  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  headset: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
  star:    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  users:   `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  package: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  droplet:`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>`,
  dumbbell:`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14M18 5v14M8.5 8h7M8.5 16h7M4 9v6M20 9v6"/></svg>`,
  percent: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  check:   `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  arrow:   `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  zap:     `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  cart:    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  search:  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  trash:   `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>`,
  heart:   `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  lock:    `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  phone:   `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail:    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  pin:     `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  send:    `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  chevron: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`,
  minus:   `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  plus:    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
};

const STAR_FULL  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const STAR_EMPTY = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
function renderStars(rating) {
  const full = Math.round(rating);
  return STAR_FULL.repeat(full) + STAR_EMPTY.repeat(5 - full);
}
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollReveal();
  initMobileMenu();
  initParallax();
  initActiveNav();
  initCounters();
  injectIcons();

  const page = document.body.dataset.page;
  if (page === 'home')     initHome();
  if (page === 'catalog')  initCatalog();
  if (page === 'product')  initProductPage();
  if (page === 'checkout') initCheckout();
  if (page === 'contacts') initContactForm();
});

/* ─── INJECT SVG ICONS ───────────────────────────────────────── */
function injectIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    if (ICONS[name]) el.innerHTML = ICONS[name];
  });
}

/* ─── HEADER ─────────────────────────────────────────────────── */
function initHeader() {
  const h = document.querySelector('.site-header');
  if (!h) return;
  window.addEventListener('scroll', () => h.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
}

/* ─── MOBILE MENU ────────────────────────────────────────────── */
function initMobileMenu() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-nav');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow = '';
    });
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow = '';
    }
  });
}

/* ─── ACTIVE NAV ─────────────────────────────────────────────── */
function initActiveNav() {
  const cur = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === cur || (cur === '' && href === 'index.html')) a.classList.add('active');
  });
}

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
}

/* ─── PARALLAX ─────────────────────────────────────────────────  */
function initParallax() {
  const circles = document.querySelectorAll('.hero-bg-circle');
  if (!circles.length) return;
  let tick = false;
  window.addEventListener('scroll', () => {
    if (tick) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      circles.forEach((c, i) => { c.style.transform = `translateY(${y * (.08 + i * .04)}px)`; });
      tick = false;
    });
    tick = true;
  }, { passive: true });
}

/* ─── COUNTERS ───────────────────────────────────────────────── */
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let cur = 0, step = Math.ceil(target / 45);
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur.toLocaleString('ru-RU') + suffix;
        if (cur >= target) clearInterval(timer);
      }, 28);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

/* ─── PRODUCT CARD HTML ──────────────────────────────────────── */
function productCardHTML(p, delay = 0) {
  const stars = renderStars(p.rating);
  const badge  = p.badge ? `<div class="product-badges"><span class="badge ${p.badgeClass}">${p.badge}</span></div>` : '';
  const oldPr  = p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : '';
  const imgCls = p.category === 'bottles' ? 'product-image product-image-bottle' : 'product-image';
  return `
  <div class="product-card" data-reveal="up" data-delay="${delay}">
    <div class="${imgCls}">
      ${badge}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <button class="btn-wishlist" title="В избранное">${ICONS.heart}</button>
    </div>
    <div class="product-body">
      <div class="product-category">${p.categoryLabel}</div>
      <div class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></div>
      <div class="product-rating"><span class="stars">${renderStars(p.rating)}</span><span>${p.rating} (${p.reviews})</span></div>
      <div class="product-price-row">
        <span class="price-current">${formatPrice(p.price)}</span>${oldPr}
      </div>
      <div class="product-actions">
        <button class="btn-add-cart" data-add-cart="${p.id}">
          ${ICONS.cart} В корзину
        </button>
      </div>
    </div>
  </div>`;
}

/* ─── HOME ────────────────────────────────────────────────────── */
function initHome() {
  const grid = document.getElementById('featured-grid');
  if (grid) {
    const featured = PRODUCTS.filter(p => p.badge).slice(0, 8);
    grid.innerHTML = featured.map((p, i) => productCardHTML(p, i * 80)).join('');
    initScrollReveal();
  }
}

/* ─── CATALOG ────────────────────────────────────────────────── */
function initCatalog() {
  let cat = 'all', query = '', sort = 'default';
  let priceMin = null, priceMax = null;
  const grid    = document.getElementById('catalog-grid');
  const countEl = document.getElementById('results-count');
  const searchEl = document.getElementById('catalog-search');
  const sortEl   = document.getElementById('catalog-sort');
  const minEl    = document.getElementById('price-min');
  const maxEl    = document.getElementById('price-max');
  const applyEl  = document.getElementById('price-apply');
  const resetEl  = document.getElementById('price-reset');

  const render = () => {
    let list = [...PRODUCTS];
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (query)         list = list.filter(p => p.name.toLowerCase().includes(query) || p.categoryLabel.toLowerCase().includes(query));
    if (priceMin != null) list = list.filter(p => p.price >= priceMin);
    if (priceMax != null) list = list.filter(p => p.price <= priceMax);
    if (sort === 'price-asc')  list.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (sort === 'rating')     list.sort((a,b) => b.rating - a.rating);
    if (sort === 'popular')    list.sort((a,b) => b.reviews - a.reviews);
    if (!grid) return;
    grid.innerHTML = list.length
      ? list.map(p => productCardHTML(p)).join('')
      : `<div class="empty-state" style="grid-column:1/-1">${ICONS.search}<h3 style="margin-top:16px">Ничего не найдено</h3><p>Попробуйте другой запрос или фильтр</p></div>`;
    if (countEl) countEl.textContent = `${list.length} товар${pluralize(list.length)}`;
    initScrollReveal();
    if (typeof syncAllCartButtons === 'function') syncAllCartButtons();
  };

  document.querySelectorAll('.filter-btn[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cat = btn.dataset.cat;
      render();
    });
  });
  if (searchEl) searchEl.addEventListener('input', () => { query = searchEl.value.trim().toLowerCase(); render(); });
  if (sortEl)   sortEl.addEventListener('change', () => { sort = sortEl.value; render(); });

  const applyPrice = () => {
    const minV = minEl && minEl.value !== '' ? parseInt(minEl.value, 10) : null;
    const maxV = maxEl && maxEl.value !== '' ? parseInt(maxEl.value, 10) : null;
    priceMin = (minV != null && !isNaN(minV)) ? minV : null;
    priceMax = (maxV != null && !isNaN(maxV)) ? maxV : null;
    render();
  };
  if (applyEl) applyEl.addEventListener('click', applyPrice);
  if (resetEl) resetEl.addEventListener('click', () => {
    if (minEl) minEl.value = '';
    if (maxEl) maxEl.value = '';
    priceMin = null; priceMax = null;
    render();
  });
  [minEl, maxEl].forEach(el => {
    if (!el) return;
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyPrice(); } });
  });

  render();
}

/* ─── PRODUCT PAGE ───────────────────────────────────────────── */
function initProductPage() {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id') || 1);
  const p  = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];

  const setEl = (id, v, attr) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (attr) el[attr] = v; else el.textContent = v;
  };

  setEl('prod-name',       p.name);
  setEl('prod-category',   p.categoryLabel);
  setEl('prod-price',      formatPrice(p.price));
  setEl('prod-rating-val', p.rating);
  setEl('prod-reviews',    `${p.reviews} отзывов`);
  setEl('prod-description', p.description);

  const starsEl = document.getElementById('prod-stars');
  if (starsEl) starsEl.innerHTML = renderStars(p.rating);

  const oldEl = document.getElementById('prod-old-price');
  if (oldEl) { oldEl.textContent = p.oldPrice ? formatPrice(p.oldPrice) : ''; oldEl.style.display = p.oldPrice ? '' : 'none'; }

  const badgeEl = document.getElementById('prod-badge');
  if (badgeEl) { if (p.badge) { badgeEl.textContent = p.badge; badgeEl.className = `badge ${p.badgeClass}`; badgeEl.style.display = ''; } else { badgeEl.style.display = 'none'; } }

  const imgEl = document.getElementById('prod-image');
  if (imgEl) { imgEl.innerHTML = `<img src="${p.img}" alt="${p.name}">`; imgEl.className = 'product-main-image'; }

  const thumbsEl = document.getElementById('prod-thumbs');
  if (thumbsEl) {
    thumbsEl.innerHTML = [p.img, p.img, p.img, p.img].map((src, i) => `
      <div class="product-thumb ${i===0?'active':''}" data-i="${i}">
        <img src="${src}" alt="${p.name} вид ${i+1}" loading="lazy">
      </div>`).join('');
    thumbsEl.querySelectorAll('.product-thumb').forEach(t => {
      t.addEventListener('click', () => { thumbsEl.querySelectorAll('.product-thumb').forEach(x=>x.classList.remove('active')); t.classList.add('active'); });
    });
  }

  const charsEl = document.getElementById('prod-chars');
  if (charsEl && p.chars) {
    charsEl.innerHTML = p.chars.map(c=>`
      <div class="char-row">
        <span class="char-label">${c.label}</span>
        <span class="char-dots"></span>
        <span class="char-value">${c.value}</span>
      </div>`).join('');
  }

  const colorsEl = document.getElementById('prod-colors');
  if (colorsEl && p.colors) {
    colorsEl.innerHTML = p.colors.map((c,i)=>`<span class="color-dot ${i===0?'active':''}" style="background:${c}" title="${c}"></span>`).join('');
    colorsEl.querySelectorAll('.color-dot').forEach(d => { d.addEventListener('click', () => { colorsEl.querySelectorAll('.color-dot').forEach(x=>x.classList.remove('active')); d.classList.add('active'); }); });
  }

  const bcEl  = document.getElementById('breadcrumb-name'); if (bcEl) bcEl.textContent = p.name;
  const bcCat = document.getElementById('breadcrumb-cat');  if (bcCat) { bcCat.textContent = p.categoryLabel; bcCat.href = `catalog.html?cat=${p.category}`; }

  document.title = `${p.name} – SkyStore`;

  let qty = 1;
  const qtyDisplay = document.getElementById('prod-qty');
  document.getElementById('qty-minus')?.addEventListener('click', () => { if (qty>1){qty--;if(qtyDisplay)qtyDisplay.textContent=qty;} });
  document.getElementById('qty-plus')?.addEventListener('click',  () => { qty++;if(qtyDisplay)qtyDisplay.textContent=qty; });

  const addBtn = document.getElementById('add-to-cart-btn');
  if (addBtn) {
    /* Sync initial state */
    const syncProdBtn = () => {
      const item = Cart.data.find(i => i.id === p.id);
      if (item && item.qty > 0) {
        addBtn.classList.add('added');
        addBtn.innerHTML = `${ICONS.check} В корзине (${item.qty} шт)`;
      } else {
        addBtn.classList.remove('added');
        addBtn.innerHTML = `${ICONS.cart} В корзину`;
      }
    };
    syncProdBtn();
    addBtn.addEventListener('click', () => {
      Cart.add(p.id, qty);
      Toast.cart('Добавлено в корзину', p.name);
      syncProdBtn();
    });
  }

  const relGrid = document.getElementById('related-grid');
  if (relGrid) {
    const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
    relGrid.innerHTML = related.map(x => productCardHTML(x)).join('');
    initScrollReveal();
  }
}

/* ─── CHECKOUT ───────────────────────────────────────────────── */
function initCheckout() {
  document.querySelectorAll('.delivery-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.delivery-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const r = opt.querySelector('input[type="radio"]');
      if (r) r.checked = true;
      const addrCard = document.getElementById('address-card');
      if (addrCard) addrCard.style.display = (r?.value === 'pickup') ? 'none' : '';
      updateCartSummary();
    });
  });

  const items = Cart.getItems();
  const listEl = document.getElementById('checkout-items');
  if (listEl) {
    listEl.innerHTML = items.length
      ? items.map(it => `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <div style="width:46px;height:46px;border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--c-bg)">
            <img src="${it.product.img}" alt="${it.product.name}" style="width:100%;height:100%;object-fit:cover">
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:.84rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${it.product.name}</div>
            <div style="font-size:.75rem;color:var(--c-muted)">${it.qty} шт × ${formatPrice(it.product.price)}</div>
          </div>
          <div style="font-weight:800;font-size:.9rem;white-space:nowrap">${formatPrice(it.product.price*it.qty)}</div>
        </div>`).join('')
      : '<p style="color:var(--c-muted);font-size:.875rem">Корзина пуста</p>';
  }
  updateCartSummary();

  document.getElementById('checkout-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm(e.target)) submitOrder();
  });
}

function validateForm(form) {
  let ok = true;
  form.querySelectorAll('[required]').forEach(f => {
    const err = document.getElementById(f.id + '-error');
    if (!f.value.trim()) { f.classList.add('error'); if(err) err.textContent='Обязательное поле'; ok=false; }
    else { f.classList.remove('error'); if(err) err.textContent=''; }
  });
  const phone = form.querySelector('[name="phone"]');
  if (phone?.value && phone.value.replace(/\D/g,'').length < 10) {
    phone.classList.add('error');
    const err = document.getElementById('phone-error');
    if (err) err.textContent = 'Некорректный номер';
    ok = false;
  }
  return ok;
}

function submitOrder() {
  const overlay = document.getElementById('order-success');
  if (overlay) { overlay.classList.add('show'); Cart.clear(); const n=document.getElementById('order-num'); if(n) n.textContent='#'+Math.floor(1e5+Math.random()*9e5); }
}

/* ─── CONTACT FORM ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) return;
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = `${ICONS.check} Отправлено!`;
    Toast.success('Сообщение отправлено!', 'Ответим в течение 2 часов');
    setTimeout(() => { form.reset(); btn.disabled=false; btn.innerHTML=`${ICONS.send} Отправить сообщение`; }, 3000);
  });
}

/* ─── HERO VIDEO – autoplay-on-view, freeze on last frame ──────── */
(function initHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  video.muted = true;
  video.playsInline = true;
  video.removeAttribute('autoplay');
  video.removeAttribute('loop');

  let played = false;

  function playFromStart() {
    if (played) return;
    played = true;
    try { video.currentTime = 0; } catch(e) {}
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => { played = false; });
  }

  function reset() {
    played = false;
    try { video.pause(); } catch(e) {}
    try { video.currentTime = 0; } catch(e) {}
  }

  video.addEventListener('ended', () => {
    try { video.pause(); } catch(e) {}
    try {
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = Math.max(0, video.duration - 0.05);
      }
    } catch(e) {}
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          playFromStart();
        } else if (!entry.isIntersecting) {
          reset();
        }
      });
    }, { threshold: [0, 0.25, 0.5, 1] });
    io.observe(video);
  } else {
    playFromStart();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && !played) {
      const rect = video.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) playFromStart();
    }
  });
})();

/* ─── HELPERS ─────────────────────────────────────────────────── */
function pluralize(n) { const m=n%10,c=n%100; if(m===1&&c!==11)return''; if(m>=2&&m<=4&&(c<10||c>=20))return'а'; return'ов'; }
