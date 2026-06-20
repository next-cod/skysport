"""Оформление заказа – пошаговый сценарий (FSM)."""
import re

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import (
    CallbackQuery,
    KeyboardButton,
    Message,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
)

import texts
from config import ADMIN_CHAT_ID
from keyboards.menus import (
    cancel_inline,
    comment_skip_kb,
    confirm_kb,
    delivery_kb,
    main_menu,
    payment_kb,
)
from services import db, shop

router = Router()


class CheckoutSG(StatesGroup):
    name = State()
    phone = State()
    delivery = State()
    address = State()
    comment = State()
    payment = State()
    confirm = State()


def _phone_kb() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📱 Отправить мой номер", request_contact=True)],
            [KeyboardButton(text="✖️ Отмена")],
        ],
        resize_keyboard=True,
        one_time_keyboard=True,
    )


# ─── Старт (вызывается из корзины) ─────────────────────────────────
async def start_checkout(cb: CallbackQuery, state: FSMContext) -> None:
    if not shop.cart_items(cb.from_user.id):
        await cb.answer(texts.CO_EMPTY, show_alert=True)
        return
    await state.clear()
    await state.set_state(CheckoutSG.name)
    await cb.message.answer(texts.CO_NAME, reply_markup=ReplyKeyboardRemove())
    await cb.answer()


# ─── Шаг 1: имя ────────────────────────────────────────────────────
@router.message(CheckoutSG.name, F.text)
async def step_name(message: Message, state: FSMContext) -> None:
    name = message.text.strip()
    if name == "✖️ Отмена":
        await _cancel(message, state)
        return
    if len(name) < 2:
        await message.answer("Введите, пожалуйста, корректное имя.")
        return
    await state.update_data(name=name)
    await state.set_state(CheckoutSG.phone)
    await message.answer(texts.CO_PHONE, reply_markup=_phone_kb())


# ─── Шаг 2: телефон ────────────────────────────────────────────────
@router.message(CheckoutSG.phone, F.contact)
async def step_phone_contact(message: Message, state: FSMContext) -> None:
    await _save_phone(message, state, message.contact.phone_number)


@router.message(CheckoutSG.phone, F.text)
async def step_phone_text(message: Message, state: FSMContext) -> None:
    text = message.text.strip()
    if text == "✖️ Отмена":
        await _cancel(message, state)
        return
    if len(re.sub(r"\D", "", text)) < 10:
        await message.answer(texts.CO_PHONE_BAD)
        return
    await _save_phone(message, state, text)


async def _save_phone(message: Message, state: FSMContext, phone: str) -> None:
    await state.update_data(phone=phone)
    await state.set_state(CheckoutSG.delivery)
    await message.answer("Контакты сохранены 👌", reply_markup=ReplyKeyboardRemove())
    await message.answer(texts.CO_DELIVERY, reply_markup=delivery_kb())


# ─── Шаг 3: доставка ───────────────────────────────────────────────
@router.callback_query(F.data.startswith("co:delivery:"))
async def step_delivery(cb: CallbackQuery, state: FSMContext) -> None:
    key = cb.data.split(":")[2]
    await state.update_data(delivery=key)
    if key == "pickup":
        await state.set_state(CheckoutSG.comment)
        await cb.message.answer(texts.CO_COMMENT, reply_markup=comment_skip_kb())
    else:
        await state.set_state(CheckoutSG.address)
        await cb.message.answer(texts.CO_ADDRESS, reply_markup=cancel_inline())
    await cb.answer()


# ─── Шаг 4: адрес ──────────────────────────────────────────────────
@router.message(CheckoutSG.address, F.text)
async def step_address(message: Message, state: FSMContext) -> None:
    addr = message.text.strip()
    if len(addr) < 5:
        await message.answer("Напишите адрес чуть подробнее 🙂")
        return
    await state.update_data(address=addr)
    await state.set_state(CheckoutSG.comment)
    await message.answer(texts.CO_COMMENT, reply_markup=comment_skip_kb())


# ─── Шаг 5: комментарий ────────────────────────────────────────────
@router.message(CheckoutSG.comment, F.text)
async def step_comment(message: Message, state: FSMContext) -> None:
    await state.update_data(comment=message.text.strip())
    await _ask_payment(message, state)


@router.callback_query(F.data == "co:comment_skip")
async def step_comment_skip(cb: CallbackQuery, state: FSMContext) -> None:
    await state.update_data(comment="")
    await _ask_payment(cb.message, state)
    await cb.answer()


async def _ask_payment(target: Message, state: FSMContext) -> None:
    await state.set_state(CheckoutSG.payment)
    await target.answer(texts.CO_PAYMENT, reply_markup=payment_kb())


# ─── Шаг 6: оплата → проверка заказа ───────────────────────────────
@router.callback_query(F.data.startswith("co:payment:"))
async def step_payment(cb: CallbackQuery, state: FSMContext) -> None:
    key = cb.data.split(":")[2]
    await state.update_data(payment=key)
    data = await state.get_data()
    promo = shop.get_promo(cb.from_user.id)
    t = shop.totals(cb.from_user.id, delivery_key=data["delivery"], promo_code=promo)
    await state.set_state(CheckoutSG.confirm)
    await cb.message.answer(texts.order_review_text(data, t), reply_markup=confirm_kb())
    await cb.answer()


# ─── Шаг 7: подтверждение ──────────────────────────────────────────
@router.callback_query(F.data == "co:confirm")
async def step_confirm(cb: CallbackQuery, state: FSMContext) -> None:
    uid = cb.from_user.id
    data = await state.get_data()
    promo = shop.get_promo(uid)
    t = shop.totals(uid, delivery_key=data["delivery"], promo_code=promo)

    if not t["items"]:
        await state.clear()
        await cb.message.answer(texts.CO_EMPTY, reply_markup=main_menu())
        await cb.answer()
        return

    payload = {
        **{k: data.get(k, "") for k in ("name", "phone", "delivery", "address", "comment", "payment")},
        "promo": promo or "",
        "items": [
            {"id": i["product"]["id"], "name": i["product"]["name"], "qty": i["qty"], "price": i["product"]["price"]}
            for i in t["items"]
        ],
        "subtotal": t["subtotal"], "discount": t["discount"],
        "delivery_price": t["delivery"], "total": t["total"],
    }
    order_no = f"#{db.save_order(uid, payload)}"

    db.clear_cart(uid)
    shop.clear_promo(uid)
    await state.clear()

    await cb.message.answer(texts.order_confirmed_user(order_no), reply_markup=main_menu())
    await cb.answer("Заказ оформлен! ✅")

    # Уведомление администратора (если задан ADMIN_CHAT_ID)
    if ADMIN_CHAT_ID:
        try:
            await cb.bot.send_message(
                ADMIN_CHAT_ID, texts.order_admin_text(order_no, cb.from_user, data, t)
            )
        except Exception:
            pass


# ─── Отмена ────────────────────────────────────────────────────────
@router.callback_query(F.data == "co:cancel")
async def cancel_cb(cb: CallbackQuery, state: FSMContext) -> None:
    await _cancel(cb.message, state)
    await cb.answer("Отменено")


async def _cancel(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.CO_CANCELLED, reply_markup=main_menu())
