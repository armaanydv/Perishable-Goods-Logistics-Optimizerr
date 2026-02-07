from pydantic import BaseModel


class Item(BaseModel):
    id: str
    name: str
    category: str   # food / medicine
    quantity: int
    expiry_date: str | None = None
