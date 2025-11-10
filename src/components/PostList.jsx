// src/components/PostsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/posts"; // FastAPI 的 GET API

function PostsList() {
  const [posts, setPosts] = useState([]);       // 用來儲存從後端拿到的文章
  const [loading, setLoading] = useState(true); // 載入中狀態
  const [error, setError] = useState(null);     // 錯誤處理

  useEffect(() => {
    // 當元件載入時自動抓資料
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL);
        setPosts(response.data);
      } catch (err) {
        setError("無法載入文章，請稍後再試。");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>載入中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>文章列表</h2>
      {posts.length === 0 ? (
        <p>目前沒有文章</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                background: "#f8f8f8",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>{post.title}</h3>
              <p>
                <b>作者：</b> {post.author}
              </p>
              <p>{post.content}</p>
              <small>Slug: {post.slug}</small>
              <br />
              <small>建立時間：{new Date(post.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsList;