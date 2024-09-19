import React from "react";
import {whyourcourse } from "../../data/whyourcourse"; 
export default function WhyPWNEU() {
  return (
    <section className="layout-pt-lg layout-pb-lg bg-dark-2">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2
                className="sectionTitle__title text-white"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                Why learn with our courses?
              </h2>

              <p
                className="sectionTitle__text text-white "
                data-aos="fade-up"
                data-aos-duration={800}
              >
                Unlock your potential with courses designed to make cybersecurity both engaging and effective.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          {whyourcourse.map((elm, i) => (
            <div
              key={i}
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-duration={(i + 1) * 400}
            >
              <div className="stepCard -type-1 -stepCard-hover">
                <div className="stepCard__content">
                  <div className="stepCard__icon">
                    <i className={elm.icon}></i>
                  </div>
                  <h4 className="stepCard__title">{elm.title}</h4>
                  <p className="stepCard__text"> {elm.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
