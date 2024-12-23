import { hintusage } from "../data/hintusage";
import FooterProfile from "@/layout/footers/FooterProfile";

export default function HintUsage() {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content">
        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-1 h-100">
              <div className="py-30 px-30">
                <div>
                  <div className="d-flex items-center py-10 px-0 border-bottom-light">
                    <h2 className="text-17  text-dark-1 lh-1 fw-500">
                      Hint Usage Overview
                    </h2>
                  </div>
                  <div className="col-xl-12">
                    <p className="mt-15">
                      This section provides detailed information about the hints
                      used during the CTF competition. It includes the hint ID,
                      associated challenge ID and name, the timestamp when the
                      hint was used, and the points deducted for utilizing each
                      hint.
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-30 px-30 ">
                <div className="mt-20">
                  <div className="px-30 py-20 bg-dark-6 -dark-bg-dark-2 rounded-8">
                    <div className="row x-gap-10">
                      <div className="col-lg-5">
                        <div className="text-white">Hint Id</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-white">Challenge Id</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-white">Challenge Name</div>
                      </div>
                      <div className="col-lg-3">
                        <div className="text-white">Used At</div>
                      </div>
                    </div>
                  </div>

                  {hintusage.map((elm, i) => (
                    <div key={i} className="px-30 border-bottom-light">
                      <div className="row x-gap-0 items-center py-15">
                        <div className="col-lg-5">
                          <div className="d-flex items-center">
                            <div className="ml-0">
                              <div className="lh-12">Hint: {elm.hintId}</div>
                              <div className="text-14 lh-12 mt-5">
                                {elm.hintCategory} Deduction Points:{" "}
                                {elm.deductionPoints}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">{elm.challengeId}</div>
                        <div className="col-lg-2">{elm.challengeName}</div>
                        <div className="col-lg-3">{elm.UsedAt}</div>
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
