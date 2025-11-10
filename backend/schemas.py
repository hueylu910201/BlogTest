from datetime import datetime
from pydantic import BaseModel, Field

class PostBase(BaseModel):
    slug: str = Field(..., max_length=255)
    title: str
    author: str
    content: str

class PostCreate(PostBase):
    title: str = Field(..., example="Python 入門指南")
    content: str = Field(..., example="這篇文章介紹 Python 的基本語法...")
    author: str = Field(..., example="Alice")
    slug: str = Field(..., example="introduction-to-python")



class PostRead(PostBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # SQLAlchemy -> Pydantic
        orm_mode = True # Pydantic -> JSON，告訴 Pydantic：「這不是 dict，而是一個 ORM 物件（SQLAlchemy model）