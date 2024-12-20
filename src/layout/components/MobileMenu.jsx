import MobileFooter from "./MobileFooter"; 
import { menumobileList } from "@/data/menu";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faEye,
  faUsers,
  faBullseye,
  faShieldAlt,
  faFileAlt,
  faBook,
  faGamepad,
  faTrophy,
  faRobot,
  faUniversity,
  faQuestionCircle,
  faLifeRing,
  faSignInAlt,
  faUserPlus, // Import the Login (faSignInAlt) and Sign Up (faUserPlus) icons
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "fa-info-circle": faInfoCircle,
  "fa-eye": faEye,
  "fa-users": faUsers,
  "fa-bullseye": faBullseye,
  "fa-shield-alt": faShieldAlt,
  "fa-book": faBook,
  "fa-file-alt": faFileAlt,
  "fa-gamepad": faGamepad,
  "fa-trophy": faTrophy,
  "fa-robot": faRobot,
  "fa-university": faUniversity,
  "fa-question-circle": faQuestionCircle,
  "fa-life-ring": faLifeRing,
  "fa-sign-in-alt": faSignInAlt, // Map the Login icon
  "fa-user-plus": faUserPlus, // Map the SignUp icon
};

const MobileMenu = ({ setActiveMobileMenu, activeMobileMenu }) => {
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("");

  useEffect(() => {
    const activeItem = menumobileList
      .flatMap((menu) => [menu, ...(menu.subMenu || [])])
      .find((item) => item.path.split("/")[1] === pathname.split("/")[1]);

    if (activeItem) {
      setActiveMenuItem(activeItem.title);
    }
  }, [pathname]);

  useEffect(() => {
    setShowMenu(true);
  }, []);

  const renderIcon = (iconName) => <FontAwesomeIcon icon={iconMap[iconName]} />;

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        activeMobileMenu ? "-is-el-visible" : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-10 py-20 border-bottom-light justify-content-between w-full">
          <div className="logo">
            <img
              src="/assets/img/general/PWNEU-DarkGreenLogo-mobileheader.svg"
              alt="Logo"
              style={{ height: "40px" }}
            />
          </div>

          <div className="d-flex items-center">
            <Link
              to="/login"
              className={`text-dark-1 ${
                pathname === "/login" ? "activeMenu" : "inActiveMenu"
              }`}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "10px" }}>
                {renderIcon("fa-sign-in-alt")}
              </span>{" "}
              Log in
            </Link>
            <Link
              to="/signup"
              className={`text-dark-1 ml-30 ${
                pathname === "/signup" ? "activeMenu" : "inActiveMenu"
              }`}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "10px" }}>
                {renderIcon("fa-user-plus")}
              </span>{" "}
              Sign Up
            </Link>
          </div>
        </div>

        {showMenu && activeMobileMenu && (
          <div className="mobileMenu text-dark-1" style={{ textAlign: "left" }}>
            {menumobileList.map((elm, i) => (
              <div key={i} className="menuItem">
                <div className="menu-item-container">
                  {!elm.subMenu && (
                    <Link
                      className={
                        activeMenuItem === elm.title
                          ? "activeMenu link"
                          : "link inActiveMenu"
                      }
                      to={elm.path}
                      style={{
                        display: "block",
                        fontSize: "18px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      <span style={{ marginRight: "20px" }}>
                        {renderIcon(elm.icon)}
                      </span>
                      {elm.title}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
         {/* mobile footer start */}
         <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        onClick={() => {
          setActiveMobileMenu(false);
        }}
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-30 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg" onClick={() => setActiveMobileMenu(false)}></div>
    </div>
  );
};

MobileMenu.propTypes = {
  setActiveMobileMenu: PropTypes.func.isRequired,
  activeMobileMenu: PropTypes.bool.isRequired,
};

export default MobileMenu;
