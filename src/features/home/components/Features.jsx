import { feature } from "@/data/features";

export default function Features() {
  return (
    <section className="layout-pt-lg layout-pb-lg ">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-xl-5 col-lg-6 col-md-10 order-2 order-lg-1">
            <div className="about-content col-xl-11 col-lg-6 col-md-1 ">
              <h2
                className="about-content__title customSized "
                data-aos="fade-up"
              >
                <span>Master New Skills </span> on Your Own Terms.
              </h2>
              <p className="about-content__text fw-600 text-13 lh-1" data-aos="fade-up">
                College of Informatics and Computing Studies <br></br>New Era University
              </p>

              <p className="about-content__text lh-1" data-aos="fade-up">
                Unlock the benefits of PWNEU Missions, designed specifically
                <br /> for university students like you:
              </p>
              <div className="y-gap-20 pt-30 ">
                {feature.map((elm, i) => (
                  <div
                    key={i}
                    className="d-flex items-center"
                    data-aos="fade-up"
                  >
                    <i
                      className="fas fa-check-circle"
                      style={{
                        marginRight: "20px",
                        marginBottom: "1px",
                        marginTop: "12px",
                        color: "black",
                      }}
                    ></i>
                    <div className="about-content-list__title pt-20 lh-1">
                      {elm.title}
                    </div>
                  </div>
                ))}
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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
