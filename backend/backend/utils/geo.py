"""
Geographical utility functions.
"""

def is_valid_coordinates(lat: float, lon: float) -> bool:
    """
    Validate latitude and longitude values.
    """
    if lat < -90 or lat > 90:
        return False

    if lon < -180 or lon > 180:
        return False

    return True
