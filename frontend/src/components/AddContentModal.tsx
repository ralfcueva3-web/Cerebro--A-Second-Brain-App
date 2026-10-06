import { useState, type FormEvent } from "react";
import { api } from "../api";

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

export default function AddContentModal({ onClose, onAdded }: Props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("link");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api("/content", {
        method: "POST",
        auth: true,
        body: {
          title,
          link,
          type,
          // "react, notes" becomes ["react", "notes"]
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        },
      });
      onAdded();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="card modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>Add content</h2>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="link">Link</option>
          <option value="youtube">YouTube</option>
          <option value="twitter">Twitter</option>
          <option value="document">Document</option>
        </select>
        <input
          placeholder="Tags, comma separated"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="submit">Save</button>
          <button type="button" className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}