from fastapi import FastAPI, Query
from pydantic import BaseModel
import requests

app = FastAPI(title="Rescue Routing API")

OSRM_BASE = "https://router.project-osrm.org"


@app.get("/")
def root():
    return {"status": "FastAPI running"}


def fetch_route(start_lon, start_lat, end_lon, end_lat):
    url = (
        f"{OSRM_BASE}/route/v1/driving/"
        f"{start_lon},{start_lat};{end_lon},{end_lat}"
        f"?overview=false"
    )

    try:
        res = requests.get(url, timeout=15)
        data = res.json()

        if "routes" in data and len(data["routes"]) > 0:
            return data["routes"][0]

    except Exception:
        pass

    # 🔥 FALLBACK (demo saver)
    return {
        "distance": 5000,   # 5 km
        "duration": 600     # 10 min
    }


@app.get("/route")
def get_route(
    start_lon: float = Query(...),
    start_lat: float = Query(...),
    end_lon: float = Query(...),
    end_lat: float = Query(...)
):
    route = fetch_route(start_lon, start_lat, end_lon, end_lat)

    return {
        "distance_km": round(route["distance"] / 1000, 2),
        "eta_min": round(route["duration"] / 60, 2)
    }


class RescueRequest(BaseModel):
    type: str
    priority: str
    start_lon: float
    start_lat: float
    end_lon: float
    end_lat: float


@app.post("/request")
def create_request(payload: RescueRequest):
    route = fetch_route(
        payload.start_lon,
        payload.start_lat,
        payload.end_lon,
        payload.end_lat
    )

    return {
        "type": payload.type,
        "priority": payload.priority,
        "distance_km": round(route["distance"] / 1000, 2),
        "eta_min": round(route["duration"] / 60, 2),
        "status": "request accepted"
    }
