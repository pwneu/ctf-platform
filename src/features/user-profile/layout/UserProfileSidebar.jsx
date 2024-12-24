import { sidebarprofile } from "../data/sidebarprofile";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function UserProfileSidebar() {
  const { pathname } = useLocation();
  return (
    <div className="sidebar -dashboard text-dark-1">
      {sidebarprofile.map((elm, i) => (
        <div
          key={i}
          className={`sidebar__itemUser   ${
            pathname == elm.href ? "-is-active" : ""
          } `}
        >
          <Link
            key={i}
            to={elm.href}
            className="d-flex items-center text-15 lh-1 fw-500 "
          >
            <i className={`${elm.iconClass} mr-15`}></i>
            {elm.text}
          </Link>
        </div>
      ))}
    </div>
  );
}
