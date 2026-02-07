"""
Expiry checking logic for items.
"""

from datetime import datetime


def is_expired(expiry_date: str) -> bool:
    """
    expiry_date format: YYYY-MM-DD
    """

    try:
        expiry = datetime.strptime(expiry_date, "%Y-%m-%d").date()
        return expiry < datetime.today().date()
    except Exception:
        return False
