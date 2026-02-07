from datetime import datetime, timedelta


def calculate_priority(expiry_time: str) -> str:
    """
    Less remaining time => higher priority
    """

    expiry = datetime.fromisoformat(expiry_time)
    now = datetime.now()

    time_left = expiry - now

    if time_left.total_seconds() <= 0:
        return "critical"

    if time_left <= timedelta(hours=6):
        return "high"

    if time_left <= timedelta(hours=24):
        return "medium"

    return "low"

