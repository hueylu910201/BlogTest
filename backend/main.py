from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import PostCreate, PostRead
# from posts import posts
from sqlalchemy.orm import Session

from db import get_db, engine
from models import Base
from schemas import PostCreate, PostRead
import crud

app = FastAPI()

# 允許 React 前端的連線
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 開發階段先允許所有來源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"ok": True}

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/posts", response_model=list[PostRead])
def list_posts(db: Session = Depends(get_db)):
    """取得所有文章"""
    return crud.get_posts(db)


# @app.post("/posts")
# def add_post(post: dict):
#     """新增一篇文章"""
#     # 自動給 id（用現有最大 id + 1）
#     new_id = max([p["id"] for p in posts], default=0) + 1
#     post["id"] = new_id
#     posts.append(post)
#     print("目前載入的文章：", posts)
#     return {"message": "文章已新增", "posts": posts}

@app.post("/posts", response_model=PostRead, status_code=201)
def add_post(payload: PostCreate, db: Session = Depends(get_db)):
    # slug 重複檢查
    if crud.get_post_by_slug(db, payload.slug):
        raise HTTPException(status_code=400, detail="slug已存在，請更換其他slug")
    return crud.create_post(db, payload)
