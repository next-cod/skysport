"""
SkyStore Bot – конфигурация.

Все секреты (токен, id админа) берутся из .env – он не попадает в git.
Здесь же – бизнес-настройки магазина: доставка, промокоды, контакты.
Меняй значения тут, тексты сообщений – в texts.py.
"""
import os
from pathlib import Path

from dotenv import load_dotenv

# ─── Пути ──────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent            # .../skystore-bot
load_dotenv(BASE_DIR / ".env")

# Картинки товаров лежат в папке сайта (переиспользуем те же файлы)
LANDING_IMAGES = BASE_DIR.parent / "skystore-landing" / "images"
DB_PATH = BASE_DIR / "skystore.db"

# ─── Секреты из .env ───────────────────────────────────────────────
BOT_TOKEN = os.getenv("BOT_TOKEN", "").strip()

_admin = os.getenv("ADMIN_CHAT_ID", "").strip()
# id чата, куда падают новые заказы. Необязательно. Узнать свой id: @userinfobot
ADMIN_CHAT_ID = int(_admin) if _admin.lstrip("-").isdigit() else None

SITE_URL = os.getenv("SITE_URL", "").strip()

# ─── Хостинг / webhook ─────────────────────────────────────────────
# Для локального запуска – оставь пустым, бот включит long polling.
# Для Render / Koyeb – вставь URL сервиса (без слэша в конце):
#   WEBHOOK_URL=https://skystore-bot.onrender.com
_koyeb = os.getenv("KOYEB_PUBLIC_DOMAIN", "")
WEBHOOK_URL = (
    os.getenv("WEBHOOK_URL")
    or os.getenv("RENDER_EXTERNAL_URL")
    or (f"https://{_koyeb}" if _koyeb else "")
).rstrip("/")
PORT = int(os.getenv("PORT", "10000"))

# ─── Настройки магазина ────────────────────────────────────────────
STORE = {
    "name":    "SkyStore",
    "phone":   "+7 (843) 271-95-68",
    "email":   "skystore@mail.com",
    "address": "Москва, Спортивная ул., 12",
    "hours":   "Пн–Пт 9:00–20:00 · Сб 10:00–18:00",
}

# Доставка (₽). pickup – самовывоз, бесплатно.
DELIVERY = {
    "standard": {"price": 290, "title": "Стандартная доставка", "desc": "2–4 рабочих дня"},
    "express":  {"price": 490, "title": "Экспресс-доставка",     "desc": "На следующий день (Москва и СПб)"},
    "pickup":   {"price": 0,   "title": "Самовывоз",             "desc": "Москва, Спортивная ул., 12 – бесплатно"},
}
FREE_DELIVERY_THRESHOLD = 3000          # бесплатная доставка от этой суммы

# Способы оплаты
PAYMENTS = {
    "cash": "Оплата при получении (наличными или картой курьеру)",
    "card": "Картой онлайн (Visa, Mastercard, МИР)",
    "sbp":  "СБП (быстрые платежи, без комиссии)",
}

# Промокоды: код → скидка (доля). FREE = −10%.
PROMOS = {
    "FREE": 0.10,
}

if not BOT_TOKEN:
    raise RuntimeError(
        "BOT_TOKEN не задан. Скопируй .env.example в .env и впиши токен от @BotFather."
    )
