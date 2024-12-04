import { ourmissionvission } from "@/data/learningPaths";

export default function MissionVision() {
  return (
    <section className=" pt-27 layout-pb-lg">
      <div className="container">
        <div className="row y-gap-20 justify-center align-items-center pt-60 lg:pt-0 ">
          {ourmissionvission.map((elm, i) => (
            <div key={i} className="col-lg-10 col-md-5">
              <div className="coursesCard -type-2 text-center pt-50 pb-40 px-30 bg-white rounded-8">
                <div className="coursesCard__content mt-30">
                  <h5 className="coursesCard__title text-20 lh-1 fw-700">
                    {elm.title}
                  </h5>
                  <p className="coursesCard__text text-14 mt-10">
                    {elm.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
