"""Фолбэк: ловит всё, что не обработали другие роутеры. Включается последним."""
from aiogram import Router
from aiogram.types import CallbackQuery, Message

from keyboards.menus import main_menu

router = Router()


@router.message()
async def unknown_message(message: Message) -> None:
    await message.answer(
        "Не совсем понял 🤔 Воспользуйтесь меню ниже или командой /help.",
        reply_markup=main_menu(),
    )


@router.callback_query()
async def unknown_callback(cb: CallbackQuery) -> None:
    await cb.answer()
