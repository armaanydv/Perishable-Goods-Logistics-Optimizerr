from fastapi import APIRouter

router = APIRouter()

vehicles = [
    {"id": "V1", "type": "ambulance", "status": "available"},
    {"id": "V2", "type": "van", "status": "available"}
]

@router.get("/vehicles")
def list_vehicles():
    return vehicles
