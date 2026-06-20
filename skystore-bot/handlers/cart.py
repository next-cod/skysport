"""Корзина: просмотр, изменение количества, промокод, переход к заказу."""
from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import (
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Message,
)

import texts
from config import PROMOS
from handlers import checkout
from keyboards.menus import cart_kb
from services import db, shop

router = Router()


class PromoSG(StatesGroup):
    code = State()


_TO_CATALOG = InlineKeyboardMarkup(
    inline_keyboard=[[InlineKeyboardButton(text="В каталог", callback_data="open:catalog")]]
)


async def show_cart(target: Message, user_id: int, edit: bool = False) -> None:
    promo = shop.get_promo(user_id)
    t = shop.totals(user_id, promo_code=promo)
    if not t["items"]:
        text, kb = texts.CART_EMPTY, _TO_CATALOG
    else:
        text, kb = texts.cart_text(t, promo), cart_kb(t["items"], has_promo=bool(promo))
    if edit:
        try:
            await target.edit_text(text, reply_markup=kb)
        except Exception:
            await target.answer(text, reply_markup=kb)
    else:
        await target.answer(text, reply_markup=kb)


# ─── Вход в корзину (работает из любого состояния FSM) ─────────────
@router.message(F.text == texts.BTN_CART)
@router.message(Command("cart"))
async def cart_entry(message: Message, state: FSMContext) -> None:
    await state.clear()
    await show_cart(message, message.from_user.id)


@router.callback_query(F.data == "open:cart")
async def open_cart(cb: CallbackQuery) -> None:
    await show_cart(cb.message, cb.from_user.id)
    await cb.answer()


# ─── Изменение количества прямо в корзине ──────────────────────────
@router.callback_query(F.data.startswith("cinc:"))
async def cart_inc(cb: CallbackQuery) -> None:
    pid = int(cb.data.split(":", 1)[1])
    db.add_to_cart(cb.from_user.id, pid, 1)
    await show_cart(cb.message, cb.from_user.id, edit=True)
    await cb.answer()


@router.callback_query(F.data.startswith("cdec:"))
async def cart_dec(cb: CallbackQuery) -> None:
    pid = int(cb.data.split(":", 1)[1])
    db.set_qty(cb.from_user.id, pid, db.get_qty(cb.from_user.id, pid) - 1)
    await show_cart(cb.message, cb.from_user.id, edit=True)
    await cb.answer()


@router.callback_query(F.data.startswith("cdel:"))
async def cart_del(cb: CallbackQuery) -> None:
    pid = int(cb.data.split(":", 1)[1])
    db.remove_from_cart(cb.from_user.id, pid)
    await show_cart(cb.message, cb.from_user.id, edit=True)
    await cb.answer("Удалено")


@router.callback_query(F.data == "clear")
async def cart_clear(cb: CallbackQuery) -> None:
    db.clear_cart(cb.from_user.id)
    shop.clear_promo(cb.from_user.id)
    await show_cart(cb.message, cb.from_user.id, edit=True)
    await cb.answer("Корзина очищена")


# ─── Промокод ──────────────────────────────────────────────────────
@router.callback_query(F.data == "promo")
async def promo_ask(cb: CallbackQuery, state: FSMContext) -> None:
    await state.set_state(PromoSG.code)
    await cb.message.answer(texts.PROMO_PROMPT)
    await cb.answer()


@router.message(PromoSG.code, F.text)
async def promo_apply(message: Message, state: FSMContext) -> None:
    code = message.text.strip().upper()
    if code in PROMOS:
        shop.set_promo(message.from_user.id, code)
        await state.clear()
        await message.answer(texts.PROMO_OK.format(code=code, pct=int(PROMOS[code] * 100)))
        await show_cart(message, message.from_user.id)
    else:
        await message.answer(texts.PROMO_BAD)


# ─── Переход к оформлению ──────────────────────────────────────────
@router.callback_query(F.data == "checkout")
async def cart_checkout(cb: CallbackQuery, state: FSMContext) -> None:
    await checkout.start_checkout(cb, state)
