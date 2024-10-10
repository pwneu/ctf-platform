import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // TODO -- Design
  if (auth === undefined) {
    return <div>Loading...</div>;
  }

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.userName ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
