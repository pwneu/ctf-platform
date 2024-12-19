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
        <div className="row y-gap-40">
          {learningPath.map((elm, i) => (
            <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div
                className="categoryCard -type-4"
                data-aos="fade-up"
                data-aos-offset="100"
                data-aos-duration={900}
                data-aos-delay={i * 100} // Add delay to stagger animations
              >
                <div className="categoryCard__content">
                  {/* Icon Image Here */}
                  <div
                    className="categoryCard__icon"
                    data-aos="fade-up"
                    data-aos-offset="90"
                    data-aos-duration={900}
                  >
                    <img
                      src={elm.icon}
                      alt={`${elm.title} icon`}
                      className="icon-img"
                      style={{
                        width: "55px",
                        height: "55px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div
                    className="categoryCard__content"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      className="categoryCard__title"
                      style={{
                        fontSize: "17px",
                        fontWeight: "600",
                        marginBottom: "1px",
                      }}
                    >
                      {elm.title}
                    </h4>
                    <div
                      className="categoryCard__text mt-30"
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.25",
                        marginTop: "9px",
                      }}
                    >
                      {elm.description}
                    </div>
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
