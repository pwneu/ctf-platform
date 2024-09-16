import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Mission() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Start the animation when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="page-header -type-1" ref={sectionRef}>
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center y-gap-50">
              <div className="col-auto">
                <div>
                  <h1 className={`page-header__title text-25 ${animate ? "up-text" : ""}`}>
                    Mission
                  </h1>
                </div>
                <div>
                  <p className={`page-header__text ${animate ? "up-text" : ""}`}>
                    We are committed to providing exceptional cybersecurity
                    education anchored on Christian values, with the aim of
                    developing graduates who are not only experts in their field
                    but also embody integrity, discipline, and a deep sense of
                    service to humanity. Our mission is to empower learners with
                    the knowledge, skills, and ethical grounding necessary to
                    protect and secure the digital world, bringing honor and
                    glory to God through their professional and personal
                    conduct.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
