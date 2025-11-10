import React, { useState, useEffect } from "react";
import PostsList from "./components/PostList";
import NewPostForm from "./components/NewPostForm";
import axios from "axios";
import './App.css'

function App() {
  // const [posts, setPosts] = useState([]);
  // const [title, setTitle] = useState("");

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/posts").then((res) => {
  //     setPosts(res.data);
  //   });
  // }, []);
  const [refreshKey, setRefreshKey] = useState(0); // 控制重新載入文章
  return (
    <div style={{ padding: "2rem" }}>
      <h1>我的部落格</h1>

      {/* 新增文章表單 */}
      <NewPostForm
        onPostAdded={() => setRefreshKey((oldKey) => oldKey + 1)}
      />

      {/* 文章列表（每次新增完自動更新） */}
      <PostsList key={refreshKey} />
    </div>
  )
}

export default App
