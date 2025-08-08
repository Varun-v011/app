import React from 'react';

function NewsPanel() {
  // Simple SVG icons
  const NewsIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="13" y2="16" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 12.91V12a2 2 0 1 1 0-4v.09A1.65 1.65 0 0 0 3.91 9c.2-.53.5-1.03.91-1.41a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33c.53-.2 1.03-.5 1.41-.91V3a2 2 0 1 1 4 0v.09c.38.41.87.71 1.41.91a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.09 9c.41.38.71.87.91 1.41V12c0 .34-.04.67-.09.99z" />
    </svg>
  );

  const ProfileIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 64,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <button style={iconButtonStyle}>
        <NewsIcon />
      </button>
      <button style={iconButtonStyle}>
        <SettingsIcon />
      </button>
      <button style={iconButtonStyle}>
        <ProfileIcon />
      </button>
    </div>
  );
}

// Simple reusable icon button style - defined outside the component function
const iconButtonStyle = {
  background: 'none',
  border: 'none',
  borderRadius: '50%',
  padding: 10,
  cursor: 'pointer',
  transition: 'background 0.2s',
  outline: 'none',
};

export default NewsPanel;
