from pydantic import BaseModel


class Donor(BaseModel):
    id: str
    resource: str
    qty: int
