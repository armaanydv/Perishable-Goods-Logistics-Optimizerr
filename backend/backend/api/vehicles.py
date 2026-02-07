from fastapi import APIRouter

router = APIRouter()

vehicles = [
    {"id": "V1", "type": "ambulance", "status": "available"},
    {"id": "V2", "type": "van", "status": "available"}
]


@router.get("/vehicles")
def list_vehicles():
    return vehicles


# 🚨 VEHICLE BREAKDOWN TRIGGER
@router.post("/vehicle-breakdown/{vehicle_id}")
def breakdown(vehicle_id: str):
    for v in vehicles:
        if v["id"] == vehicle_id:
            v["status"] = "broken"
            return {"message": f"Vehicle {vehicle_id} broken"}

    return {"error": "Vehicle not found"}


@router.get("/active-vehicle")
def active_vehicle():
    for v in vehicles:
        if v["status"] == "available":
            return v

    return {"error": "No vehicle available"}
