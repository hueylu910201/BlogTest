import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostsList from "./components/PostList";
import NewPostForm from "./components/NewPostForm";
import NewPostPage from "./pages/NewPostPage";
import axios from "axios";
import './App.css'

function App() {
  // const [refreshKey, setRefreshKey] = useState(0); // 控制重新載入文章
  return (
    <div className="min-h-screen bg-base-200">
      {/* 導覽列 */}
      <nav className="navbar bg-base-100 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            我的部落格
          </Link>
          <Link to="/new" className="btn btn-primary">
            ➕新增文章
          </Link>
        </div>
      </nav>

      {/* 路由區 */}
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/new" element={<NewPostPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
