import { campuses } from "@/data/learningPaths";

export default function CampusPreview() {
  return (
    <section className="mt-90">
      <div className="container">
        <div
          className="row justify-center text-center mt-90"
          data-aos="fade-up"
          data-aos-offset="80"
          data-aos-duration={900}
        >
          <div className="col-auto">
            <div className="text-center">
              <img
                src="assets/img/campuses/badge/NEUCampuses.png"
                alt="campuses badge"
                style={{
                  marginTop: "3px",
                  width: "100%",
                  maxWidth: "250px",
                }}
              />
            </div>
            <div>
              <h3 className="page-header__title mt-20">
                {" "}
                Campuses of New Era University
              </h3>
            </div>
            <div>
              <p className="text-dark-1 mt-10 text-14 ">
                A private educational institution in the Philippines, run by the
                Iglesia Ni Cristo. Although it is associated with the Iglesia Ni
                Cristo, it is a non-sectarian university. Its main campus is at
                New Era, Quezon City, within the Central Office Complex of the
                Iglesia Ni Cristo.
              </p>
            </div>
          </div>

          <div className="w-100"></div>
          <section className=" pt-27 layout-pb-lg ">
            <div
              className="container "
              data-aos-offset="80"
              data-aos-duration={900}
            >
              <div className="row y-gap-50 justify-center align-items-center pt-50 lg:pt-0 ">
                {campuses.map((elm, i) => (
                  <div
                    key={i}
                    className="col-lg-12 col-md-10"
                    data-aos="fade-up"
                  >
                    <div className="coursesCard -type-2 text-center pt-50 pb-40 px-30 bg-white rounded-8">
                      <div className="coursesCard__content">
                        <h5 className="coursesCard__title text-20 lh-1 fw-700 mb-30">
                          {elm.title}
                        </h5>
                        <p className="coursesCard__text text-14 mt-10 text-dark-1 mb-30">
                          {elm.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div
        style={{
          minHeight: "50vh",
          marginTop: "200px",
        }}
      ></div>
    </section>
  );
}
