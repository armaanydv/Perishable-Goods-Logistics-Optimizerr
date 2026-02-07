from fastapi import APIRouter, Query
from services.osrm_service import get_route

router = APIRouter()

@router.get("/route")
def route_api(
    start_lon: float = Query(...),
    start_lat: float = Query(...),
    end_lon: float = Query(...),
    end_lat: float = Query(...)
):
    r = get_route(start_lon, start_lat, end_lon, end_lat)
    return {
        "distance_km": round(r["distance"] / 1000, 2),
        "eta_min": round(r["duration"] / 60, 2)
    }
from fastapi import APIRouter, Query
import requests

router = APIRouter()

OSRM_BASE = "https://router.project-osrm.org"

# 🔴 GLOBAL STATE (demo ke liye)
TRAFFIC_JAM = False


def fetch_route(start_lon, start_lat, end_lon, end_lat):
    url = (
        f"{OSRM_BASE}/route/v1/driving/"
        f"{start_lon},{start_lat};{end_lon},{end_lat}"
        f"?overview=full&geometries=geojson"
    )

    data = requests.get(url, timeout=15).json()
    route = data["routes"][0]

    distance = route["distance"]
    duration = route["duration"]

    # 🚨 TRAFFIC JAM LOGIC
    if TRAFFIC_JAM:
        duration *= 1.7  # 70% delay

    return {
        "distance_km": round(distance / 1000, 2),
        "eta_min": round(duration / 60, 2),
        "geometry": route["geometry"],
        "traffic_jam": TRAFFIC_JAM
    }


@router.get("/route")
def get_route(
    start_lon: float = Query(...),
    start_lat: float = Query(...),
    end_lon: float = Query(...),
    end_lat: float = Query(...)
):
    return fetch_route(start_lon, start_lat, end_lon, end_lat)


# 🚨 DEMO TRIGGER – Traffic Jam ON/OFF
@router.post("/traffic-jam/{status}")
def toggle_traffic(status: bool):
    global TRAFFIC_JAM
    TRAFFIC_JAM = status
    return {"traffic_jam": TRAFFIC_JAM}
