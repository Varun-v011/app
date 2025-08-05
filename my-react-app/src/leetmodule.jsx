import React, { useState, useEffect } from "react";
import './App.css'
function LeetInput() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("Light");
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // On mount: check localStorage for saved username/theme
    const savedUsername = localStorage.getItem("leetcodeUsername");
    const savedTheme = localStorage.getItem("leetcodeTheme") || "Light";
    if (savedUsername) {
      setUsername(savedUsername);
      setTheme(savedTheme);
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  }, []);

  useEffect(() => {
    if (username) {
      const url = `https://leetcode-stats.vercel.app/api?username=${username}&theme=${theme}`;
      setImgUrl(url);
    }
  }, [username, theme]);

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim() === "") {
      setError("Username cannot be empty");
      return;
    }
    localStorage.setItem("leetcodeUsername", username);
    localStorage.setItem("leetcodeTheme", theme);
    setShowInput(false);
    setError(null);
  }

  if (!showInput) {
    return (
      <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
        <a
          href="https://github.com/JeremyTsaii/leetcode-stats"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", textAlign: "center" }}
        >
          <img
            src={imgUrl}
            alt={username + "'s LeetCode Stats"}
            style={{ maxWidth: "100%", borderRadius: 12, boxShadow: "0 0 16px #ccc" }}
          />
        </a>
      </div>
    );
  }

  // Show input panel the first time
  return (
    <div style={{ maxWidth: 400, margin: "auto", fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h2>Enter LeetCode Username</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ marginLeft: 8, padding: 6, width: "60%" }}
              placeholder="Enter LeetCode username"
              autoFocus
            />
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>
            Theme:
            <select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              style={{ marginLeft: 8, padding: 6 }}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Save
        </button>
      </form>
    </div>
  );
}

export default LeetInput;
