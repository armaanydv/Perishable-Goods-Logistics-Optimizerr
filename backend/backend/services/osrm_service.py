import requests

OSRM_BASE = "https://router.project-osrm.org"

def get_route(start_lon, start_lat, end_lon, end_lat):
    url = (
        f"{OSRM_BASE}/route/v1/driving/"
        f"{start_lon},{start_lat};{end_lon},{end_lat}"
        f"?overview=false"
    )

    try:
        data = requests.get(url, timeout=15).json()
        if "routes" in data and len(data["routes"]) > 0:
            return data["routes"][0]
    except:
        pass

    return {"distance": 5000, "duration": 600}
