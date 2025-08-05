import React, { useState, useEffect } from "react";
import "./App.css";

function LogoBox() {
  const [input, setInput] = useState("");
  const [logoUrls, setLogoUrls] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Load saved logos from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("logos")) || [];
    setLogoUrls(saved);
  }, []);

  // Save logos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("logos", JSON.stringify(logoUrls));
  }, [logoUrls]);

  function getDomain(url) {
    try {
      const { hostname } = new URL(url);
      return hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  const handleAddClick = () => setShowPopup(true);

  const handleConfirm = () => {
    const domain = getDomain(input);
    if (domain) {
      const newLogoUrl = `https://img.logo.dev/${domain}?token=pk_VjPN4aS9Tgu3ZoTfisglYg`;
      // Prevent duplicates
      if (!logoUrls.includes(newLogoUrl)) {
        setLogoUrls([...logoUrls, newLogoUrl]);
      }
      setShowPopup(false);
      setInput("");
    } else {
      alert("Please enter a valid URL.");
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setInput("");
  };

  return (
    <>
      {/* Main horizontal container */}
      <div className="logoBoxContainer">
        {logoUrls.map((url, i) => (
          <button>
            <img key={i} src={url} alt="Website logo" className="logoImage" />
            </button>
        ))}
        <button className="plusButton" onClick={handleAddClick}>+</button>
      </div>

      {/* Popup modal */}
      {showPopup && (
        <div className="popupOverlay" onClick={handleClose}>
          <div className="popupContent" onClick={e => e.stopPropagation()}>
            <h3>Enter website link</h3>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="https://example.com"
            />
            <div className="popupButtons">
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={handleClose} className="cancelButton">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoBox;
