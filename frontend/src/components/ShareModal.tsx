import { useState } from "react";
import { api } from "../api";

export default function ShareModal({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function enable() {
    setError("");
    try {
      const data = await api("/brain/share", { method: "POST", auth: true, body: { share: true } });
      setUrl(`${window.location.origin}/brain/${data.hash}`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function disable() {
    setError("");
    try {
      await api("/brain/share", { method: "POST", auth: true, body: { share: false } });
      setUrl("");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="card modal" onClick={(e) => e.stopPropagation()}>
        <h2>Share your brain</h2>
        {url ? (
          <>
            <p>Anyone with this link can view your saved content:</p>
            <input readOnly value={url} onFocus={(e) => e.target.select()} />
            <button onClick={() => navigator.clipboard.writeText(url)}>Copy link</button>
            <button className="danger" onClick={disable}>
              Stop sharing
            </button>
          </>
        ) : (
          <button onClick={enable}>Create share link</button>
        )}
        {error && <p className="error">{error}</p>}
        <button className="secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}