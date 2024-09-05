import MobileFooter from "./MobileFooter"; 

import { menuList } from "../../../data/menu"; 

import { Link } from "react-router-dom"; 

import { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom"; 

export default function MobileMenu({ setActiveMobileMenu, activeMobileMenu }) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuNesting, setMenuNesting] = useState([]);
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname?.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname?.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);
  useEffect(() => {
    setShowMenu(true);
  }, []);
  const { pathname } = useLocation();
  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        activeMobileMenu ? "-is-el-visible" : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link
            to="/login"
            className={`text-dark-1 ${
              pathname == "/login" ? "activeMenu" : "inActiveMenu"
            } `}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className={`text-dark-1 ml-30 ${
              pathname == "/signup" ? "activeMenu" : "inActiveMenu"
            } `}
          >
            Sign Up
          </Link>
        </div>

        {showMenu && activeMobileMenu && (
          <div className="mobileMenu text-dark-1">
            {menuList.map((elm, i) => {
              if (elm.title) {
                return (
                  <div key={i} className="submenuOne">
                    <div
                      className="title"
                      onClick={() =>
                        setMenuNesting((pre) =>
                          pre[0] == elm.title ? [] : [elm.title],
                        )
                      }
                    >
                      <span
                        className={
                          elm.title == menuItem ? "activeMenu" : "inActiveMenu"
                        }
                      >
                        {elm.title}
                      </span>
                      <i
                        className={
                          menuNesting[0] == elm.title
                            ? "icon-chevron-right text-13 ml-10 active"
                            : "icon-chevron-right text-13 ml-10"
                        }
                      ></i>
                    </div>

                    {elm.links &&
                      elm.links.map((itm, index) => (
                        <div
                          key={index}
                          className={
                            menuNesting[0] == elm.title
                              ? "toggle active"
                              : "toggle"
                          }
                        >
                          {itm.href && (
                            <Link
                              key={i}
                              className={
                                pathname?.split("/")[1] ==
                                itm.href?.split("/")[1]
                                  ? "activeMenu link"
                                  : "link inActiveMenu"
                              }
                              to={itm.href}
                            >
                              {itm.label}
                            </Link>
                          )}

                          {itm.links && (
                            <div className="submenuTwo">
                              <div
                                className="title"
                                onClick={() =>
                                  setMenuNesting((pre) =>
                                    pre[1] == itm.title
                                      ? [pre[0]]
                                      : [pre[0], itm.title],
                                  )
                                }
                              >
                                <span
                                  className={
                                    itm.title == submenu
                                      ? "activeMenu"
                                      : "inActiveMenu"
                                  }
                                >
                                  {itm.title && itm.title}
                                </span>
                                <i
                                  className={
                                    menuNesting[1] == itm.title
                                      ? "icon-chevron-right text-13 ml-10 active"
                                      : "icon-chevron-right text-13 ml-10"
                                  }
                                ></i>
                              </div>
                              <div
                                className={
                                  menuNesting[1] == itm.title
                                    ? "toggle active"
                                    : "toggle"
                                }
                              >
                                {itm.links &&
                                  itm.links.map((itm2, index3) => (
                                    <Link
                                      key={index3}
                                      className={
                                        pathname?.split("/")[1] ==
                                        itm2.href?.split("/")[1]
                                          ? "activeMenu link"
                                          : "link inActiveMenu"
                                      }
                                      to={itm2.href}
                                    >
                                      {itm2.label}
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                );
              }
            })}
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
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div
        className="header-menu-bg"
        onClick={() => setActiveMobileMenu(false)}
      ></div>
    </div>
  );
}
