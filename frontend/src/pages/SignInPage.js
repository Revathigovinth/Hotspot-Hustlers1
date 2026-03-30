import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!email.trim() || !password.trim()) { setError("Please fill all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) navigate("/");
      else setError(result.error);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: "#f8f8f8" }}>
      <div className="card shadow border-0 rounded-4 p-4" style={{ width: "100%", maxWidth: "420px" }}>
        <div className="text-center mb-3">
          <div style={{ fontSize: "3rem" }}>🍕</div>
          <h2 className="fw-bold mt-2">Welcome Back!</h2>
          <p className="text-muted">Sign in to continue ordering</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small">⚠️ {error}</div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold small text-uppercase text-muted">Email Address</label>
          <input
            type="email"
            className="form-control rounded-3"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold small text-uppercase text-muted">Password</label>
          <div className="input-group">
            <input
              type={showPass ? "text" : "password"}
              className="form-control rounded-start-3"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn w-100 fw-bold rounded-3 py-2 mt-2"
          style={{ background: "#ff6b35", color: "white" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <><span className="spinner-border spinner-border-sm me-2" />Signing in...</>
          ) : "Sign In →"}
        </button>

        <p className="text-center mt-3 small text-muted">
          Don't have an account? <Link to="/signup" style={{ color: "#ff6b35", fontWeight: "700" }}>Sign Up</Link>
        </p>
        <p className="text-center small text-muted">Demo: demo@pizza.com / demo123</p>
      </div>
    </div>
  );
}
