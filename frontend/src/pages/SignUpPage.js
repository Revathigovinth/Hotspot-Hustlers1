import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function SignUpPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError("Please fill all fields."); return;
    }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(() => {
      const result = signup(name.trim(), email.trim(), password);
      if (result.success) navigate("/");
      else setError(result.error);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: "#f8f8f8" }}>
      <div className="card shadow border-0 rounded-4 p-4" style={{ width: "100%", maxWidth: "440px" }}>
        <div className="text-center mb-3">
          <div style={{ fontSize: "3rem" }}>🍕</div>
          <h2 className="fw-bold mt-2">Create Account</h2>
          <p className="text-muted">Join PizzaHub and start ordering!</p>
        </div>

        {error && <div className="alert alert-danger py-2 small">⚠️ {error}</div>}

        <div className="mb-3">
          <label className="form-label fw-semibold small text-uppercase text-muted">Full Name</label>
          <input type="text" className="form-control rounded-3" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold small text-uppercase text-muted">Email Address</label>
          <input type="email" className="form-control rounded-3" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>



        <div className="mb-3">
          <label className="form-label fw-semibold small text-uppercase text-muted">Password</label>
          <div className="input-group">
            <input
              type={showPass ? "text" : "password"}
              className="form-control rounded-start-3"
              placeholder="Min. 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
                    </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold small text-uppercase text-muted">Confirm Password</label>
          <input type="password" className="form-control rounded-3" placeholder="Re-enter password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>

        <button
          className="btn w-100 fw-bold rounded-3 py-2 mt-1"
          style={{ background: "#ff6b35", color: "white" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <><span className="spinner-border spinner-border-sm me-2" />Creating account...</> : "Create Account →"}
        </button>

        <p className="text-center mt-3 small text-muted">
          Already have an account? <Link to="/signin" style={{ color: "#ff6b35", fontWeight: "700" }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
