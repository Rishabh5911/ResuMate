import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const context = useContext(AuthContext);
  const { user, loading } = context!;

  if (loading) {
    return <Loader color="text-black"/>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;