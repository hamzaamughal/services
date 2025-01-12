// src/hooks/useAuth.js
import { useEffect, useState } from "react";

const useAuth = () => {
 const [user, setUser] = useState(null);

 useEffect(() => {
  // Attempt to load user from localStorage
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
   setUser(JSON.parse(storedUser));
  }
 }, []);

 const isLoggedIn = Boolean(user);
 const isAdmin = user?.role === "admin";

 const logout = () => {
  // Remove all auth items from local storage
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");

  // Optionally redirect or simply reload
  window.location.reload();
  // or use a router navigate if you prefer:
  // navigate("/");
 };

 return { user, isLoggedIn, isAdmin, logout };
};

export default useAuth;
