import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/posts"; // FastAPI 的 POST API

function NewPostForm({ onPostAdded }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [slug, setSlug] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("處理中...");

        try {
            const response = await axios.post(API_URL, {
                title,
                content,
                author,
                slug,
            });

            setMessage("文章新增成功！");
            onPostAdded(response.data); // 通知父元件更新列表
            setTitle("");
            setContent("");
            setAuthor("");
            setSlug("");
        } catch (err) {
            console.error(err);
            setMessage("新增失敗，請檢查欄位或 slug 是否重複。");
        }
    };

    return (
        <div style={{ background: "#f8f8f8", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
            <h2>新增文章</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>標題：</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <div>
                    <label>內容：</label><br />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="4"
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <div>
                    <label>作者：</label><br />
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <div>
                    <label>Slug（網址代稱）：</label><br />
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                        placeholder="例如：introduction-to-python"
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        marginTop: "1rem",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    送出文章
                </button>
            </form>

            {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
        </div>
    );
}

export default NewPostForm;