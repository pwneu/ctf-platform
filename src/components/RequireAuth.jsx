import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import LoadingIcon from "./LoadingIcon";
import { toast } from "react-toastify";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth === undefined) {
    return <LoadingIcon />;
  }

  if (auth?.roles?.find((role) => allowedRoles?.includes(role))) {
    return <Outlet />;
  }

  if (auth?.userName) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  toast.warn("Please log in first.");
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
