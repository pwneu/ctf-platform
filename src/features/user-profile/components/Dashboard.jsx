import { cardboards } from "../data/cardboards";
import Charts from "./Charts";
import PieChartComponent from "./PieCharts";
import FooterProfile from "@/layout/footers/FooterProfile";

export default function Dashboard() {
  return (
    <div className="dashboard__main ">
      <div className="dashboard__content bg-dark-account">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700 text-white">
              Sharon Grace T. Hangaan
            </h1>
            <div className="mt-10 text-white">@Iwontheflag</div>
          </div>
        </div>

        <div className="row y-gap-30">
          {cardboards.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500 text-dark-1">{elm.title}</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                    {elm.value}
                  </div>
                </div>
                <i className={`text-40 text-dark-1 ${elm.iconClass} `}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
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
