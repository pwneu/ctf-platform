import { Link } from "react-router-dom";

export default function FindLearningPath() {
  return (
    <section className="cta -type-1 layout-pt-lg layout-pb-lg">
      <div data-parallax="0.6" className="cta__bg">
        <div
          data-parallax-target
          className="bg-image js-lazy"
          style={{
            backgroundImage: "url(/assets/img/learningPaths/pathways/bg1.gif)",
          }}
        ></div>
      </div>

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <h2
              className="text-45 md:text-30 text-white"
              data-aos="fade-down"
              data-aos-offset="100"
              data-aos-duration={900}
            >
              Find Your Cybersecurity Pathway
            </h2>
          </div>

          <div className="w-100"></div>

          <div className="col-lg-9 col-md-4">
            <p
              className="text-white mt-15"
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration={900}
            >
              Discover Your Perfect Match: Align your skills and goals with our
              tailored cybersecurity programs and challenges. Explore different
              learning paths, from beginner to advanced, and plot your course to
              mastering the art of digital defense.
            </p>
          </div>
          <div className="mt-40"></div>

          <div className="w-100"></div>

          <div className="col-auto">
            <Link
              to="/play"
              className="button -md -white text-black  mt-45 md:mt-0"
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration={900}
            >
              Get Started on Your Cybersecurity Journey Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
