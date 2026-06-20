"""Поиск товаров по названию."""
from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import Message

import texts
from data.products import search
from keyboards.menus import product_list_kb

router = Router()


class SearchSG(StatesGroup):
    query = State()


# Работает из любого состояния FSM
@router.message(F.text == texts.BTN_SEARCH)
@router.message(Command("search"))
async def search_entry(message: Message, state: FSMContext) -> None:
    await state.set_state(SearchSG.query)
    await message.answer(texts.SEARCH_PROMPT)


@router.message(SearchSG.query, F.text & ~F.text.startswith("/"))
async def search_run(message: Message, state: FSMContext) -> None:
    await state.clear()
    query = message.text.strip()
    results = search(query)
    if not results:
        await message.answer(texts.SEARCH_EMPTY)
        return
    await message.answer(
        texts.search_results_title(query, len(results)),
        reply_markup=product_list_kb(results, back_cb="open:catalog"),
    )
