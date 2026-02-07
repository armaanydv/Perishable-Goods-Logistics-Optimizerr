from fastapi import APIRouter

router = APIRouter()

@router.get("/donors")
def donors():
    return [
        {"id": "D1", "resource": "Food Packets", "qty": 100},
        {"id": "D2", "resource": "Medicine Kits", "qty": 50}
    ]

