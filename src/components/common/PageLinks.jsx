import PropTypes from "prop-types";

export default function PageLinks({ dark }) {
  return (
    <section className={`breadcrumbs ${dark ? "bg-dark-2" : ""}`}></section>
  );
}

// Define prop types
PageLinks.propTypes = {
  dark: PropTypes.bool,
};
