import { links } from "@/data/links";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; 

export default function Links({ allClasses }) {
  return (
    <>
      {links.map((link, index) => (
        <Link
          className={`${allClasses ? allClasses : ""}`}
          key={index}
          to={link.href}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

// Define prop types
Links.propTypes = {
  allClasses: PropTypes.string, // allClasses is an optional string
};
