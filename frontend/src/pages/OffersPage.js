import React, { useState } from "react";

const coupons = [
  { code: "SAVE10", title: "10% Off on All Orders", description: "Get 10% discount on your total bill. No minimum order required.", discount: "10%", expires: "30 Apr 2026", color: "warning", icon: "🎟️" },
  { code: "PIZZA20", title: "20% Off on Pizzas", description: "Exclusive 20% discount when you order any pizza.", discount: "20%", expires: "15 Apr 2026", color: "danger", icon: "🍕" },
  { code: "WELCOME15", title: "15% Welcome Offer", description: "Special welcome discount for new customers. One-time use.", discount: "15%", expires: "31 May 2026", color: "success", icon: "🎁" },
  { code: "BREAD50", title: "Buy 2 Breads, Get 50% Off", description: "Order 2 or more bread items and get 50% off on the cheaper one.", discount: "50%", expires: "20 Apr 2026", color: "info", icon: "🍞" },
];

const seasonalOffers = [
  { title: "Summer Special 🌞", description: "Free cold drink with every pizza order above ₹500 this summer!", badge: "Limited Time", bg: "#e8f3ff", color: "#1a5fa8", badgeBg: "#1a5fa8" },
  { title: "Weekend Combo 🎉", description: "Order any pizza + bread + drink combo on weekends and save ₹100.", badge: "Weekends Only", bg: "#f3eeff", color: "#6b3fa0", badgeBg: "#6b3fa0" },
];

const loyaltyTiers = [
  { name: "Bronze", minPoints: 0, icon: "🥉", color: "#cd7f32" },
  { name: "Silver", minPoints: 500, icon: "🥈", color: "#aaa" },
  { name: "Gold", minPoints: 1000, icon: "🥇", color: "#f5c518" },
];

const userLoyaltyPoints = 360;

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const currentTier = loyaltyTiers.reduce((found, tier) => userLoyaltyPoints >= tier.minPoints ? tier : found, loyaltyTiers[0]);
  const nextTier = loyaltyTiers.find(t => t.minPoints > userLoyaltyPoints);
  const pointsToNext = nextTier ? nextTier.minPoints - userLoyaltyPoints : 0;
  const progressPercent = nextTier ? ((userLoyaltyPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-1">Offers & Rewards</h2>
      <p className="text-muted mb-4">Save more on every order</p>

      {/* Loyalty Card */}
      <div className="rounded-4 p-4 mb-5 text-white" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
        <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-3">
          <div>
            <div className="text-uppercase small fw-bold mb-1" style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}>Loyalty Points</div>
            <div className="d-flex align-items-baseline gap-2">
              <span style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>{userLoyaltyPoints}</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>pts</span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill" style={{ border: `2px solid ${currentTier.color}`, background: "rgba(255,255,255,0.08)" }}>
            <span>{currentTier.icon}</span>
            <span style={{ color: currentTier.color, fontWeight: 700 }}>{currentTier.name} Member</span>
          </div>
        </div>
        {nextTier && (
          <div className="mb-2">
            <div className="d-flex justify-content-between small mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
              <span>{pointsToNext} pts to {nextTier.icon} {nextTier.name}</span>
              <span>{userLoyaltyPoints} / {nextTier.minPoints}</span>
            </div>
            <div className="rounded-pill" style={{ background: "rgba(255,255,255,0.12)", height: "8px" }}>
              <div className="rounded-pill h-100" style={{ width: `${progressPercent}%`, background: currentTier.color, transition: "width 0.4s" }}></div>
            </div>
          </div>
        )}
        <small style={{ color: "rgba(255,255,255,0.4)" }}>Earn 1 point for every ₹10 spent. Redeem on future orders!</small>
      </div>

      {/* Seasonal Offers */}
      <h5 className="fw-bold mb-3">🔥 Seasonal Offers</h5>
      <div className="row g-3 mb-5">
        {seasonalOffers.map((offer, idx) => (
          <div className="col-12 col-md-6" key={idx}>
            <div className="rounded-4 p-4 h-100" style={{ background: offer.bg, color: offer.color }}>
              <span className="badge rounded-pill mb-3 text-white" style={{ background: offer.badgeBg }}>{offer.badge}</span>
              <h5 className="fw-bold">{offer.title}</h5>
              <p className="mb-0 small" style={{ opacity: 0.85 }}>{offer.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Coupons */}
      <h5 className="fw-bold mb-3">🎟️ Coupons</h5>
      <div className="d-flex flex-column gap-3">
        {coupons.map(coupon => (
          <div key={coupon.code} className={`card border-2 border-${coupon.color} rounded-4 overflow-hidden`} style={{ borderStyle: "dashed !important" }}>
            <div className="row g-0">
              <div className={`col-3 col-md-2 d-flex flex-column align-items-center justify-content-center py-3 bg-${coupon.color} bg-opacity-10`}>
                <div style={{ fontSize: "1.8rem" }}>{coupon.icon}</div>
                <div className={`fw-black text-${coupon.color}`} style={{ fontSize: "1.6rem", lineHeight: 1 }}>{coupon.discount}</div>
                <div className="text-muted small fw-bold">OFF</div>
              </div>
              <div className="col-9 col-md-10 p-3">
                <h6 className="fw-bold mb-1">{coupon.title}</h6>
                <p className="text-muted small mb-2">{coupon.description}</p>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <code className="bg-light px-2 py-1 rounded fw-bold">{coupon.code}</code>
                    <button
                      className={`btn btn-sm rounded-3 ${copiedCode === coupon.code ? "btn-success" : "btn-outline-secondary"}`}
                      onClick={() => handleCopy(coupon.code)}
                    >
                      {copiedCode === coupon.code ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                  <small className="text-muted">Expires: {coupon.expires}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
