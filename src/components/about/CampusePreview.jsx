import { Link } from "react-router-dom";
import React from "react";

export default function CampusePreview() {
  return (
    <section className="cta -type-1 layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <h2 className="text-45 md:text-30 text-white">
              New Era University Campuses
            </h2>
          </div>

          <div className="w-100"></div>

          <div className="col-lg-9 col-md-4">
            <p className="text-white mt-15">
              New Era University is committed to providing quality education
              with a range of programs designed to meet the needs of diverse
              learners. With a strong emphasis on academic excellence and
              holistic development, the university offers state-of-the-art
              facilities and a supportive learning environment. Students can
              explore various fields of study, engage in practical experiences,
              and benefit from a curriculum that adapts to the demands of the
              global workforce. Whether you're pursuing undergraduate or
              advanced studies, New Era University prepares you for success in
              your chosen career path.
            </p>
          </div>
          <div className="w-100"></div>
        </div>
      </div>
      <div data-parallax="0.6" className="cta__bg">
        <div
          data-parallax-target
          className="bg-image js-lazy"
          style={{
            backgroundImage: "url(/assets/img/campuses/CampusePreviewCard.svg)",
          }}
        ></div>
      </div>
    </section>
  );
}
