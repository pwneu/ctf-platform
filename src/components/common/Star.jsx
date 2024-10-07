import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

export default function Star({ star, textSize, textColor }) {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    // Reset rating each time star changes
    setRating([]);
    for (let i = Math.round(star); i >= 1; i--) {
      setRating((prev) => [...prev, "star"]);
    }
  }, [star]); // Include star in the dependency array

  return (
    <>
      {rating.map((itm, i) => (
        <div
          key={i}
          className={`icon-star ${textSize ? textSize : "text-9"} ${
            textColor ? textColor : "text-yellow-1"
          }`}
        ></div>
      ))}
    </>
  );
}

// Define prop types
Star.propTypes = {
  star: PropTypes.number.isRequired, // star should be a number and is required
  textSize: PropTypes.string, // textSize is an optional string
  textColor: PropTypes.string, // textColor is an optional string
};
