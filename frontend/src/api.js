// src/api.js
// Change this to your Spring Boot backend URL
const BASE_URL = "http://localhost:8080/api";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper function for all API calls
const apiCall = async (endpoint, method = "GET", body = null) => {
  const headers = { "Content-Type": "application/json" };
  if (getToken()) headers["Authorization"] = `Bearer ${getToken()}`;

  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

// ─── AUTH APIs ───────────────────────────────────────────
export const loginAPI = (email, password) =>
  apiCall("/auth/login", "POST", { email, password });

export const signupAPI = (name, email, password, phone) =>
  apiCall("/auth/register", "POST", { name, email, password, phone });

// ─── MENU APIs ───────────────────────────────────────────
export const getMenuItemsAPI = () =>
  apiCall("/menu");

export const getMenuByCategoryAPI = (category) =>
  apiCall(`/menu/category/${category}`);

// ─── CART APIs ───────────────────────────────────────────
export const getCartAPI = () =>
  apiCall("/cart");

export const addToCartAPI = (menuItemId, qty) =>
  apiCall("/cart/add", "POST", { menuItemId, qty });

export const updateCartItemAPI = (cartItemId, qty) =>
  apiCall(`/cart/update/${cartItemId}`, "PUT", { qty });

export const removeFromCartAPI = (cartItemId) =>
  apiCall(`/cart/remove/${cartItemId}`, "DELETE");

export const clearCartAPI = () =>
  apiCall("/cart/clear", "DELETE");

// ─── ORDER APIs ──────────────────────────────────────────
export const placeOrderAPI = (orderData) =>
  apiCall("/orders/place", "POST", orderData);

export const getOrderHistoryAPI = () =>
  apiCall("/orders/history");

export const reorderAPI = (orderId) =>
  apiCall(`/orders/reorder/${orderId}`, "POST");

// ─── OFFERS APIs ─────────────────────────────────────────
export const getCouponsAPI = () =>
  apiCall("/offers/coupons");

export const validateCouponAPI = (code, subtotal) =>
  apiCall("/offers/validate", "POST", { code, subtotal });

export const getLoyaltyPointsAPI = () =>
  apiCall("/offers/loyalty");

// ─── USER APIs ───────────────────────────────────────────
export const getUserProfileAPI = () =>
  apiCall("/user/profile");

export const updateProfileAPI = (data) =>
  apiCall("/user/profile", "PUT", data);
