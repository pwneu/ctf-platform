import { sidebarprofile } from "../data/sidebarprofile";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "@/api";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/identity/logout");
      setAuth(null);
      navigate("/login");
    } catch (error) {
      toast.error("Unable to log out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="sidebar -dashboard text-dark-1">
      {sidebarprofile.map((elm, i) => (
        <Link
          key={i}
          to={elm.href}
          className={`sidebar__itemUser ${
            pathname == elm.href ? "-is-active" : ""
          } `}
        >
          <div key={i} className="d-flex items-center text-15 lh-1 fw-500 ">
            <i className={`${elm.iconClass} mr-15`}></i>
            {elm.text}
          </div>
        </Link>
      ))}

      <div className={`sidebar__itemUser`}>
        <button
          className="d-flex items-center text-15 lh-1 fw-500 "
          onClick={handleLogout}
        >
          <i className={`icon-power mr-15`}></i>
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
