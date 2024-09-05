import React from "react";

import { Link } from "react-router-dom";
import { feature } from "../../../data/features"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCheck } from "@fortawesome/free-solid-svg-icons"; 
export default function Features() {
  return (
    <section className="layout-pt-lg layout-pb-lg bg-beige-1">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-xl-5 col-lg-6 col-md-10 order-2 order-lg-1">
            <div className="about-content">
              <h2
                className="about-content__title customSized"
                data-aos="fade-up"
              >
                <span>Master New Skills </span> on Your Own Terms.
              </h2>
              <p className="about-content__text" data-aos="fade-up">
                Explore the benefits of PWNEU Missions designed 
                <br /> for university students.
              </p>
              <div className="y-gap-20 pt-30">
                {feature.map((elm, i) => (
                  <div
                    key={i}
                    className="d-flex items-center"
                    data-aos="fade-up"
                  >
                    <div className="about-content-list__icon">
                      <span
                        className="text-white"
                        style={{
                          fontSize: "10px",
                          fontWeight: "300",
                        }}
                        aria-hidden="true"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    </div>
                    <div className="about-content-list__title">{elm.title}</div>
                  </div>
                ))}
              </div>

              <div className="d-inline-block mt-30">
                <Link to="/signup" className="button -md -dark-1 text-white">
                  Join Free
                </Link>
              </div>
            </div>
          </div>

          <div
            className="col-xl-5 col-lg-6 order-1 order-lg-2"
            data-aos="fade-up"
          >
            <div className="about-image">
              <img
                style={{ height: "100%", width: "100%" }}
                src="/assets/img/features/pwneufeatures.gif"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
