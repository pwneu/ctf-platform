import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import LoadingIcon from "./LoadingIcon";

const RequireNoAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth === undefined) {
    return <LoadingIcon />;
  }

  return !auth?.userName ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireNoAuth;
