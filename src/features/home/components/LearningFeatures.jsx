import { learningPath } from "@/data/learningPaths";

export default function LearningFeatures() {
  return (
    <section className="layout-pt-lg layout-pb-lg js-mouse-move-container">
      <div className="container">
        <div className="row y-gap-30 items-center">
          <h2 className="text-10 text-center lg:text-40 md:text-30 text-dark-1">
            Unlock Your Cybersecurity
            <br className="xl:d-none" /> Potential with{" "}
            <span style={{ color: "#AB3331" }}>PWNEU Cyber-Education</span>{" "}
          </h2>
          <p className="text-dark-1 text-center mt-0">
            Explore the key features of our upskilling platform:
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row y-gap-30 lg:pt-50">
          {learningPath.map((elm, i) => (
            <div key={i} className="col-xl-3 col-lg-4 col-md-6 ">
              <div className="categoryCard -type-4">
                <div className="categoryCard__content">
                  <h4 className="categoryCard__title text-17 fw-600 pt-90 ">
                    {elm.title}
                  </h4>
                  <div className="categoryCard__text text-13 lh-1 mt-5  ">
                    {elm.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
