import { developers } from "@/data/teams";

export default function DevFounder() {
  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Meet the Executive Team</h2>

              <p className="sectionTitle__text ">
                We are pleased to introduce our Executive Team, each bringing
                exceptional skills and expertise to our organization:
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-60 lg:pt-50">
          {developers.map((elm, i) => (
            <div key={i} className="col-xl-3 col-lg-4 col-md-6 linkCustomTwo">
              <div className="categoryCard -type-3">
                <div className="categoryCard__content">
                  <h4 className="categoryCard__title text-17 fw-500">
                    {elm.title}
                  </h4>
                  <div className="categoryCard__text text-13 lh-1 mt-5">
                    {elm.profession}
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
