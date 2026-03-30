import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a2e", color: "rgba(255,255,255,0.75)" }}>
      <div className="container py-5">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold text-white mb-2">HotSpot Hustlers</h5>
            <p className="small mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
              Order Pizza, Breads & Cold Drinks online. Fast delivery, fresh food, and great deals every day!
            </p>
            <div className="d-flex gap-2">
              <span className="badge rounded-pill px-3 py-2" style={{ background: "rgba(255,255,255,0.1)" }}>⚡ Fast Delivery</span>
              <span className="badge rounded-pill px-3 py-2" style={{ background: "rgba(255,255,255,0.1)" }}>🔒 Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "Cart", path: "/cart" },
                { label: "My Orders", path: "/history" },
                { label: "Offers", path: "/offers" },
                { label: "Profile", path: "/profile" },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-decoration-none small" style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={e => e.target.style.color = "#ff6b35"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Categories</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {["🍕 Pizzas", "🍞 Breads", "🥤 Cold Drinks", "🎟️ Offers", "🥉 Loyalty"].map((item, i) => (
                <li key={i} className="small" style={{ color: "rgba(255,255,255,0.55)" }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-4">
            <h6 className="fw-bold text-white mb-3">Contact Us</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small" style={{ color: "rgba(255,255,255,0.55)" }}>
              <li>📍 PSNACET, Dindigul</li>
              <li>📞 +91 98765 43210</li>
              <li>📧 support@pizzahub.com</li>
              <li>🕐 Mon–Sun: 10:00 AM – 11:00 PM</li>
            </ul>
          </div>

        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} className="mt-4 mb-3" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small style={{ color: "rgba(255,255,255,0.4)" }}>© 2026 HotSpot Hustlers. All rights reserved.</small>
          <div className="d-flex gap-3">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item, i) => (
              <small key={i} className="text-decoration-none" style={{ color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>{item}</small>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
