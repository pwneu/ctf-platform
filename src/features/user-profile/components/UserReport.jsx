import FooterProfile from "@/layout/footers/FooterProfile";

export default function UserReport() {
  return (
    <div className="dashboard__main ">
      <div className="dashboard__content">
        <div className="row y-gap-30">
          <div className="col-xl-12">
            <div className="rounded-16 bg-white -dark-bg-dark-2 shadow-1 h-100">
              <div className="py-30 px-30">
                <div>
                  <div className="d-flex items-center py-10 px-0 border-bottom-light">
                    <h2 className="text-17 lh-1 fw-500">
                      CTF Competition Performance Overview
                    </h2>
                  </div>
                  <div className="col-xl-12">
                    <p className="mt-15">
                      This report summarizes the results of a Capture The Flag
                      (CTF) competition. It provides an overview of the
                      participant’s performance across various challenges,
                      showcasing their overall ranking, total points earned, and
                      the number of flags solved. The statistics also include
                      the frequency of hint usage, reflecting the challenges
                      faced during the event.
                    </p>
                  </div>
                </div>

                <div className="mt-60">
                  <h4 className="text-18 lh-1 fw-500">Result summary</h4>
                </div>

                <div className="mt-30">
                  <div className="rounded-8 px-25 py-25 bg-light-4">
                    <div className="row">
                      <div className="col-10">
                        <div className="text-dark-1">
                          {" "}
                          <i
                            className="fa fa-trophy"
                            style={{ marginRight: "8px" }}
                          ></i>{" "}
                          Overall Rank
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto text-dark-1"
                      >
                        55
                      </div>
                    </div>
                  </div>

                  <div className="rounded-8 px-25 py-25">
                    <div className="row">
                      <div className="col-10">
                        <div className="text-dark-1">
                          {" "}
                          <i
                            className="fa fa-star"
                            style={{ marginRight: "8px" }}
                          ></i>{" "}
                          Total points
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto text-dark-1"
                      >
                        103
                      </div>
                    </div>
                  </div>

                  <div className="rounded-8 px-25 py-25 bg-light-4">
                    <div className="row">
                      <div className="col-10">
                        <div className="text-dark-1 ">
                          {" "}
                          <i
                            className="fa fa-check-circle"
                            style={{ marginRight: "8px" }}
                          ></i>{" "}
                          Total Solves
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto text-dark-1"
                      >
                        234
                      </div>
                    </div>
                  </div>

                  <div className="rounded-8 px-25 py-25 ">
                    <div className="row">
                      <div className="col-10">
                        <div className="text-dark-1 ">
                          {" "}
                          <i
                            className="fa fa-lightbulb-o"
                            style={{ marginRight: "8px" }}
                          ></i>{" "}
                          Total Hint Usages
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto text-dark-1"
                      >
                        190
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-xl-12">
            <div className="rounded-16 bg-white -dark-bg-dark-2 shadow-1 h-100 ">
              <div className="py-30 px-30">
                <div>
                  <div className="d-flex items-center py-10 px-0 border-bottom-light">
                    <h2 className="text-17 lh-1 fw-500">
                      Performance Insights and Key Takeaways
                    </h2>
                  </div>
                  <div className="col-xl-10 ">
                    <p className="mt-15">
                      This section offers insights into your CTF journey,
                      highlighting areas of strength, such as specific
                      categories or types of challenges where you performed
                      well. It also provides a breakdown of the number of
                      challenges attempted versus the number solved, along with
                      suggestions on areas to improve for future competitions.
                    </p>

                    <p className="mt-15">
                      Download detailed performance statistics and challenges
                      breakdown to assess progress and strategy moving forward.
                    </p>
                  </div>
                </div>

                <div className="mt-30">
                  <div className="rounded-8 px-25 py-25 ">
                    <div className="row">
                      <div className="col-10">
                        <div className="text-dark-1 ">
                          {" "}
                          <i
                            className="fa fa-bar-chart"
                            style={{ marginRight: "8px" }}
                          ></i>{" "}
                          Report Statistic
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-auto  "
                      >
                        <i
                          className="fa fa-download text-dark-1"
                          style={{ marginRight: "8px" }}
                        ></i>
                        <span className="text-dark-1">Download</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-90"></div>
        </div>
      </div>
      <FooterProfile />
    </div>
  );
}
