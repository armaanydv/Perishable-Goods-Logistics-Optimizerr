from pydantic import BaseModel


class RescueRequest(BaseModel):
    type: str
    priority: str
    start_lon: float
    start_lat: float
    end_lon: float
    end_lat: float

