from fastapi import APIRouter, Query
from services.osrm_service import get_route

router = APIRouter()

@router.get("/route")
def route(
    start_lon: float = Query(...),
    start_lat: float = Query(...),
    end_lon: float = Query(...),
    end_lat: float = Query(...)
):
    r = get_route(start_lon, start_lat, end_lon, end_lat)

    return {
        "distance_km": round(r["distance"] / 1000, 2),
        "eta_min": round(r["duration"] / 60, 2),
        "geometry": r["geometry"]
    }

