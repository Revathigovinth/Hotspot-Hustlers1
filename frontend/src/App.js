import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import './App.css';
import Footer from "./Footer";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import OffersPage from "./pages/OffersPage";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}

function TopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={{ background: "#1a1a2e", color: "rgba(255,255,255,0.9)" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center py-1 px-4">
        <small className="fw-500">🍕 Order Pizza, Breads & Cold Drinks — Fast, Fresh & Delicious!</small>
        <button
          className="btn btn-sm btn-warning fw-bold"
          style={{ fontSize: "0.78rem" }}
          onClick={() => navigate(user ? "/profile" : "/signup")}
        >
          {user ? `👤 ${user.name.split(" ")[0]}` : "Sign Up / Sign In"}
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const links = [
    { path: "/", label: "🏠 Home" },
    { path: "/cart", label: "🛒 Cart", protected: true },
    { path: "/history", label: "📦 History", protected: true },
    { path: "/offers", label: "🎟️ Offers", protected: true },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" style={{ color: "#ff6b35", fontSize: "1.3rem" }} to="/">
           HotSpot Hustlers
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <Link
                  to={link.protected && !user ? "/signin" : link.path}
                  className={`nav-link fw-semibold px-3 ${location.pathname === link.path ? "active" : ""}`}
                  style={location.pathname === link.path ? { color: "#ff6b35", background: "#fff4f0", borderRadius: "8px" } : {}}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className={`nav-link fw-semibold px-3 ${location.pathname === "/profile" ? "active" : ""}`}
                  style={location.pathname === "/profile" ? { color: "#ff6b35", background: "#fff4f0", borderRadius: "8px" } : {}}
                >
                  👤 Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function AppLayout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 104px)", background: "#f8f8f8" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/offers" element={<ProtectedRoute><OffersPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </main>
       <Footer /> 
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}
