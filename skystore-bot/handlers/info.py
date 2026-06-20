"""Информационные разделы: доставка, возврат, FAQ, о магазине, контакты."""
from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.types import (
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Message,
)

import texts
from keyboards.menus import faq_answer_kb, faq_kb, info_kb, main_menu

router = Router()

_BACK_TO_INFO = InlineKeyboardMarkup(
    inline_keyboard=[[InlineKeyboardButton(text="← Назад", callback_data="open:info")]]
)


async def _edit(cb: CallbackQuery, text: str, kb: InlineKeyboardMarkup) -> None:
    try:
        await cb.message.edit_text(text, reply_markup=kb)
    except Exception:
        await cb.message.answer(text, reply_markup=kb)
    await cb.answer()


# ─── Вход из меню (работает из любого состояния FSM) ───────────────
@router.message(F.text == texts.BTN_INFO)
@router.message(Command("info"))
async def info_entry(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.INFO_TITLE, reply_markup=info_kb())


@router.message(F.text == texts.BTN_CONTACTS)
@router.message(Command("contacts"))
async def contacts_entry(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.contacts_text(), reply_markup=main_menu())


# ─── Разделы информации ────────────────────────────────────────────
@router.callback_query(F.data == "open:info")
async def open_info(cb: CallbackQuery) -> None:
    await _edit(cb, texts.INFO_TITLE, info_kb())


@router.callback_query(F.data == "info:delivery")
async def info_delivery(cb: CallbackQuery) -> None:
    await _edit(cb, texts.INFO_DELIVERY, _BACK_TO_INFO)


@router.callback_query(F.data == "info:returns")
async def info_returns(cb: CallbackQuery) -> None:
    await _edit(cb, texts.INFO_RETURNS, _BACK_TO_INFO)


@router.callback_query(F.data == "info:about")
async def info_about(cb: CallbackQuery) -> None:
    await _edit(cb, texts.ABOUT, _BACK_TO_INFO)


# ─── FAQ ───────────────────────────────────────────────────────────
@router.callback_query(F.data == "info:faq")
async def info_faq(cb: CallbackQuery) -> None:
    await _edit(cb, texts.FAQ_TITLE, faq_kb())


@router.callback_query(F.data.startswith("faq:"))
async def faq_answer(cb: CallbackQuery) -> None:
    idx = int(cb.data.split(":", 1)[1])
    if 0 <= idx < len(texts.FAQ):
        q, a = texts.FAQ[idx]
        await _edit(cb, f"<b>{q}</b>\n\n{a}", faq_answer_kb())
    else:
        await cb.answer()
