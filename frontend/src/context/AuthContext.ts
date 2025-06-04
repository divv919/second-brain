import { createContext } from "react";
type message = {
  message: string;
};
type AuthContextType = {
  username: () => string;
  login: (username: string, password: string) => Promise<message>;
  logout: () => message;
  signup: (username: string, password: string) => Promise<message>;
  userRole: () => string;
  token: string | null;
  loading: boolean;

  user: object | null;
};
export const AuthContext = createContext<AuthContextType | null>(null);
