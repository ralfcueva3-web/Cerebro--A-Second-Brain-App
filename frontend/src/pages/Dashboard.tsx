import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";
import type { Content } from "../types.js";
import AddContentModal from "../components/AddContentModal";
import ShareModal from "../components/ShareModal";

export default function Dashboard() {
  const [items, setItems] = useState<Content[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  async function load() {
    try {
      const data = await api("/content", { auth: true });
      setItems(data.content);
    } catch {
      logout(); // token missing, expired, or invalid
    }
  }

  // runs once when the page first appears
  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    await api("/content", { method: "DELETE", auth: true, body: { contentId: id } });
    setItems((prev) => prev.filter((item) => item._id !== id));
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Cerebro</h1>
        <div className="actions">
          <button onClick={() => setShowShare(true)}>Share brain</button>
          <button onClick={() => setShowAdd(true)}>Add content</button>
          <button className="secondary" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      {items.length === 0 && <p className="empty">Nothing saved yet. Add your first link.</p>}

      <div className="grid">
        {items.map((item) => (
          <div className="card" key={item._id}>
            <span className="badge">{item.type}</span>
            <h3>{item.title}</h3>
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.link}
            </a>
            <div className="tags">
              {item.tags.map((tag) => (
                <span key={tag._id}>#{tag.title}</span>
              ))}
            </div>
            <button className="danger" onClick={() => remove(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {showAdd && <AddContentModal onClose={() => setShowAdd(false)} onAdded={load} />}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
    </div>
  );
}