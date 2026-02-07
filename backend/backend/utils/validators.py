"""
Generic validation helpers.
"""

def is_non_empty_string(value: str) -> bool:
    return isinstance(value, str) and len(value.strip()) > 0


def is_positive_number(value) -> bool:
    try:
        return float(value) > 0
    except Exception:
        return False
