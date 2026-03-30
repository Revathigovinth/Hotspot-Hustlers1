import React, { useState } from "react";

const orderHistory = [
  {
    id: "ORD-1041", date: "28 Mar 2026", time: "7:45 PM", status: "Delivered",
    items: [{ name: "Pepperoni Pizza", qty: 1, price: 349 }, { name: "Coca Cola", qty: 2, price: 49 }],
    total: 447, address: "12, Nehru St, Sathyamangalam",
  },
  {
    id: "ORD-1038", date: "25 Mar 2026", time: "1:15 PM", status: "Delivered",
    items: [{ name: "Garlic Bread", qty: 3, price: 99 }, { name: "Lemonade", qty: 1, price: 59 }],
    total: 356, address: "12, Nehru St, Sathyamangalam",
  },
  {
    id: "ORD-1021", date: "18 Mar 2026", time: "8:30 PM", status: "Cancelled",
    items: [{ name: "Cheese Burst Pizza", qty: 1, price: 399 }],
    total: 399, address: "12, Nehru St, Sathyamangalam",
  },
  {
    id: "ORD-1005", date: "10 Mar 2026", time: "6:00 PM", status: "Delivered",
    items: [{ name: "Margherita Pizza", qty: 2, price: 299 }, { name: "Sprite", qty: 2, price: 49 }, { name: "Masala Bread", qty: 1, price: 79 }],
    total: 775, address: "12, Nehru St, Sathyamangalam",
  },
];

const statusBadge = { Delivered: "success", Cancelled: "danger", Pending: "warning" };

export default function HistoryPage() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [reordered, setReordered] = useState(null);

  const toggleExpand = (id) => setExpandedOrder(expandedOrder === id ? null : id);

  const handleReorder = (orderId) => {
    setReordered(orderId);
    setTimeout(() => setReordered(null), 2000);
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <h2 className="fw-bold mb-0">Order History</h2>
        <span className="badge rounded-pill bg-secondary">{orderHistory.length} orders</span>
      </div>

      <div className="d-flex flex-column gap-3">
        {orderHistory.map(order => (
          <div key={order.id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
            {/* Card Header - Clickable */}
            <div
              className="card-body d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => toggleExpand(order.id)}
            >
              <div>
                <div className="fw-bold" style={{ color: "#ff6b35", fontSize: "0.85rem" }}>{order.id}</div>
                <div className="text-muted small">{order.date} · {order.time}</div>
                <div className="text-truncate" style={{ maxWidth: "320px", fontSize: "0.92rem" }}>
                  {order.items.map(i => i.name).join(", ")}
                </div>
              </div>
              <div className="d-flex flex-column align-items-end gap-1">
                <div className="fw-bold fs-6">₹{order.total}</div>
                <span className={`badge bg-${statusBadge[order.status]}`}>{order.status}</span>
                <small className="text-muted">{expandedOrder === order.id ? "▲" : "▼"}</small>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedOrder === order.id && (
              <div className="card-footer bg-light border-top px-4 py-3">
                <h6 className="text-uppercase text-muted fw-bold small mb-2">Items Ordered</h6>
                <table className="table table-sm table-borderless mb-3">
                  <thead className="text-muted small">
                    <tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>₹{item.price}</td>
                        <td>₹{item.qty * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h6 className="text-uppercase text-muted fw-bold small mb-1">Delivery Address</h6>
                <p className="small mb-3">📍 {order.address}</p>

                <div className="d-flex gap-2 flex-wrap">
                  {order.status !== "Cancelled" && (
                    <button
                      className={`btn btn-sm fw-bold rounded-3 ${reordered === order.id ? "btn-success" : ""}`}
                      style={reordered === order.id ? {} : { background: "#ff6b35", color: "white", border: "none" }}
                      onClick={() => handleReorder(order.id)}
                    >
                      {reordered === order.id ? "✓ Added to Cart!" : "🔁 Reorder"}
                    </button>
                  )}
                  <button className="btn btn-sm btn-outline-secondary fw-bold rounded-3">🧾 View Invoice</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
