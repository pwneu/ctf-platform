// import { cardboards } from "../data/cardboards";
import Charts from "../components/Charts";
import PieChartComponent from "../components/PieCharts";
import FooterProfile from "@/layout/footers/FooterProfile";

import UserProfileOverview from "../components/UserProfileOverview";
import UserProfileStatsReport from "../components/UserProfileStatsReport";
// import UserProfileGraph from "../components/UserProfileGraph";

export default function UserProfileDashboard() {
  return (
    <div className="dashboard__main ">
      <UserProfileOverview />
      <UserProfileStatsReport />

      {/* <UserProfileGraph /> */}
      <div className="col-xl-12 col-md-6">
        <div className="rounded-16 mt-30 bg-white -dark-bg-dark-1  h-100">
          <div className="d-flex justify-between items-center py-20 px-30 ">
            <h2 className="text-17 lh-1 fw-500">Graph Activity</h2>
            <div className="">
              <div
                id="ddtwobutton"
                onClick={() => {
                  document
                    .getElementById("ddtwobutton")
                    .classList.toggle("-is-dd-active");
                  document
                    .getElementById("ddtwocontent")
                    .classList.toggle("-is-el-visible");
                }}
                className="dropdown js-dropdown js-category-active"
              ></div>
            </div>
          </div>
          <div className="py-40 px-30">
            <Charts />
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-md-6 mt-30">
        <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
          <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
            <div className="">
              <div
                id="dd3button"
                onClick={() => {
                  document
                    .getElementById("dd3button")
                    .classList.toggle("-is-dd-active");
                  document
                    .getElementById("dd3content")
                    .classList.toggle("-is-el-visible");
                }}
                className="dropdown js-dropdown js-category-active"
              >
                <div
                  className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                  data-el-toggle=".js-category-toggle"
                  data-el-toggle-active=".js-category-active"
                >
                  <span className="js-dropdown-title">Web Exploitation</span>
                </div>
              </div>
            </div>
          </div>
          <div className="py-40 px-30">
            <PieChartComponent />
          </div>
        </div>

        <div className="mt-90"> </div>

        <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
          <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
            <div className="">
              <div
                id="dd3button"
                onClick={() => {
                  document
                    .getElementById("dd3button")
                    .classList.toggle("-is-dd-active");
                  document
                    .getElementById("dd3content")
                    .classList.toggle("-is-el-visible");
                }}
                className="dropdown js-dropdown js-category-active"
              >
                <div
                  className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                  data-el-toggle=".js-category-toggle"
                  data-el-toggle-active=".js-category-active"
                >
                  <span className="js-dropdown-title">Forensics</span>
                </div>
              </div>
            </div>
          </div>
          <div className="py-40 px-30">
            <PieChartComponent />
          </div>
        </div>
      </div>
      <div className="mt-90"></div>
      <FooterProfile />
    </div>
  );
}
