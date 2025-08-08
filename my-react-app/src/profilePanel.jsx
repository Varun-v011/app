import "./App.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import NewsPanel from "./notificatification";

function ProfilePanel() {
  const [name, setName] = useState("");
  const [leetusername, setLeetusername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    const savedLeet = localStorage.getItem("leetUsername");
    const savedPic = localStorage.getItem("profilePic");

    if (savedName && savedLeet) {
      setName(savedName);
      setLeetusername(savedLeet);
      setShowInput(false);
      if (savedPic) {
        setProfilePic(savedPic);
      }
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !leetusername.trim()) {
      setError("Both username and LeetCode username are required.");
      return;
    }
    localStorage.setItem("profileName", name);
    localStorage.setItem("leetUsername", leetusername);
    if (profilePic) {
      localStorage.setItem("profilePic", profilePic);
    }
    setShowInput(false);
    setError(null);
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
      // Optionally, persist as Base64 for real persistence beyond this session
    }
  }

  const imgUrl = leetusername
    ? `https://leetcard.jacoblin.cool/${leetusername}`
    : "";

  if (!showInput) {
    return (
        <div className="profilePanel">
            <NewsPanel />
        <div className="profile_pic" style={{ position: "fixed", top: '10%', padding: 20, width: 250, height: 180, display: 'flex'}}>
          <img
            src={profilePic}
            alt="Profile Preview"
            style={{
              position: 'absolute',
              left: '25%',
              width: 150,
              height: 150,
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 0 16px #b794f4",
              border: "2px solid #b794f4",
              background: "#ede7f6"
            }}
          />
          <h2 style={{position: 'relative', top: '100%', left: '40%'}}> {name} </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <button
            onClick={triggerFileSelect}
            style={{
              position: "absolute",
              left: '70%',
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              padding: 8,
              boxShadow: "0px 2px 6px #b794f4",
              cursor: "pointer"
            }}
            aria-label="Edit Profile Picture"
          >
            {/* Pencil SVG */}
            <svg width="20" height="20" fill="#a684e7" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zm14.71-10.04a1.003 1.003 0 0 1 0 1.42l-1.34 1.34-3.75-3.75 1.34-1.34a1.003 1.003 0 0 1 1.42 0l2.33 2.33c.39.39.39 1.02 0 1.42z"/>
            </svg>
          </button>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            alignSelf: "center",
            paddingTop: 20,
            paddingBottom: "20%",
            fontFamily: "Arial, sans-serif",

          }}
        >

         
            {leetusername && (
              <img
                src={imgUrl}
                alt={leetusername + "'s LeetCode Stats"}
                style={{
                  maxWidth: "100%",
                  borderRadius: 12,
                  boxShadow: "0 0 16px #ccc",
                }}
              />
            )}
        </div>   
      </div>
    );
  }

  return (
    <div className="popOverlay">
    <div className="signup-form">
      <div
        style={{
          maxWidth: 400,
          margin: "auto",
          fontFamily: "Arial, sans-serif",
          padding: 20,
        }}
      >
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>
              Username:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginLeft: 8, padding: 6, width: "60%" }}
                placeholder="username"
                autoFocus
              />
            </label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>
              LeetCode Username:
              <input
                type="text"
                value={leetusername}
                onChange={(e) => setLeetusername(e.target.value)}
                style={{ marginLeft: 8, padding: 6, width: "60%" }}
                placeholder="Enter LeetCode username"
              />
            </label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>
              Profile Photo:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
            Save
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ProfilePanel;
