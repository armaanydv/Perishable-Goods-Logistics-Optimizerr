from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {
        "status": "OK",
        "system": "Live Crisis Adaptation enabled"
    }
