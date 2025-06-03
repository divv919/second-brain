import { createContext } from "react";

type AuthContextType = {
  username: string;
  role: string;
};
export const AuthContext = createContext<AuthContextType | null>(null);
