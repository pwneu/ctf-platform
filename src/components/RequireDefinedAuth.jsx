import { Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import LoadingIcon from "./LoadingIcon";

const RequireDefinedAuth = () => {
  const { auth } = useAuth();

  if (auth === undefined) {
    return <LoadingIcon />;
  }

  return <Outlet />;
};

export default RequireDefinedAuth;
