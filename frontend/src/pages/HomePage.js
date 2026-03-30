import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import '../styles/HomePage.css';

const menuHighlights = [
  { emoji: "🍕", name: "Margherita Pizza", price: "₹299", tag: "Bestseller", tagColor: "warning" },
  { emoji: "🍕", name: "Pepperoni Pizza", price: "₹349", tag: "Spicy", tagColor: "danger" },
  { emoji: "🍞", name: "Garlic Bread", price: "₹99", tag: "Crispy", tagColor: "secondary" },
  { emoji: "🍞", name: "Cheese Bread", price: "₹129", tag: "Cheesy", tagColor: "warning" },
  { emoji: "🥤", name: "Coca Cola", price: "₹49", tag: "Chilled", tagColor: "info" },
  { emoji: "🥤", name: "Lemonade", price: "₹59", tag: "Refreshing", tagColor: "success" },
];

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOrder = () => navigate(user ? "/cart" : "/signin");

  return (
    <div>
      {/* Hero Banner */}
      <div
        style={{
          minHeight: "480px",
          background: "linear-gradient(135deg, rgba(20,10,5,0.78) 0%, rgba(255,107,53,0.6) 100%), url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80') center/cover no-repeat",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container py-5">
          <span className="badge rounded-pill mb-3" style={{ background: "#ff6b35", fontSize: "0.85rem", padding: "8px 16px" }}>
            🔥 Hot & Fresh
          </span>
          <h1 className="display-4 fw-bold text-white mb-3" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
            Pizza, Breads &<br />Cold Drinks
          </h1>
          <p className="text-white-50 fs-5 mb-4" style={{ maxWidth: "460px" }}>
            Order your favourites online — delivered fast, fresh, and delicious.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <button
              className="btn btn-lg fw-bold rounded-3 px-4"
              style={{ background: "#ff6b35", color: "white", border: "none" }}
              onClick={handleOrder}
            >
              Order Now 🍕
            </button>
            <button
              className="btn btn-lg fw-bold rounded-3 px-4"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "2px solid rgba(255,255,255,0.5)", backdropFilter: "blur(6px)" }}
              onClick={() => navigate("/offers")}
            >
              View Offers 🎟️
            </button>
          </div>
          {user && (
            <p className="mt-3 text-white-50">👋 Welcome back, <strong className="text-white">{user.name}</strong>!</p>
          )}
        </div>
      </div>

      {/* Features Strip */}
      <div className="bg-white border-bottom">
        <div className="container">
          <div className="row text-center py-3">
            {["⚡ Fast Delivery", "🔒 Secure Payments", "🎟️ Loyalty Rewards", "📦 Live Order Tracking"].map((f, i) => (
              <div className="col-6 col-md-3 py-2 fw-semibold text-muted small" key={i}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Highlights */}
      <div className="container py-5">
        <h2 className="fw-bold mb-4">🍽️ Popular Items</h2>
        <div className="row g-3">
          {menuHighlights.map((item, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <div className="card border-0 rounded-4 shadow-sm h-100 p-3 d-flex flex-row align-items-center gap-3" style={{ transition: "transform 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ fontSize: "2.2rem" }}>{item.emoji}</div>
                <div className="flex-grow-1">
                  <div className="fw-bold">{item.name}</div>
                  <span className={`badge bg-${item.tagColor} bg-opacity-10 text-${item.tagColor} small`}>{item.tag}</span>
                </div>
                <div className="fw-bold me-2">{item.price}</div>
                <button
                  className="btn btn-sm fw-bold rounded-3"
                  style={{ background: "#ff6b35", color: "white", whiteSpace: "nowrap" }}
                  onClick={handleOrder}
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
