import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const RequireNoAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth === undefined) {
    return <div>Loading...</div>;
  }

  return !auth?.userName ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireNoAuth;
