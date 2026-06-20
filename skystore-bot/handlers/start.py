"""Старт, помощь, главное меню."""
from pathlib import Path

from aiogram import Router
from aiogram.filters import Command, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import FSInputFile, Message

import texts
from keyboards.menus import main_menu

router = Router()

_BANNER = Path(__file__).parent.parent / "images" / "skystore баннер.jpg"


@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext) -> None:
    await state.clear()
    if _BANNER.exists():
        await message.answer_photo(
            FSInputFile(_BANNER),
            caption=texts.WELCOME,
            reply_markup=main_menu(),
        )
    else:
        await message.answer(texts.WELCOME, reply_markup=main_menu())


@router.message(Command("help"))
async def cmd_help(message: Message) -> None:
    await message.answer(texts.HELP, reply_markup=main_menu())


@router.message(Command("cancel"))
async def cmd_cancel(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer("Действие отменено. Возвращаю в главное меню.", reply_markup=main_menu())
