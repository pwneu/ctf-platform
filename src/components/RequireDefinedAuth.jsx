import { Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const RequireDefinedAuth = () => {
  const { auth } = useAuth();

  // TODO -- Design
  if (auth === undefined) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default RequireDefinedAuth;
