"""
Хранилище на SQLite (стандартная библиотека, без лишних зависимостей).
Корзины и заказы переживают перезапуск бота.
"""
import json
import sqlite3
from datetime import datetime, timezone

from config import DB_PATH

# check_same_thread=False – обращаемся из обработчиков event loop'а
_conn = sqlite3.connect(DB_PATH, check_same_thread=False)
_conn.row_factory = sqlite3.Row


def init_db() -> None:
    _conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS cart (
            user_id    INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            qty        INTEGER NOT NULL,
            PRIMARY KEY (user_id, product_id)
        );

        CREATE TABLE IF NOT EXISTS orders (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id    INTEGER NOT NULL,
            created_at TEXT    NOT NULL,
            payload    TEXT    NOT NULL
        );
        """
    )
    _conn.commit()


# ─── Корзина ───────────────────────────────────────────────────────
def get_cart(user_id: int) -> list[tuple[int, int]]:
    """Список (product_id, qty), отсортированный для стабильного вывода."""
    rows = _conn.execute(
        "SELECT product_id, qty FROM cart WHERE user_id = ? ORDER BY rowid",
        (user_id,),
    ).fetchall()
    return [(r["product_id"], r["qty"]) for r in rows]


def add_to_cart(user_id: int, product_id: int, qty: int = 1) -> None:
    _conn.execute(
        """
        INSERT INTO cart (user_id, product_id, qty) VALUES (?, ?, ?)
        ON CONFLICT(user_id, product_id) DO UPDATE SET qty = qty + excluded.qty
        """,
        (user_id, product_id, qty),
    )
    _conn.commit()


def set_qty(user_id: int, product_id: int, qty: int) -> None:
    if qty <= 0:
        remove_from_cart(user_id, product_id)
        return
    _conn.execute(
        """
        INSERT INTO cart (user_id, product_id, qty) VALUES (?, ?, ?)
        ON CONFLICT(user_id, product_id) DO UPDATE SET qty = excluded.qty
        """,
        (user_id, product_id, qty),
    )
    _conn.commit()


def get_qty(user_id: int, product_id: int) -> int:
    row = _conn.execute(
        "SELECT qty FROM cart WHERE user_id = ? AND product_id = ?",
        (user_id, product_id),
    ).fetchone()
    return row["qty"] if row else 0


def remove_from_cart(user_id: int, product_id: int) -> None:
    _conn.execute(
        "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
        (user_id, product_id),
    )
    _conn.commit()


def clear_cart(user_id: int) -> None:
    _conn.execute("DELETE FROM cart WHERE user_id = ?", (user_id,))
    _conn.commit()


def cart_count(user_id: int) -> int:
    row = _conn.execute(
        "SELECT COALESCE(SUM(qty), 0) AS n FROM cart WHERE user_id = ?",
        (user_id,),
    ).fetchone()
    return row["n"]


# ─── Заказы ────────────────────────────────────────────────────────
def save_order(user_id: int, payload: dict) -> int:
    """Сохраняет заказ, возвращает номер заказа (#100001, #100002, ...)."""
    cur = _conn.execute(
        "INSERT INTO orders (user_id, created_at, payload) VALUES (?, ?, ?)",
        (user_id, datetime.now(timezone.utc).isoformat(), json.dumps(payload, ensure_ascii=False)),
    )
    _conn.commit()
    return 100000 + cur.lastrowid
