"""
Time utility helpers.
"""

def seconds_to_minutes(seconds: float) -> float:
    return round(seconds / 60, 2)


def minutes_to_hours(minutes: float) -> float:
    return round(minutes / 60, 2)
