import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import type { Content } from "../types";

export default function SharedBrain() {
  const { hash } = useParams();
  const [username, setUsername] = useState("");
  const [items, setItems] = useState<Content[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api(`/brain/${hash}`)
      .then((data) => {
        setUsername(data.username);
        setItems(data.content);
      })
      .catch((err) => setError(err.message));
  }, [hash]);

  if (error) return <p className="error center">{error}</p>;

  return (
    <div className="dashboard">
      <header>
        <h1>{username}'s brain</h1>
      </header>
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
          </div>
        ))}
      </div>
    </div>
  );
}