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
        if (response.status === 404) {
          return { status: 404, message: "User does not exist" };
        } else if (response.status === 403) {
          return { status: 403, message: "Invalid password" };
        }
      }
      const json = await response.json();
      localStorage.setItem("token", json.jwt);
      setToken(json.jwt);
      return { status: 200, message: "Logged in successfully" };
    } catch (err) {
      setUser(null);
      console.error("Error logging in : " + err);
      return { status: 500, message: "Logged failed" };
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
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
        if (response.status === 403) {
          return { status: 403, message: "User already exists" };
        }
      }
      const json = await response.json();
      return { status: 200, message: json.message };
    } catch (err) {
      return { status: 500, message: err };
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
