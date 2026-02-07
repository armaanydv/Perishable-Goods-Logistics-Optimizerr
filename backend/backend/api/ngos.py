from fastapi import APIRouter

router = APIRouter()

@router.get("/ngos")
def ngos():
    return [
        {"id": "NGO1", "name": "Food Relief Org"},
        {"id": "NGO2", "name": "Medical Aid Network"}
    ]

