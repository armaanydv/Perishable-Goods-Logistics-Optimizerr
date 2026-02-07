"""
Priority calculation logic.
"""

def calculate_priority(request_type: str) -> str:
    request_type = request_type.lower()

    if request_type == "medicine":
        return "high"

    if request_type == "food":
        return "medium"

    return "low"

