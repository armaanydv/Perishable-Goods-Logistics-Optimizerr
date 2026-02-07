from pydantic import BaseModel


class NGO(BaseModel):
    id: str
    name: str

