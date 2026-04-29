/* ============================================================
   SkyStore — Cart & Products v2
   ============================================================ */

/* ─── PRODUCT DATA ──────────────────────────────────────────── */
const PRODUCTS = [
  /* БУТЫЛКИ — одна модель в 4 цветах */
  { id:1,  name:"Спортивная бутылка SkyBottle", category:"bottles", categoryLabel:"Бутылки",
    price:1490, oldPrice:null, rating:4.8, reviews:124, badge:"Хит", badgeClass:"badge-hit",
    img:"images/blue.png",
    description:"Алюминиевая спортивная бутылка SkyBottle с матовым покрытием и удобной ручкой-петлёй. Герметичная крышка, не пропускает запахи. Объём 750 мл.",
    chars:[{label:"Цвет",value:"Голубой"},{label:"Объём",value:"750 мл"},{label:"Материал",value:"Алюминий"},{label:"Вес",value:"180 г"},{label:"Гарантия",value:"2 года"}],
    colors:["#3FB6F0"] },

  { id:2,  name:"Спортивная бутылка SkyBottle", category:"bottles", categoryLabel:"Бутылки",
    price:1490, oldPrice:null, rating:4.7, reviews:98, badge:null, badgeClass:null,
    img:"images/green.png",
    description:"Алюминиевая спортивная бутылка SkyBottle с матовым покрытием и удобной ручкой-петлёй. Герметичная крышка, не пропускает запахи. Объём 750 мл.",
    chars:[{label:"Цвет",value:"Зелёный"},{label:"Объём",value:"750 мл"},{label:"Материал",value:"Алюминий"},{label:"Вес",value:"180 г"},{label:"Гарантия",value:"2 года"}],
    colors:["#5BB94A"] },

  { id:3,  name:"Спортивная бутылка SkyBottle", category:"bottles", categoryLabel:"Бутылки",
    price:1490, oldPrice:null, rating:4.6, reviews:74, badge:null, badgeClass:null,
    img:"images/red.png",
    description:"Алюминиевая спортивная бутылка SkyBottle с матовым покрытием и удобной ручкой-петлёй. Герметичная крышка, не пропускает запахи. Объём 750 мл.",
    chars:[{label:"Цвет",value:"Красный"},{label:"Объём",value:"750 мл"},{label:"Материал",value:"Алюминий"},{label:"Вес",value:"180 г"},{label:"Гарантия",value:"2 года"}],
    colors:["#E2433F"] },

  { id:4,  name:"Спортивная бутылка SkyBottle", category:"bottles", categoryLabel:"Бутылки",
    price:1490, oldPrice:null, rating:4.7, reviews:81, badge:"Новинка", badgeClass:"badge-new",
    img:"images/yellow.png",
    description:"Алюминиевая спортивная бутылка SkyBottle с матовым покрытием и удобной ручкой-петлёй. Герметичная крышка, не пропускает запахи. Объём 750 мл.",
    chars:[{label:"Цвет",value:"Жёлтый"},{label:"Объём",value:"750 мл"},{label:"Материал",value:"Алюминий"},{label:"Вес",value:"180 г"},{label:"Гарантия",value:"2 года"}],
    colors:["#F2C744"] },

  /* ЭСПАНДЕРЫ — одна модель в 4 цветах */
  { id:5,  name:"Эспандер SkyFlex", category:"expanders", categoryLabel:"Эспандеры",
    price:890, oldPrice:null, rating:4.7, reviews:165, badge:"Хит", badgeClass:"badge-hit",
    img:"images/espander%20blue.png",
    description:"Латексная петля SkyFlex для силовых тренировок и реабилитации. Широкая петля, не скручивается, выдерживает интенсивные нагрузки.",
    chars:[{label:"Цвет",value:"Голубой"},{label:"Сопротивление",value:"15–25 кг"},{label:"Материал",value:"Натуральный латекс"},{label:"Длина",value:"100 см"},{label:"Гарантия",value:"1 год"}],
    colors:["#3FB6F0"] },

  { id:6,  name:"Эспандер SkyFlex", category:"expanders", categoryLabel:"Эспандеры",
    price:890, oldPrice:null, rating:4.6, reviews:120, badge:null, badgeClass:null,
    img:"images/espander%20green.png",
    description:"Латексная петля SkyFlex для силовых тренировок и реабилитации. Широкая петля, не скручивается, выдерживает интенсивные нагрузки.",
    chars:[{label:"Цвет",value:"Зелёный"},{label:"Сопротивление",value:"15–25 кг"},{label:"Материал",value:"Натуральный латекс"},{label:"Длина",value:"100 см"},{label:"Гарантия",value:"1 год"}],
    colors:["#5BB94A"] },

  { id:7,  name:"Эспандер SkyFlex", category:"expanders", categoryLabel:"Эспандеры",
    price:890, oldPrice:null, rating:4.5, reviews:88, badge:null, badgeClass:null,
    img:"images/espander%20red.png",
    description:"Латексная петля SkyFlex для силовых тренировок и реабилитации. Широкая петля, не скручивается, выдерживает интенсивные нагрузки.",
    chars:[{label:"Цвет",value:"Красный"},{label:"Сопротивление",value:"15–25 кг"},{label:"Материал",value:"Натуральный латекс"},{label:"Длина",value:"100 см"},{label:"Гарантия",value:"1 год"}],
    colors:["#E2433F"] },

  { id:8,  name:"Эспандер SkyFlex", category:"expanders", categoryLabel:"Эспандеры",
    price:890, oldPrice:null, rating:4.6, reviews:103, badge:"Новинка", badgeClass:"badge-new",
    img:"images/espander%20yellow.png",
    description:"Латексная петля SkyFlex для силовых тренировок и реабилитации. Широкая петля, не скручивается, выдерживает интенсивные нагрузки.",
    chars:[{label:"Цвет",value:"Жёлтый"},{label:"Сопротивление",value:"15–25 кг"},{label:"Материал",value:"Натуральный латекс"},{label:"Длина",value:"100 см"},{label:"Гарантия",value:"1 год"}],
    colors:["#F2C744"] },

  /* РЮКЗАКИ — одна модель в 3 цветах */
  { id:9,  name:"Рюкзак SkyPack", category:"backpacks", categoryLabel:"Рюкзаки",
    price:2490, oldPrice:null, rating:4.8, reviews:64, badge:"Хит", badgeClass:"badge-hit",
    img:"images/back%20blue.png",
    description:"Спортивный рюкзак SkyPack 25 л из влагостойкого нейлона. Отделение для обуви, мягкая спинка, эргономичные лямки. Подходит для города и тренировок.",
    chars:[{label:"Цвет",value:"Синий"},{label:"Объём",value:"25 л"},{label:"Материал",value:"Нейлон 600D"},{label:"Размер",value:"47×30×18 см"},{label:"Гарантия",value:"1 год"}],
    colors:["#2C6FB1"] },

  { id:10, name:"Рюкзак SkyPack", category:"backpacks", categoryLabel:"Рюкзаки",
    price:2490, oldPrice:null, rating:4.7, reviews:52, badge:null, badgeClass:null,
    img:"images/back%20green.png",
    description:"Спортивный рюкзак SkyPack 25 л из влагостойкого нейлона. Отделение для обуви, мягкая спинка, эргономичные лямки. Подходит для города и тренировок.",
    chars:[{label:"Цвет",value:"Зелёный"},{label:"Объём",value:"25 л"},{label:"Материал",value:"Нейлон 600D"},{label:"Размер",value:"47×30×18 см"},{label:"Гарантия",value:"1 год"}],
    colors:["#5BB94A"] },

  { id:19, name:"Рюкзак SkyPack", category:"backpacks", categoryLabel:"Рюкзаки",
    price:2490, oldPrice:null, rating:4.7, reviews:48, badge:"Новинка", badgeClass:"badge-new",
    img:"images/back%20red.png",
    description:"Спортивный рюкзак SkyPack 25 л из влагостойкого нейлона. Отделение для обуви, мягкая спинка, эргономичные лямки. Подходит для города и тренировок.",
    chars:[{label:"Цвет",value:"Красный"},{label:"Объём",value:"25 л"},{label:"Материал",value:"Нейлон 600D"},{label:"Размер",value:"47×30×18 см"},{label:"Гарантия",value:"1 год"}],
    colors:["#E2433F"] },

  /* ПЕРЧАТКИ — одна модель в 2 цветах */
  { id:11, name:"Перчатки SkyGrip", category:"gloves", categoryLabel:"Перчатки",
    price:1190, oldPrice:null, rating:4.7, reviews:93, badge:"Хит", badgeClass:"badge-hit",
    img:"images/per%20blue.png",
    description:"Тренировочные перчатки SkyGrip с противоскользящей ладонью и вентилируемыми отверстиями. Регулируемая застёжка на запястье. Подходят для зала и кросс-тренинга.",
    chars:[{label:"Цвет",value:"Голубой"},{label:"Размеры",value:"S / M / L / XL"},{label:"Материал",value:"Кожа + нейлон"},{label:"Ладонь",value:"Антискользящая"},{label:"Гарантия",value:"6 мес"}],
    colors:["#3FB6F0"] },

  { id:12, name:"Перчатки SkyGrip", category:"gloves", categoryLabel:"Перчатки",
    price:1190, oldPrice:null, rating:4.6, reviews:78, badge:null, badgeClass:null,
    img:"images/per%20green.png",
    description:"Тренировочные перчатки SkyGrip с противоскользящей ладонью и вентилируемыми отверстиями. Регулируемая застёжка на запястье. Подходят для зала и кросс-тренинга.",
    chars:[{label:"Цвет",value:"Зелёный"},{label:"Размеры",value:"S / M / L / XL"},{label:"Материал",value:"Кожа + нейлон"},{label:"Ладонь",value:"Антискользящая"},{label:"Гарантия",value:"6 мес"}],
    colors:["#5BB94A"] },

  /* КОВРИКИ — одна модель в 2 цветах */
  { id:13, name:"Коврик SkyMat", category:"mats", categoryLabel:"Коврики",
    price:1690, oldPrice:null, rating:4.8, reviews:112, badge:"Хит", badgeClass:"badge-hit",
    img:"images/cover%20green.png",
    description:"Коврик SkyMat для йоги, фитнеса и пилатеса. Двусторонний нескользящий рельеф, экологичный TPE, ремень для переноски в комплекте.",
    chars:[{label:"Цвет",value:"Зелёный"},{label:"Размер",value:"183×61 см"},{label:"Толщина",value:"6 мм"},{label:"Материал",value:"TPE"},{label:"Гарантия",value:"1 год"}],
    colors:["#5BB94A"] },

  { id:14, name:"Коврик SkyMat", category:"mats", categoryLabel:"Коврики",
    price:1690, oldPrice:null, rating:4.7, reviews:84, badge:null, badgeClass:null,
    img:"images/cover%20red.png",
    description:"Коврик SkyMat для йоги, фитнеса и пилатеса. Двусторонний нескользящий рельеф, экологичный TPE, ремень для переноски в комплекте.",
    chars:[{label:"Цвет",value:"Красный"},{label:"Размер",value:"183×61 см"},{label:"Толщина",value:"6 мм"},{label:"Материал",value:"TPE"},{label:"Гарантия",value:"1 год"}],
    colors:["#E2433F"] },

  /* АКСЕССУАРЫ — разные товары */
  { id:15, name:"Скакалка SkyRope", category:"accessories", categoryLabel:"Аксессуары",
    price:990, oldPrice:null, rating:4.8, reviews:118, badge:"Хит", badgeClass:"badge-hit",
    img:"images/skakal%20blue.png",
    description:"Скоростная скакалка SkyRope для кросс-тренинга и бокса. Алюминиевые ручки, двойные шарикоподшипники, регулируемая длина троса.",
    chars:[{label:"Цвет",value:"Голубой"},{label:"Длина троса",value:"3 м (рег.)"},{label:"Трос",value:"Сталь + ПВХ"},{label:"Ручки",value:"Алюминий"},{label:"Гарантия",value:"1 год"}],
    colors:["#3FB6F0"] },

  { id:16, name:"Бинты SkyWrap", category:"accessories", categoryLabel:"Аксессуары",
    price:590, oldPrice:null, rating:4.6, reviews:54, badge:null, badgeClass:null,
    img:"images/bint%20green.png",
    description:"Кистевые бинты SkyWrap для тяжёлой атлетики и единоборств. Жёсткая фиксация, петля для большого пальца, 2 шт в комплекте.",
    chars:[{label:"Цвет",value:"Зелёный"},{label:"Длина",value:"3 м"},{label:"Ширина",value:"5 см"},{label:"Материал",value:"Хлопок + эластан"},{label:"Гарантия",value:"6 мес"}],
    colors:["#5BB94A"] },

  { id:17, name:"Тейп SkyTape", category:"accessories", categoryLabel:"Аксессуары",
    price:390, oldPrice:null, rating:4.5, reviews:42, badge:"Новинка", badgeClass:"badge-new",
    img:"images/type%20yellow.png",
    description:"Спортивный кинезио-тейп SkyTape для поддержки мышц и суставов. Гипоаллергенный клей, эластичный хлопок, подходит для гимнастики и скалолазания.",
    chars:[{label:"Цвет",value:"Жёлтый"},{label:"Длина",value:"5 м"},{label:"Ширина",value:"5 см"},{label:"Материал",value:"Хлопок"},{label:"Гарантия",value:"Срок годности 3 г"}],
    colors:["#F2C744"] },

  { id:18, name:"Сумка SkyBag", category:"accessories", categoryLabel:"Аксессуары",
    price:1890, oldPrice:null, rating:4.7, reviews:67, badge:"Хит", badgeClass:"badge-hit",
    img:"images/bag%20red.png",
    description:"Спортивная сумка SkyBag 35 л с отделением для обуви. Влагостойкий нейлон, эргономичный плечевой ремень, боковой карман для бутылки.",
    chars:[{label:"Цвет",value:"Красный"},{label:"Объём",value:"35 л"},{label:"Материал",value:"Нейлон 600D"},{label:"Размер",value:"50×28×24 см"},{label:"Гарантия",value:"1 год"}],
    colors:["#E2433F"] }
];

/* ─── CART MANAGER ──────────────────────────────────────────── */
const Cart = {
  KEY: 'skystore_cart_v2',
  _d: null,

  get data() { if (!this._d) this._d = this._load(); return this._d; },

  _load() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch { return []; } },

  _save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.data));
    this._ui();
  },

  _ui() {
    const n = this.getTotalCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = n;
      el.style.display = n > 0 ? '' : 'none';
      el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
    });
  },

  add(id, qty = 1) {
    const ex = this.data.find(i => i.id === id);
    if (ex) { ex.qty += qty; } else { this.data.push({ id, qty }); }
    this._save();
  },

  remove(id) {
    const idx = this.data.findIndex(i => i.id === id);
    if (idx !== -1) { this.data.splice(idx, 1); this._save(); }
  },

  setQty(id, qty) {
    if (qty <= 0) { this.remove(id); return; }
    const item = this.data.find(i => i.id === id);
    if (item) { item.qty = qty; this._save(); }
  },

  clear()       { this._d = []; this._save(); },
  getItems()    { return this.data.map(i => { const p = PRODUCTS.find(p=>p.id===i.id); return p ? {...i, product:p} : null; }).filter(Boolean); },
  getSubtotal() { return this.getItems().reduce((s,i)=>s+i.product.price*i.qty,0); },
  getTotalCount(){ return this.data.reduce((s,i)=>s+i.qty,0); },
  getDelivery(m='standard') { if(m==='pickup')return 0; if(m==='express')return 490; return 290; }
};

/* ─── TOAST ─────────────────────────────────────────────────── */
const Toast = {
  _wrap: null,
  _get() {
    if (!this._wrap) { this._wrap = document.createElement('div'); this._wrap.className = 'toast-container'; document.body.appendChild(this._wrap); }
    return this._wrap;
  },
  show(title, sub='', iconSvg='', color='var(--c-primary)', iconBg='var(--c-primary-pale)') {
    const el = document.createElement('div');
    el.className = 'toast';
    el.style.setProperty('--toast-color', color);
    el.innerHTML = `
      <div class="toast-icon" style="background:${iconBg}">${iconSvg}</div>
      <div class="toast-text"><strong>${title}</strong>${sub?`<span>${sub}</span>`:''}</div>`;
    this._get().appendChild(el);
    setTimeout(() => { el.classList.add('hiding'); el.addEventListener('animationend', ()=>el.remove(), {once:true}); }, 3000);
  },
  cart(title, sub='')    { this.show(title, sub, svgIcon('cart'),    'var(--c-primary)', 'var(--c-primary-pale)'); },
  success(title, sub='') { this.show(title, sub, svgIcon('check'),   'var(--c-success)', '#dcfce7'); },
  error(title, sub='')   { this.show(title, sub, svgIcon('x'),       'var(--c-error)',   '#fee2e2'); }
};

function svgIcon(name) {
  const icons = {
    cart:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`,
    x:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`
  };
  return icons[name] || '';
}

/* ─── PROMO CODES ───────────────────────────────────────────── */
const PROMOS = {
  FREE: { discount: 0.10 }
};
let activePromo = null; // { code, discount }

function applyPromo() {
  const input = document.getElementById('promo-input');
  const msgEl = document.getElementById('promo-msg');
  if (!input || !msgEl) return;
  const code = input.value.trim().toUpperCase();
  const promo = PROMOS[code];
  if (promo) {
    activePromo = { code, discount: promo.discount };
    input.disabled = true;
    document.getElementById('promo-apply-btn').disabled = true;
    msgEl.textContent = `Промокод ${code} применён — скидка ${promo.discount * 100}%`;
    msgEl.className = 'promo-msg promo-msg-ok';
  } else {
    activePromo = null;
    msgEl.textContent = 'Промокод не найден';
    msgEl.className = 'promo-msg promo-msg-err';
  }
  updateCartSummary();
}

/* ─── CART PAGE RENDERER ─────────────────────────────────────── */
function renderCartPage() {
  const itemsEl   = document.getElementById('cart-items');
  const emptyEl   = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('cart-summary');
  if (!itemsEl) return;

  const items = Cart.getItems();

  if (!items.length) {
    itemsEl.style.display   = 'none';
    if (emptyEl)   emptyEl.style.display   = '';
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }
  if (emptyEl)   emptyEl.style.display   = 'none';
  if (summaryEl) summaryEl.style.display = '';
  itemsEl.style.display = '';

  itemsEl.innerHTML = items.map(it => `
    <div class="cart-item" data-id="${it.id}">
      <div class="cart-item-image">
        <img src="${it.product.img}" alt="${it.product.name}" loading="lazy">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-category">${it.product.categoryLabel}</div>
        <div class="cart-item-name"><a href="product.html?id=${it.product.id}">${it.product.name}</a></div>
        <div class="cart-item-variant">${formatPrice(it.product.price)} / шт</div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-price">${formatPrice(it.product.price * it.qty)}</div>
        <div class="cart-item-controls">
          <div class="cart-qty-ctrl">
            <button class="cart-qty-btn" onclick="cartChangeQty(${it.id},${it.qty-1})" aria-label="Уменьшить">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <span class="cart-qty-num">${it.qty}</span>
            <button class="cart-qty-btn" onclick="cartChangeQty(${it.id},${it.qty+1})" aria-label="Увеличить">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <button class="btn-remove" title="Удалить" onclick="cartRemove(${it.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
          </button>
        </div>
      </div>
    </div>`).join('');

  updateCartSummary();
}

function updateCartSummary() {
  const del = document.querySelector('[name="delivery"]:checked')?.value || 'standard';
  const sub = Cart.getSubtotal();
  const discount = activePromo ? Math.round(sub * activePromo.discount) : 0;
  const dc  = Cart.getDelivery(del);
  const tot = sub - discount + dc;
  const s = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  s('summary-subtotal', formatPrice(sub));
  s('summary-delivery', dc === 0 ? 'Бесплатно' : formatPrice(dc));
  s('summary-total',    formatPrice(tot));

  const discRow = document.getElementById('summary-discount-row');
  if (discRow) discRow.style.display = discount > 0 ? '' : 'none';
  s('summary-discount', discount > 0 ? '−' + formatPrice(discount) : '');

  const fmEl = document.getElementById('free-delivery-msg');
  if (fmEl) fmEl.style.display = 'none';
}

function cartChangeQty(id, qty) { Cart.setQty(id, qty); renderCartPage(); }
function cartRemove(id)          { Cart.remove(id); Toast.error('Товар удалён'); renderCartPage(); }
function formatPrice(n)          { return new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:0}).format(n); }

/* ─── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Cart._ui();

  /* Sync all add-to-cart buttons on page load */
  syncAllCartButtons();

  /* Global add-to-cart / qty control */
  document.addEventListener('click', e => {

    /* Add to cart */
    const addBtn = e.target.closest('[data-add-cart]');
    if (addBtn && !addBtn.closest('.card-qty-ctrl')) {
      const id = parseInt(addBtn.dataset.addCart);
      const p = PRODUCTS.find(p => p.id === id);
      if (!p) return;
      Cart.add(id, 1);
      Toast.cart('Добавлено в корзину', p.name);
      syncCartButton(addBtn, id);
      return;
    }

    /* Decrease qty from card */
    const minusBtn = e.target.closest('[data-cart-minus]');
    if (minusBtn) {
      const id = parseInt(minusBtn.dataset.cartMinus);
      const item = Cart.data.find(i => i.id === id);
      if (!item) return;
      Cart.setQty(id, item.qty - 1);
      const wrap = minusBtn.closest('.product-actions');
      if (wrap) {
        const btn = wrap.querySelector('[data-add-cart]');
        if (btn) syncCartButton(btn, id);
      }
      return;
    }

    /* Increase qty from card */
    const plusBtn = e.target.closest('[data-cart-plus]');
    if (plusBtn) {
      const id = parseInt(plusBtn.dataset.cartPlus);
      const item = Cart.data.find(i => i.id === id);
      if (!item) return;
      Cart.setQty(id, item.qty + 1);
      const wrap = plusBtn.closest('.product-actions');
      if (wrap) {
        const btn = wrap.querySelector('[data-add-cart]');
        if (btn) syncCartButton(btn, id);
      }
      return;
    }
  });

  renderCartPage();
});

function syncAllCartButtons() {
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    const id = parseInt(btn.dataset.addCart);
    syncCartButton(btn, id);
  });
}

function syncCartButton(btn, id) {
  const item = Cart.data.find(i => i.id === id);
  const wrap = btn.closest('.product-actions');
  if (!wrap) return;

  /* Remove existing qty control if present */
  const existing = wrap.querySelector('.card-qty-ctrl');
  if (existing) existing.remove();

  if (item && item.qty > 0) {
    btn.classList.add('in-cart');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      В корзине`;

    const ctrl = document.createElement('div');
    ctrl.className = 'card-qty-ctrl';
    ctrl.innerHTML = `
      <button class="card-qty-btn" data-cart-minus="${id}" aria-label="Уменьшить">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <span class="card-qty-num">${item.qty}</span>
      <button class="card-qty-btn" data-cart-plus="${id}" aria-label="Увеличить">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>`;
    wrap.appendChild(ctrl);
  } else {
    btn.classList.remove('in-cart');
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      В корзину`;
  }
}
