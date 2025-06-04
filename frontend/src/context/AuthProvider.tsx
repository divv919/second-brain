import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

const FETCH_USER_DETAILS_API = "http://localhost:3000/api/v1/userInfo";
const LOGIN_API = "http://localhost:3000/api/v1/signin";
const SIGNUP_API = "http://localhost:3000/api/v1/signup";
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (token) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [token]);
  console.log(loading);
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(FETCH_USER_DETAILS_API, {
        headers: {
          ...(token ? { Authorization: token } : {}),
        },
      });
      const json = await response.json();
      setUser(json);
    } catch (err) {
      setIsLoggedIn(false);
      throw new Error("Error fetching user details : " + err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error();
      }
      const json = await response.json();
      localStorage.setItem("token", json.jwt);
      setToken(json.jwt);
      setIsLoggedIn(true);
      return { message: "Logged in successfully" };
    } catch (err) {
      setUser(null);
      console.error("Error logging in : " + err);
      return { message: "Logged failed" };
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    return { message: "Logged out successfully" };
  };

  const signup = async (username: string, password: string) => {
    try {
      const response = await fetch(SIGNUP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error();
      }
      const json = await response.json();
      return json;
    } catch (err) {
      console.error("Error signing up", err);
      return { message: "Error signing up" };
    }
  };
  const userRole = () => {
    if (!user) {
      return "Error getting user role";
    }
    return user.role;
  };
  const username = () => {
    if (!user) {
      return "Error getting username";
    }
    return user.username;
  };
  const value = {
    token,
    loading,
    username,
    user,
    login,
    logout,
    signup,
    userRole,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
