#定義實際操作資料庫的函式（新增、查詢、刪除等）

from sqlalchemy.orm import Session
from sqlalchemy import select
from models import Post
from schemas import PostCreate

def get_posts(db: Session) -> list[Post]:
    """讀取所有文章"""
    return list(db.scalars(select(Post).order_by(Post.created_at.desc())))

def get_post_by_slug(db: Session, slug: str) -> Post | None:
    """依照 slug 讀取單篇文章"""
    return db.scalar(select(Post).where(Post.slug == slug))

def create_post(db: Session, data: PostCreate) -> Post:
    """新增一篇文章"""
    post = Post(
        slug=data.slug,
        title=data.title,
        author=data.author,
        content=data.content,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post