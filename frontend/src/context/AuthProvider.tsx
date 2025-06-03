import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

const FETCH_USER_DETAILS_API = "";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    username: "demo user",
    role: "user",
  };
  const [user, setUser] = useState(null);
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(FETCH_USER_DETAILS_API);
    } catch (err) {
      throw new Error("Error fetching user details");
    }
  };

  const login = () => {};
  const logout = () => {};
  const userRole = () => {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
