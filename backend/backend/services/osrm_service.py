import requests

OSRM_BASE = "https://router.project-osrm.org"

def get_route(start_lon, start_lat, end_lon, end_lat):
    url = (
        f"{OSRM_BASE}/route/v1/driving/"
        f"{start_lon},{start_lat};{end_lon},{end_lat}"
        f"?overview=full&geometries=geojson"
    )

    try:
        data = requests.get(url, timeout=15).json()
        route = data["routes"][0]
        return {
            "distance": route["distance"],
            "duration": route["duration"],
            "geometry": route["geometry"]
        }
    except Exception:
        return {
            "distance": 5000,
            "duration": 600,
            "geometry": None
        }
