"""
SkyStore – Telegram-бот спортивного магазина.

Локальный запуск (polling):
    python bot.py          # WEBHOOK_URL не задан → long polling

Продакшн (webhook, Render/Koyeb):
    Задай в переменных окружения:
      WEBHOOK_URL=https://<имя>.onrender.com
      BOT_TOKEN=...
    Бот запустит aiohttp-сервер на порту PORT (по умолчанию 10000).
"""
import asyncio
import logging

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import BotCommand
from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application
from aiohttp import web

import config
from handlers import cart, catalog, checkout, fallback, info, search, start
from services import db

COMMANDS = [
    BotCommand(command="start",    description="Главное меню"),
    BotCommand(command="catalog",  description="Каталог товаров"),
    BotCommand(command="cart",     description="Корзина"),
    BotCommand(command="search",   description="Поиск товара"),
    BotCommand(command="info",     description="Доставка, оплата, возврат"),
    BotCommand(command="contacts", description="Контакты"),
    BotCommand(command="help",     description="Помощь"),
    BotCommand(command="cancel",   description="Отмена"),
]


def _build_dp() -> Dispatcher:
    dp = Dispatcher(storage=MemoryStorage())
    # Порядок важен: меню-кнопки (без StateFilter) должны идти до FSM-хендлеров поиска/промокода
    dp.include_routers(
        start.router,
        checkout.router,
        cart.router,
        catalog.router,
        info.router,
        search.router,
        fallback.router,
    )
    return dp


async def _setup(bot: Bot, dp: Dispatcher) -> None:
    db.init_db()
    await bot.set_my_commands(COMMANDS)
    # Текст на пустом экране до нажатия START (это не сообщение, а описание бота)
    await bot.set_my_description(
        "SkyStore – магазин спортивной экипировки для тренировок и активной жизни.\n\n"
        "Чтобы начать, нажмите /start 👇"
    )
    me = await bot.get_me()
    logging.info("SkyStore bot запущен: @%s", me.username)


# ─── Webhook-режим (Render / Koyeb) ────────────────────────────────
def run_webhook(bot: Bot, dp: Dispatcher) -> None:
    webhook_path = f"/webhook/{config.BOT_TOKEN}"
    webhook_url  = config.WEBHOOK_URL + webhook_path

    async def on_startup(b: Bot) -> None:
        await _setup(b, dp)
        await b.set_webhook(webhook_url, drop_pending_updates=True)
        logging.info("Webhook: %s", webhook_url)

    async def on_shutdown(b: Bot) -> None:
        await b.delete_webhook()

    async def health(_request: web.Request) -> web.Response:
        return web.Response(text="OK")

    dp.startup.register(on_startup)
    dp.shutdown.register(on_shutdown)

    app = web.Application()
    app.router.add_get("/health", health)          # для UptimeRobot
    SimpleRequestHandler(dispatcher=dp, bot=bot).register(app, path=webhook_path)
    setup_application(app, dp, bot=bot)

    logging.info("Webhook-сервер на порту %d", config.PORT)
    web.run_app(app, host="0.0.0.0", port=config.PORT)


# ─── Polling-режим (локальный запуск) ──────────────────────────────
async def run_polling(bot: Bot, dp: Dispatcher) -> None:
    await _setup(bot, dp)
    logging.info("Polling-режим")
    await dp.start_polling(bot, drop_pending_updates=True)


# ─── Точка входа ───────────────────────────────────────────────────
def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )
    bot = Bot(
        token=config.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    dp = _build_dp()

    if config.WEBHOOK_URL:
        run_webhook(bot, dp)
    else:
        asyncio.run(run_polling(bot, dp))


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        logging.info("Бот остановлен")
