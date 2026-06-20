"""Каталог: категории и карточки товаров."""
from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, FSInputFile, Message

import texts
from data.products import get_product, image_path, products_by_category
from keyboards.menus import (
    categories_kb,
    product_card_kb,
    product_list_kb,
)
from services import db

router = Router()


# ─── Показ категорий ───────────────────────────────────────────────
async def show_categories(message: Message) -> None:
    await message.answer(texts.CATALOG_TITLE, reply_markup=categories_kb())


async def send_product_card(message: Message, product: dict, user_id: int) -> None:
    qty = db.get_qty(user_id, product["id"])
    caption = texts.product_caption(product)
    kb = product_card_kb(product, qty)
    img = image_path(product)
    if img:
        await message.answer_photo(FSInputFile(img), caption=caption, reply_markup=kb)
    else:
        await message.answer(caption, reply_markup=kb)


# ─── Точки входа из меню (работают из любого состояния FSM) ────────
@router.message(F.text == texts.BTN_CATALOG)
@router.message(Command("catalog"))
async def catalog_entry(message: Message, state: FSMContext) -> None:
    await state.clear()
    await show_categories(message)


@router.callback_query(F.data == "open:catalog")
async def open_catalog(cb: CallbackQuery) -> None:
    await show_categories(cb.message)
    await cb.answer()


# ─── Навигация по каталогу ─────────────────────────────────────────
@router.callback_query(F.data.startswith("cat:"))
async def open_category(cb: CallbackQuery) -> None:
    key = cb.data.split(":", 1)[1]
    items = products_by_category(key)
    await cb.message.answer(
        f"<b>{texts.esc(items[0]['categoryLabel']) if items else 'Категория'}</b>\nВыберите товар:",
        reply_markup=product_list_kb(items, back_cb="open:catalog"),
    )
    await cb.answer()


@router.callback_query(F.data.startswith("prod:"))
async def open_product(cb: CallbackQuery) -> None:
    pid = int(cb.data.split(":", 1)[1])
    product = get_product(pid)
    if not product:
        await cb.answer("Товар не найден", show_alert=True)
        return
    await send_product_card(cb.message, product, cb.from_user.id)
    await cb.answer()


# ─── Добавление / изменение количества из карточки ─────────────────
async def _refresh_card(cb: CallbackQuery, product: dict) -> None:
    qty = db.get_qty(cb.from_user.id, product["id"])
    try:
        await cb.message.edit_reply_markup(reply_markup=product_card_kb(product, qty))
    except Exception:
        pass


@router.callback_query(F.data.startswith("add:"))
async def card_add(cb: CallbackQuery) -> None:
    pid = int(cb.data.split(":", 1)[1])
    product = get_product(pid)
    if not product:
        await cb.answer("Товар не найден", show_alert=True)
        return
    db.add_to_cart(cb.from_user.id, pid, 1)
    await _refresh_card(cb, product)
    await cb.answer("Добавлено в корзину!")


@router.callback_query(F.data.startswith("inc:"))
async def card_inc(cb: CallbackQuery) -> None:
    pid = int(cb.data.split(":", 1)[1])
    product = get_product(pid)
    if not product:
        await cb.answer()
        return
    db.add_to_cart(cb.from_user.id, pid, 1)
    await _refresh_card(cb, product)
    await cb.answer()


@router.callback_query(F.data.startswith("dec:"))
async def card_dec(cb: CallbackQuery) -> None:
    pid = int(cb.data.split(":", 1)[1])
    product = get_product(pid)
    if not product:
        await cb.answer()
        return
    db.set_qty(cb.from_user.id, pid, db.get_qty(cb.from_user.id, pid) - 1)
    await _refresh_card(cb, product)
    await cb.answer()


@router.callback_query(F.data == "noop")
async def noop(cb: CallbackQuery) -> None:
    await cb.answer()
