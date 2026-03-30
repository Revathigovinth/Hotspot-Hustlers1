import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in

  // Fake user DB
  const [registeredUsers, setRegisteredUsers] = useState([
    { email: "demo@pizza.com", password: "demo123", name: "Demo User", phone: "9876543210", joined: "Jan 2026" }
  ]);

  const login = (email, password) => {
    const found = registeredUsers.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  };

  const signup = (name, email, password, phone) => {
    const exists = registeredUsers.find(u => u.email === email);
    if (exists) return { success: false, error: "Email already registered." };
    const newUser = { name, email, password, phone, joined: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }) };
    setRegisteredUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
