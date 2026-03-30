import React, { useState } from "react";

const initialCartItems = [
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, qty: 1, image: "🍕" },
  { id: 2, name: "Garlic Bread", category: "Bread", price: 99, qty: 2, image: "🍞" },
  { id: 3, name: "Coca Cola", category: "Cold Drink", price: 49, qty: 1, image: "🥤" },
];

const COUPONS = { SAVE10: 10, PIZZA20: 20, WELCOME15: 15 };

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0));
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = appliedCoupon ? Math.round((subtotal * COUPONS[appliedCoupon]) / 100) : 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) { setAppliedCoupon(code); setCouponError(""); }
    else { setCouponError("Invalid coupon code."); setAppliedCoupon(null); }
  };

  if (orderPlaced) {
    return (
      <div className="container py-5 text-center">
        <div className="card border-0 shadow-sm rounded-4 p-5 mx-auto" style={{ maxWidth: "480px" }}>
          <div style={{ fontSize: "4rem" }}>✅</div>
          <h2 className="fw-bold mt-3">Order Placed Successfully!</h2>
          <p className="text-muted">Thank you! You'll receive a confirmation shortly.</p>
          <button
            className="btn fw-bold rounded-3 mt-2"
            style={{ background: "#ff6b35", color: "white" }}
            onClick={() => { setOrderPlaced(false); setCartItems(initialCartItems); setAppliedCoupon(null); setCoupon(""); }}
          >
            Order Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <h2 className="fw-bold mb-0">Your Cart</h2>
        <span className="badge rounded-pill bg-secondary">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: "4rem" }}>🛒</div>
          <p className="text-muted mt-2">Your cart is empty</p>
          <button className="btn fw-bold rounded-3" style={{ background: "#ff6b35", color: "white" }} onClick={() => window.history.back()}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-12 col-lg-7">
            <div className="d-flex flex-column gap-3">
              {cartItems.map(item => (
                <div key={item.id} className="card border-0 shadow-sm rounded-4 p-3">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ fontSize: "2.2rem" }}>{item.image}</div>
                    <div className="flex-grow-1">
                      <div className="fw-bold">{item.name}</div>
                      <small className="text-muted">{item.category}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-sm btn-outline-secondary rounded-circle" style={{ width: "32px", height: "32px", padding: 0 }} onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="fw-bold">{item.qty}</span>
                      <button className="btn btn-sm btn-outline-secondary rounded-circle" style={{ width: "32px", height: "32px", padding: 0 }} onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <div className="fw-bold">₹{item.price * item.qty}</div>
                    <button className="btn btn-sm btn-outline-danger rounded-3" onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>

              <div className="input-group mb-2">
                <input type="text" className="form-control rounded-start-3" placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} />
                <button className="btn btn-outline-secondary" onClick={applyCoupon}>Apply</button>
              </div>
              {couponError && <div className="text-danger small mb-2">⚠️ {couponError}</div>}
              {appliedCoupon && <div className="text-success small mb-2">🎉 "{appliedCoupon}" applied — {COUPONS[appliedCoupon]}% off!</div>}

              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span><span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount ({COUPONS[appliedCoupon]}%)</span><span>− ₹{discount}</span>
                </div>
              )}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Delivery</span><span className="text-success fw-bold">FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total</span><span>₹{total}</span>
              </div>

              <button
                className="btn w-100 fw-bold rounded-3 py-2"
                style={{ background: "#ff6b35", color: "white" }}
                onClick={() => cartItems.length > 0 && setOrderPlaced(true)}
              >
                Place Order →
              </button>
              <p className="text-muted small text-center mt-2">Try: SAVE10, PIZZA20, WELCOME15</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
