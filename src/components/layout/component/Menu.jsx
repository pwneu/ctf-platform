import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileFooter from "./MobileFooter";

import { menuList } from "@/data/menu";
import { useLocation } from "react-router-dom";

export default function Menu({ allClasses, headerPosition }) {
  const [menuItem, setMenuItem] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link to="/login" className="text-dark-1">
            Log in
          </Link>
          <Link to="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>

        

        <div className="menu js-navList">
          <ul className={`${allClasses ? allClasses : ""}`}>
            <li className="menu-item-has-children">
              <a
                href="https://pwneu.github.io/learn/docs/introduction"
                className={menuItem == "Learn" ? "activeMenu" : ""}
                target="_blank"
                rel="noopener noreferrer"
              >                
                Learn
              </a>

            </li>
            <li className="menu-item-has-children">
              <Link
                data-barba
                to="/campuses"
                className={menuItem == "Campuses" ? "activeMenu" : ""}
              >
                University
              </Link>
             
            </li>

            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                to="/list-of-challenges"
                className={menuItem == "Courses" ? "activeMenu" : ""}
              >
                Compete 
              </Link>

            </li>

            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                to="/discussion-forum"
                className={menuItem == "Courses" ? "activeMenu" : ""}
              >
                Community
              </Link>
            </li>

            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                to="/our-story"
                className={menuItem == "Courses" ? "activeMenu" : ""}
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                data-barba
                to="/contact"
                className={
                  pathname == "#" ? "activeMenu" : "inActiveMenuTwo"
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}
