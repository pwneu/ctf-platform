
import { links } from "../../../data/links";
import { Link } from "react-router-dom";
import React from "react";

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
