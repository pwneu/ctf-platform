import PropTypes from 'prop-types';
import { socialMediaLinks } from "@/data/socialLinks"; 

export default function Socials({ componentsClass, textSize }) {
  return (
    <>
      {socialMediaLinks.map((link, index) => (
        <a
          key={index}
          className={componentsClass ? componentsClass : ""}
          href={link.href}
          target="_blank" // Optional: Opens link in a new tab
          rel="noopener noreferrer" // Optional: Security feature for external links
        >
          <i className={`${link.iconClassName} ${textSize}`}></i>
        </a>
      ))}
    </>
  );
}

// Define prop types
Socials.propTypes = {
  componentsClass: PropTypes.string,
  textSize: PropTypes.string,
};
