"""
Simple in-memory route cache.

Used to avoid repeated OSRM calls for the same coordinates.
Cache is temporary and resets on server restart.
"""

_ROUTE_CACHE = {}


def make_key(start_lon, start_lat, end_lon, end_lat):
    return f"{start_lon},{start_lat}->{end_lon},{end_lat}"


def get_cached_route(start_lon, start_lat, end_lon, end_lat):
    key = make_key(start_lon, start_lat, end_lon, end_lat)
    return _ROUTE_CACHE.get(key)


def set_cached_route(start_lon, start_lat, end_lon, end_lat, route_data):
    key = make_key(start_lon, start_lat, end_lon, end_lat)
    _ROUTE_CACHE[key] = route_data
