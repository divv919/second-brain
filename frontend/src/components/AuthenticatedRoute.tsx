import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";
export const AuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  console.log(user);
  if (loading) {
    return <div>Wait</div>;
  }
  if (user) {
    return children;
  } else {
    return <Navigate to="/auth" />;
  }
};
