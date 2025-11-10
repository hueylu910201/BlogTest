import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/posts";

function NewPostPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 將標題轉換成 slug
  const generateSlug = (text) => {
    return text
      .toLowerCase() // 轉小寫
      .trim() // 移除前後空白
      .replace(/[^\w\s-]/g, "") // 移除符號
      .replace(/\s+/g, "-"); // 空白換成 -
  };

  // 🔹 當表單輸入改變時觸發
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 若是修改標題時，動態產生 slug
    if (name === "title") {
      setForm({
        ...form,
        title: value,
        slug: generateSlug(value),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(API_URL, form);
      setMessage("文章新增成功！");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error(err);
      setMessage("新增失敗，請檢查欄位或 slug 是否重複。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">📝 新增文章</h2>

          <form onSubmit={handleSubmit} className="form-control space-y-4">
            <input
              type="text"
              name="title"
              placeholder="標題"
              className="input input-bordered"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="content"
              placeholder="內容"
              className="textarea textarea-bordered h-32"
              value={form.content}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="author"
              placeholder="作者"
              className="input input-bordered"
              value={form.author}
              onChange={handleChange}
              required
            />

            {/* 🔹 slug 欄位變成唯讀（自動生成） */}
            <input
              type="text"
              name="slug"
              placeholder="自動生成網址代稱"
              className="input input-bordered bg-base-200"
              value={form.slug}
              readOnly
            />

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            >
              {loading ? "送出中..." : "送出文章"}
            </button>
          </form>

          {message && (
            <p className="text-center mt-3 text-sm text-gray-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;