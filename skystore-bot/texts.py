"""
Все тексты сообщений бота в одном месте.
Меняй спокойно – это обычные строки. Разметка: HTML (<b>, <i>, <a href>).
В пользовательских данных (имя, адрес) спецсимволы экранируются автоматически.
"""
import html

from config import DELIVERY, FREE_DELIVERY_THRESHOLD, PAYMENTS, STORE, SITE_URL
from data.products import format_price, stars

esc = html.escape

# ─── Подписи кнопок главного меню (по ним же ловим нажатия) ─────────
BTN_CATALOG  = "Каталог"
BTN_CART     = "Корзина"
BTN_SEARCH   = "Поиск"
BTN_INFO     = "Информация"
BTN_CONTACTS = "Контакты"

# ─── Приветствие и помощь ──────────────────────────────────────────
WELCOME = (
    "👋 <b>Добро пожаловать в SkyStore!</b>\n\n"
    "Спортивная экипировка для тренировок и активной жизни – бутылки, эспандеры, "
    "рюкзаки, перчатки, коврики и многое другое.\n\n"
    "Выберите нужный раздел в меню ниже ↓"
)

HELP = (
    "<b>Что умеет бот SkyStore</b>\n\n"
    "<b>Каталог</b> – товары по категориям\n"
    "<b>Поиск</b> – найти товар по названию\n"
    "<b>Корзина</b> – собрать заказ и оформить доставку\n"
    "<b>Информация</b> – доставка, оплата, возврат\n\n"
    "Команды: /start · /catalog · /cart · /help"
)

# ─── Каталог ───────────────────────────────────────────────────────
CATALOG_TITLE = "🛍 <b>Каталог</b>\n\nВыберите категорию:"


def product_caption(p) -> str:
    badge = f"   ·   {p['badge']}" if p["badge"] else ""
    lines = [
        f"<b>{p['name']}</b>{badge}",
        f"{stars(p['rating'])}  {p['rating']} · {p['reviews']} отзывов",
        "",
        p["description"],
        "",
    ]
    lines += [f"- {label}: {value}" for label, value in p["chars"]]
    lines.append("")
    lines.append(f"💰 <b>{format_price(p['price'])}</b>")
    return "\n".join(lines)


# ─── Поиск ─────────────────────────────────────────────────────────
SEARCH_PROMPT = "🔎 Напишите название товара – найдём то, что нужно:"
SEARCH_EMPTY = (
    "По этому запросу ничего не нашлось.\n"
    "Попробуйте другое слово – например, «коврик», «бутылка» или «перчатки»."
)


def search_results_title(query: str, n: int) -> str:
    return f"По запросу «{esc(query)}» найдено: <b>{n}</b>"


# ─── Корзина ───────────────────────────────────────────────────────
CART_EMPTY = (
    "🛒 <b>Корзина пуста</b>\n\n"
    "Загляните в каталог – там много всего интересного 👀"
)


def cart_text(t, promo_code: str | None = None) -> str:
    lines = ["🛒 <b>Ваша корзина</b>\n"]
    for i in t["items"]:
        p = i["product"]
        lines.append(
            f"- <b>{p['name']}</b>\n   {i['qty']} × {format_price(p['price'])} = "
            f"<b>{format_price(i['line'])}</b>"
        )
    lines.append("")
    lines.append(f"Товары: <b>{format_price(t['subtotal'])}</b>")
    if t["discount"]:
        lines.append(f"Промокод {esc(promo_code or '')}: −{format_price(t['discount'])}")
    if t["subtotal"] < FREE_DELIVERY_THRESHOLD:
        left = FREE_DELIVERY_THRESHOLD - t["subtotal"]
        lines.append(f"\nДо бесплатной доставки: {format_price(left)}")
    else:
        lines.append("\nДоставка бесплатно! 🎁")
    return "\n".join(lines)


PROMO_PROMPT = "Введите промокод:"
PROMO_OK = "Промокод <b>{code}</b> применён – скидка {pct}% 🎉"
PROMO_BAD = "Промокод не найден. Попробуйте ещё раз или вернитесь в корзину."

# ─── Оформление заказа ─────────────────────────────────────────────
CO_NAME = "<b>Оформление заказа</b>\n\nКак вас зовут? Введите имя и фамилию:"
CO_PHONE = (
    "Укажите номер телефона – позвоним для подтверждения заказа.\n"
    "Можно ввести вручную или нажать кнопку ниже ↓"
)
CO_PHONE_BAD = "Похоже, номер некорректный. Введите телефон ещё раз (минимум 10 цифр)."
CO_DELIVERY = "Выберите способ доставки:"
CO_ADDRESS = (
    "Напишите адрес доставки одним сообщением:\n"
    "<i>город, улица, дом, квартира, индекс</i>"
)
CO_COMMENT = (
    "Хотите что-то уточнить? Напишите комментарий к заказу "
    "(пожелания по доставке, удобное время для звонка).\n\n"
    "Или нажмите «Пропустить»."
)
CO_PAYMENT = "Выберите способ оплаты:"
CO_CANCELLED = "Оформление отменено. Корзина сохранена – возвращайтесь, когда будете готовы 🙂"
CO_EMPTY = "Корзина пуста – сначала добавьте товары из каталога."


def order_review_text(form: dict, t) -> str:
    dk = form["delivery"]
    lines = ["<b>Проверьте заказ перед отправкой</b>\n"]
    for i in t["items"]:
        p = i["product"]
        lines.append(f"- {p['name']} – {i['qty']} шт – {format_price(i['line'])}")
    lines += [
        "",
        f"Имя: {esc(form['name'])}",
        f"Телефон: {esc(form['phone'])}",
        f"Доставка: {DELIVERY[dk]['title']}",
    ]
    if dk != "pickup":
        lines.append(f"Адрес: {esc(form['address'])}")
    if form.get("comment"):
        lines.append(f"Комментарий: {esc(form['comment'])}")
    lines.append(f"Оплата: {PAYMENTS[form['payment']]}")
    lines.append("")
    lines.append(f"Товары: {format_price(t['subtotal'])}")
    if t["discount"]:
        lines.append(f"Скидка: −{format_price(t['discount'])}")
    lines.append(f"Доставка: {'Бесплатно' if t['delivery'] == 0 else format_price(t['delivery'])}")
    lines.append(f"\n💰 <b>Итого: {format_price(t['total'])}</b>")
    return "\n".join(lines)


def order_confirmed_user(order_no: str) -> str:
    return (
        f"✅ <b>Заказ {order_no} принят!</b>\n\n"
        "Спасибо за покупку в SkyStore! Свяжемся с вами в течение 30 минут для подтверждения."
    )


def order_admin_text(order_no: str, user, form: dict, t) -> str:
    dk = form["delivery"]
    uname = f"@{user.username}" if user.username else "–"
    lines = [
        f"<b>Новый заказ {order_no}</b>\n",
        f"Покупатель: {esc(form['name'])}",
        f"Телефон: {esc(form['phone'])}",
        f"Telegram: {uname} (id {user.id})",
        f"Доставка: {DELIVERY[dk]['title']}",
    ]
    if dk != "pickup":
        lines.append(f"Адрес: {esc(form['address'])}")
    if form.get("comment"):
        lines.append(f"Комментарий: {esc(form['comment'])}")
    lines.append(f"Оплата: {PAYMENTS[form['payment']]}")
    lines.append("")
    for i in t["items"]:
        p = i["product"]
        lines.append(f"- {p['name']} – {i['qty']} × {format_price(p['price'])}")
    lines.append("")
    if t["discount"]:
        lines.append(f"Скидка: −{format_price(t['discount'])}")
    lines.append(f"Итого: <b>{format_price(t['total'])}</b>")
    return "\n".join(lines)


# ─── Информация ────────────────────────────────────────────────────
INFO_TITLE = "<b>Информация</b>\n\nЧем могу помочь?"

INFO_DELIVERY = (
    "<b>Доставка и оплата</b>\n\n"
    f"<b>Стандартная</b> – 2–4 рабочих дня, {DELIVERY['standard']['price']} ₽\n"
    f"<b>Экспресс</b> – на следующий день, {DELIVERY['express']['price']} ₽ (Москва и СПб)\n"
    "<b>Самовывоз</b> – бесплатно, " + STORE["address"] + "\n\n"
    f"При заказе от {FREE_DELIVERY_THRESHOLD:,} ₽".replace(",", " ") +
    " – доставка бесплатно по всей России.\n\n"
    "<b>Оплата:</b> при получении · картой онлайн · СБП (без комиссии)."
)

INFO_RETURNS = (
    "<b>Возврат товара</b>\n\n"
    "Принимаем возврат в течение <b>14 дней</b> с момента получения – без лишних вопросов.\n\n"
    "1. Свяжитесь с нами по телефону или email\n"
    "2. Упакуйте товар в оригинальную упаковку\n"
    "3. Отправьте посылку или привезите в офис\n"
    "4. Деньги вернём в течение 3–5 рабочих дней"
)

ABOUT = (
    "<b>О SkyStore</b>\n\n"
    "Мы помогаем людям заниматься спортом – продаём качественную экипировку "
    "и аксессуары для тренировок и активной жизни.\n\n"
    "– Отправка в течение 24 часов\n"
    "– Доставка по всей России за 1–3 дня\n"
    "– Гарантия качества и возврат 14 дней\n"
    "– Поддержка 7 дней в неделю"
)

# Частые вопросы: (вопрос, ответ)
FAQ = [
    ("Нужна ли регистрация для заказа?",
     "Нет. Достаточно указать имя, телефон и адрес доставки – прямо здесь, в боте."),
    ("Как долго идёт доставка?",
     "Стандартная – 2–4 рабочих дня, экспресс – на следующий день (Москва и СПб). "
     "Отправляем в течение 24 часов после подтверждения."),
    ("Можно ли вернуть товар?",
     "Да, в течение 14 дней. Товар должен быть в оригинальной упаковке и без следов использования."),
    ("Есть ли бесплатная доставка?",
     "Да, при заказе от 3 000 ₽ по всей России. Самовывоз из офиса в Москве – всегда бесплатно."),
    ("Как отследить заказ?",
     "После отправки пришлём трек-номер по телефону. Также можно написать нам – подскажем статус."),
    ("Как связаться с поддержкой?",
     f"Телефон {STORE['phone']}, email {STORE['email']}. Работаем ежедневно."),
]
FAQ_TITLE = "<b>Частые вопросы</b>\n\nВыберите вопрос – ответим быстро:"


def contacts_text() -> str:
    lines = [
        "📞 <b>Контакты SkyStore</b>\n",
        f"Телефон: {STORE['phone']}",
        f"Email: {STORE['email']}",
        f"Адрес: {STORE['address']}",
        f"Режим работы: {STORE['hours']}",
    ]
    if SITE_URL:
        lines.append(f"\nСайт: {SITE_URL}")
    return "\n".join(lines)
