"""
Бизнес-логика корзины: подсчёт сумм, скидок и доставки.
Используется и корзиной, и оформлением заказа.
"""
from config import DELIVERY, FREE_DELIVERY_THRESHOLD, PROMOS
from data.products import get_product
from services import db

# Применённые промокоды в памяти (per user). Сбрасываются при перезапуске – это ок.
_promos: dict[int, str] = {}


def get_promo(user_id: int) -> str | None:
    return _promos.get(user_id)


def set_promo(user_id: int, code: str) -> None:
    _promos[user_id] = code


def clear_promo(user_id: int) -> None:
    _promos.pop(user_id, None)


def cart_items(user_id: int) -> list[dict]:
    """[{product, qty, line}] – пропускает товары, которых уже нет в каталоге."""
    items = []
    for pid, qty in db.get_cart(user_id):
        p = get_product(pid)
        if p:
            items.append({"product": p, "qty": qty, "line": p["price"] * qty})
    return items


def discount_amount(subtotal: int, promo_code: str | None) -> int:
    rate = PROMOS.get((promo_code or "").upper())
    return round(subtotal * rate) if rate else 0


def delivery_price(subtotal: int, delivery_key: str) -> int:
    if delivery_key == "pickup":
        return 0
    if subtotal >= FREE_DELIVERY_THRESHOLD:
        return 0
    return DELIVERY.get(delivery_key, DELIVERY["standard"])["price"]


def totals(user_id: int, delivery_key: str = "standard", promo_code: str | None = None) -> dict:
    items = cart_items(user_id)
    subtotal = sum(i["line"] for i in items)
    discount = discount_amount(subtotal, promo_code)
    delivery = delivery_price(subtotal, delivery_key)
    total = max(0, subtotal - discount) + delivery
    return {
        "items": items,
        "subtotal": subtotal,
        "discount": discount,
        "delivery": delivery,
        "total": total,
    }
