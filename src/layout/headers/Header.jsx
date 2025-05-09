import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import { toast } from "react-toastify";
import Menu from "../components/Menu";
import MobileMenu from "../components/MobileMenu";
import useAuth from "@/hooks/useAuth";

const LOGOUT_API = "/identity/logout";

export default function Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const isManager = auth?.roles?.includes("Manager");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post(LOGOUT_API);
      setAuth(null);
      navigate("/login");
    } catch (error) {
      toast.error("Unable to log out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="header -type-1">
        <div className="header__container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="header-left">
                <div className="header__logo">
                  <Link to="/">
                    <img
                      src="/assets/img/general/PWNEU_DarkGreenLogo.svg"
                      alt="logo"
                      className="img-fluid"
                      style={{ maxWidth: "70%", height: "auto" }}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <Menu allClasses={"menu__nav text-white -is-active"} />
            <MobileMenu
              setActiveMobileMenu={setActiveMobileMenu}
              activeMobileMenu={activeMobileMenu}
            />

            <div className="col-auto">
              <div className="header-right d-flex items-center">
                <div className="header-right__icons text-white d-flex items-center">
                  <div className="d-none xl:d-block ml-20">
                    <button
                      onClick={() => setActiveMobileMenu(true)}
                      className="text-white items-center"
                      data-el-toggle=".js-mobile-menu-toggle"
                    >
                      <i className="text-11 icon icon-mobile-menu"></i>
                    </button>
                  </div>
                </div>

                <div className="header-right__buttons d-flex items-center ml-30 md:d-none">
                  {auth?.userName ? (
                    <>
                      <Link
                        className="text-white"
                        style={{
                          cursor: "pointer",
                          textDecoration: "none",
                          marginRight: "10px",
                        }}
                        to={isManager ? "/admin" : "/dashboard"}
                      >
                        {auth.userName}
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="button -sm -rounded -green-1 text-dark-1"
                        disabled={isLoggingOut}
                      >
                        {isLoggingOut ? "Logging out..." : "Log out"}{" "}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="--sm -white text-white"
                        style={{ marginRight: "20px" }}
                      >
                        Log in
                      </Link>
                      <Link
                        to="/signup"
                        className="button -sm -rounded -green-1 text-dark-1"
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
