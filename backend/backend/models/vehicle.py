from pydantic import BaseModel


class Vehicle(BaseModel):
    id: str
    type: str
    status: str

