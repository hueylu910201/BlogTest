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
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);

    try {
      await axios.post(API_URL, form);
      setSuccess(true);
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
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex justify-center items-center p-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary mb-2">
            新增文章
          </h2>
          <p className="text-gray-500 mb-4 card-title">
            請輸入文章內容，Slug 將會自動根據標題生成。
          </p>

          {/* 成功訊息 alert */}
          {success && (
            <div className="alert alert-success shadow-sm mb-4 animate-fadeIn">
              <span>{message}</span>
            </div>
          )}

          {/* 錯誤訊息 alert */}
          {!success && message && (
            <div className="alert alert-error shadow-sm mb-4 animate-fadeIn">
              <span>{message}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="form-control gap-4 animate-fadeIn"
          >
            <label className="form-control w-full gap-2">
              <span className="label-text font-semibold card-title">標題</span>
              <input
                type="text"
                name="title"
                placeholder="請輸入文章標題"
                className="input input-bordered w-full"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>


            <label className="form-control w-full">
              <span className="label-text font-semibold card-title">文章內容</span>
              <textarea
                name="content"
                placeholder="請輸入文章內容"
                className="textarea textarea-bordered w-full h-48"
                value={form.content}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold card-title">作者</span>
              <input
                type="text"
                name="author"
                placeholder="輸入作者名稱"
                className="input input-bordered w-full"
                value={form.author}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold card-title">網址代稱（Slug）</span>
              <span className="label-text-alt text-gray-400 card-title">自動生成</span>
              <input
                type="text"
                name="slug"
                className="input input-bordered w-full"
                value={form.slug}
                readOnly
              />
            </label>

            <button
              type="submit"
              className={`btn btn-primary text-black mt-4 w-full ${loading ? "loading" : ""
                }`}
            >
              {loading ? "送出中..." : "送出文章"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;