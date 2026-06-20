"""
Все клавиатуры бота.
Главное меню – постоянные кнопки снизу (ReplyKeyboard).
Каталог/корзина/оформление – инлайн-кнопки под сообщениями.
"""
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
)
from aiogram.utils.keyboard import InlineKeyboardBuilder

import texts
from config import DELIVERY, PAYMENTS
from data.products import CATEGORIES, format_price


def _short(name: str, limit: int = 22) -> str:
    return name if len(name) <= limit else name[: limit - 1] + "…"


# ─── Главное меню (постоянная клавиатура) ──────────────────────────
def main_menu() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text=texts.BTN_CATALOG), KeyboardButton(text=texts.BTN_CART)],
            [KeyboardButton(text=texts.BTN_SEARCH), KeyboardButton(text=texts.BTN_CONTACTS)],
            [KeyboardButton(text=texts.BTN_INFO)],
        ],
        resize_keyboard=True,
        input_field_placeholder="Выберите раздел…",
    )


# ─── Каталог ───────────────────────────────────────────────────────
def categories_kb() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()
    for c in CATEGORIES:
        kb.button(text=c["label"], callback_data=f"cat:{c['key']}")
    kb.adjust(2)
    return kb.as_markup()


def product_list_kb(products: list[dict], back_cb: str) -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()
    for p in products:
        kb.button(
            text=f"{_short(p['name'])} · {format_price(p['price'])}",
            callback_data=f"prod:{p['id']}",
        )
    kb.button(text="← Назад", callback_data=back_cb)
    kb.adjust(1)
    return kb.as_markup()


def product_card_kb(product: dict, qty: int) -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()
    pid = product["id"]
    if qty <= 0:
        kb.row(InlineKeyboardButton(text="В корзину", callback_data=f"add:{pid}"))
    else:
        kb.row(
            InlineKeyboardButton(text="−", callback_data=f"dec:{pid}"),
            InlineKeyboardButton(text=f"{qty} шт", callback_data="noop"),
            InlineKeyboardButton(text="+", callback_data=f"inc:{pid}"),
        )
        kb.row(InlineKeyboardButton(text="Перейти в корзину", callback_data="open:cart"))
    kb.row(InlineKeyboardButton(text="← Назад", callback_data=f"cat:{product['category']}"))
    return kb.as_markup()


# ─── Корзина ───────────────────────────────────────────────────────
def cart_kb(items: list[dict], has_promo: bool) -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()
    for i in items:
        p = i["product"]
        kb.row(
            InlineKeyboardButton(text="−", callback_data=f"cdec:{p['id']}"),
            InlineKeyboardButton(text=f"{_short(p['name'], 18)} · {i['qty']}", callback_data="noop"),
            InlineKeyboardButton(text="+", callback_data=f"cinc:{p['id']}"),
            InlineKeyboardButton(text="×", callback_data=f"cdel:{p['id']}"),
        )
    if not has_promo:
        kb.row(InlineKeyboardButton(text="Промокод", callback_data="promo"))
    kb.row(InlineKeyboardButton(text="Оформить заказ", callback_data="checkout"))
    kb.row(
        InlineKeyboardButton(text="В каталог", callback_data="open:catalog"),
        InlineKeyboardButton(text="Очистить", callback_data="clear"),
    )
    return kb.as_markup()


# ─── Оформление заказа ─────────────────────────────────────────────
def cancel_inline() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="Отмена", callback_data="co:cancel")]]
    )


def delivery_kb() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()
    for key, d in DELIVERY.items():
        price = "Бесплатно" if d["price"] == 0 else format_price(d["price"])
        kb.button(text=f"{d['title']} · {price}", callback_data=f"co:delivery:{key}")
    kb.button(text="Отмена", callback_data="co:cancel")
    kb.adjust(1)
    return kb.as_markup()


def comment_skip_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Пропустить", callback_data="co:comment_skip")],
            [InlineKeyboardButton(text="Отмена", callback_data="co:cancel")],
        ]
    )


def payment_kb() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()
    for key, title in PAYMENTS.items():
        kb.button(text=title, callback_data=f"co:payment:{key}")
    kb.button(text="Отмена", callback_data="co:cancel")
    kb.adjust(1)
    return kb.as_markup()


def confirm_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Подтвердить заказ", callback_data="co:confirm")],
            [InlineKeyboardButton(text="Отмена", callback_data="co:cancel")],
        ]
    )


# ─── Информация ────────────────────────────────────────────────────
def info_kb() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()
    kb.button(text="Доставка и оплата", callback_data="info:delivery")
    kb.button(text="Возврат", callback_data="info:returns")
    kb.button(text="Частые вопросы", callback_data="info:faq")
    kb.button(text="О магазине", callback_data="info:about")
    kb.adjust(1)
    return kb.as_markup()


def faq_kb() -> InlineKeyboardMarkup:
    kb = InlineKeyboardBuilder()
    for idx, (q, _) in enumerate(texts.FAQ):
        kb.button(text=q, callback_data=f"faq:{idx}")
    kb.button(text="← Назад", callback_data="open:info")
    kb.adjust(1)
    return kb.as_markup()


def faq_answer_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="← К вопросам", callback_data="info:faq")]]
    )
