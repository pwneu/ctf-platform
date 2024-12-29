import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import LoadingIcon from "./LoadingIcon";
import { toast } from "react-toastify";

const RequireNoAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth === undefined) {
    return <LoadingIcon />;
  }

  if (auth?.userName) {
    toast.warn("You must be logged out before accessing this page.");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireNoAuth;
