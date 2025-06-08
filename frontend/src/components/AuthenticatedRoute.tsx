import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";
import GlobalLoader from "./ui/GlobalLoader";

export const AuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  console.log(user);
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <GlobalLoader />
      </div>
    );
  }
  if (user) {
    return children;
  } else {
    return <Navigate to="/auth" />;
  }
};
