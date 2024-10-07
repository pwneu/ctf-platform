import { useState } from "react";
import { Link } from "react-router-dom";  
import PropTypes from 'prop-types'; 

export const HeaderExplore = ({ allClasses }) => {
  const [exploreActive, setExploreActive] = useState(false);

  return (
    <>
      <div className={`${allClasses ? allClasses : ""}`}>
        <Link
          to="#"
          onClick={() => setExploreActive((pre) => !pre)}
          className="d-flex items-center"
          data-el-toggle=".js-explore-toggle"
        >
          <i className="icon icon-explore mr-15"></i>
          Explore
        </Link>
      </div>

      <div
        className={`explore-content py-25 rounded-8 bg-white toggle-element js-explore-toggle ${exploreActive ? "-is-el-visible" : ""}`}
      >
        {/* Content... */}
        {/* Example of the updated code with correct link usage */}
        <div className="explore__item">
          <Link
            to="#"
            className="d-flex items-center justify-between text-dark-1"
          >
            Overview<div className="icon-chevron-right text-11"></div>
          </Link>
          <div className="explore__subnav rounded-8">
            <Link className="text-dark-1" to="#">
              Introduction to the Platform
            </Link>
            <Link className="text-dark-1" to="#">
              Key Features
            </Link>
            <Link className="text-dark-1" to="#">
              Getting Started Guide
            </Link>
          </div>
        </div>
        {/* More explore items... */}
      </div>
    </>
  );
};

// Define prop types
HeaderExplore.propTypes = {
  allClasses: PropTypes.string, // allClasses is an optional string
};
