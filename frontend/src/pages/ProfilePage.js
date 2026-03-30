import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  if (!user) {
    navigate("/signin");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>
        <span className="profile-member-badge">🥉 Bronze Member</span>

        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">📧 Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📱 Phone</span>
            <span className="detail-value">{user.phone || "Not set"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📅 Joined</span>
            <span className="detail-value">{user.joined}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">⭐ Loyalty Points</span>
            <span className="detail-value points">360 pts</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-action" onClick={() => navigate("/history")}>📦 Order History</button>
          <button className="btn-action" onClick={() => navigate("/offers")}>🎟️ My Offers</button>
          <button className="btn-action" onClick={() => navigate("/cart")}>🛒 My Cart</button>
        </div>

        {!logoutConfirm ? (
          <button className="btn-logout" onClick={() => setLogoutConfirm(true)}>
            Sign Out
          </button>
        ) : (
          <div className="logout-confirm">
            <p>Are you sure you want to sign out?</p>
            <div className="confirm-btns">
              <button className="btn-confirm-yes" onClick={handleLogout}>Yes, Sign Out</button>
              <button className="btn-confirm-no" onClick={() => setLogoutConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
