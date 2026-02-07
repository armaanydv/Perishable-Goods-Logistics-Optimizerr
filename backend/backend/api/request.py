from fastapi import APIRouter
from pydantic import BaseModel

from services.osrm_service import get_route
from db.csv_db import save_rescue_request

router = APIRouter()


class RescueRequest(BaseModel):
    donor_id: str         
    type: str
    priority: str
    start_lon: float
    start_lat: float
    end_lon: float
    end_lat: float



@router.post("/request")
def create_request(payload: RescueRequest):
    # Get route from OSRM
    route = get_route(
        payload.start_lon,
        payload.start_lat,
        payload.end_lon,
        payload.end_lat
    )

    # Prepare record to store
    record = {
        "type": payload.type,
        "priority": payload.priority,
        "start_lon": payload.start_lon,
        "start_lat": payload.start_lat,
        "end_lon": payload.end_lon,
        "end_lat": payload.end_lat,
        "distance_km": round(route["distance"] / 1000, 2),
        "eta_min": round(route["duration"] / 60, 2)
    }

    # Store in CSV DB
    save_rescue_request(record)

    # Return response
    return {
        "message": "request stored",
        "data": record
    }






