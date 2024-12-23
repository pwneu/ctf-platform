import { solveoverview } from "../data/solveoverview";
import FooterProfile from "@/layout/footers/FooterProfile";

export default function SolveOverview() {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content">
        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-1 h-100">
              <div className="py-30 px-30">
                <div>
                  <div className="d-flex items-center py-10 px-0 border-bottom-light">
                    <h2 className="text-17 lh-1 fw-500">
                      Challenge Performance Overview
                    </h2>
                  </div>
                  <div className="col-xl-12 ">
                    <p className="mt-15">
                      This section details the challenges you participated in
                      during the CTF competition. It provides the challenge ID,
                      name, the points earned for solving each challenge, the
                      timestamp of when the solution was submitted, and the
                      corresponding category for each challenge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-30 px-30">
                <div className="mt-20">
                  <div className="px-30 py-20 bg-dark-6 -dark-bg-dark-2 rounded-8">
                    <div className="row x-gap-10">
                      <div className="col-lg-5">
                        <div className="text-white">Challenge Id</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-white">Challenge Name</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-white">Challenge Points</div>
                      </div>
                      <div className="col-lg-3">
                        <div className="text-white">Solve At</div>
                      </div>
                    </div>
                  </div>

                  {solveoverview.map((elm, i) => (
                    <div key={i} className="px-30 border-bottom-light">
                      <div className="row x-gap-10 items-center py-15">
                        <div className="col-lg-5 ">
                          <div className="d-flex items-center  ">
                            <div className="ml-0">
                              <div className=" lh-12 ">
                                Category: {elm.challengeCategory}
                              </div>
                              <div className="fw-20">{elm.challengeId}</div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">{elm.challengeName}</div>
                        <div className="col-lg-2">{elm.challengePoints}</div>
                        <div className="col-lg-3">{elm.SolveAt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterProfile />
    </div>
  );
}
