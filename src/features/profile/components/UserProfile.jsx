import { RankPoints } from "../data/dashboard";

export default function UserDashbord() {
  return (
    <div className="dashboard">
      <div className="dashboard__content">
        {/* <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div> */}

        <div className="row y-gap-50">
          <div className="col-xl-12 col-lg-12">
            <div className="row y-gap-30">
              <div className="d-flex items-center flex-column text-center py-40 px-40 rounded-16 bg-white -dark-bg-dark-1 shadow-1">
                <div className="text-28 fw-500 text-dark-1 mt-2">@Asthreya</div>
                <div className="text-40 fw-500 text-dark-1 ">
                  David King Roderos
                </div>
                <div className="text-14 lh-1 mt-5">
                  david.roderos@neu.edu.ph
                </div>
              </div>
              {RankPoints.slice(0, 4).map((elm, i) => (
                <div key={i} className="col-xl-3 col-md-6">
                  <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-1">
                    <div>
                      <div className="lh-1  items-center text-20 fw-500">
                        {elm.title}
                      </div>
                      <div className="text-30 lh-2 fw-700 text-dark-1 mt-20">
                        {elm.value}
                      </div>
                    </div>
                    <i className={`text-40 ${elm.iconClass} text-black-2 `}></i>
                  </div>
                </div>
              ))}
            </div>

            {/*<div className="row y-gap-30 pt-30">
               <div className="col-md-6">
                <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                  <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                    <h2 className="text-17 lh-1 fw-500">Your Profile Views</h2>
                    <div className="">
                      <div className="text-14">This Week</div>
                    </div>
                  </div>
                  <div className="py-40 px-30">
                    <Charts />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                  <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                    <h2 className="text-17 lh-1 fw-500">Traffic</h2>
                    <div className="">
                      <div className="">This Week</div>
                    </div>
                  </div>
                  <div className="py-40 px-30">
                    <PieChartComponent />
                  </div>
                </div>
              </div> 
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
