// import { RankPoints } from "../data/dashboard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

export default function UserProfileOld({
  totalSolveCount,
  totalHintUsagesCount,
  userDetails,
  setUserDetails,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [userRank, setUserRank] = useState();
  const [isDownloading, setIsDownloading] = useState(false);

  const navigate = useNavigate();

  const getMyEmail = async () => {
    try {
      const response = await api.get(`/identity/me/email`);
      setUserEmail(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setUserEmail("No Email");
    }
  };

  const getMyRank = async () => {
    try {
      const response = await api.get(`/play/me/rank`);
      setUserRank(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setUserRank(null);
    }
  };

  const generateStatsReport = async () => {
    if (isDownloading) return;
    try {
      setIsDownloading(true);
      const response = await api.get(`/play/me/stats`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "stats_report.html";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else 
      if (status === 400) {
        toast.error(error.response.data.message);
      } else if (status === 429) {
        toast.warn("Slow down on generating your user stats!");
      }
      else {
        toast.error(
          "Something went wrong generating user stats. Please try again later"
        );
      }
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const getMyDetails = async () => {
      try {
        const response = await api.get(`/identity/me/details`);
        setUserDetails(response.data);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 404) {
          toast.error(error.response.data.message || "User not found");
        } else {
          toast.error(
            "Something went wrong getting user details. Please try again later"
          );
        }
        setUserDetails(null);
      }
    };

    getMyDetails();
    getMyEmail();
    getMyRank();
  }, [setUserDetails]);

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
                {userDetails === undefined ? (
                  <div>Loading</div>
                ) : (
                  <>
                    <div className="text-28 fw-500 text-dark-1 mt-2">{`@${userDetails.userName}`}</div>
                    <div className="text-40 fw-500 text-dark-1 ">
                      {userDetails.fullName}
                    </div>
                    <div className="text-14 lh-1 mt-5">{userEmail}</div>
                  </>
                )}
              </div>
              {/* {RankPoints.slice(0, 4).map((elm, i) => (
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
              ))} */}
              <div className="col-xl-3 col-md-6">
                <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-1">
                  <div>
                    <div className="lh-1  items-center text-20 fw-500">
                      {"Rank"}
                    </div>
                    <div className="text-30 lh-2 fw-700 text-dark-1 mt-20">
                      {userRank === undefined
                        ? "Loading..."
                        : userRank?.position || "Unranked"}
                    </div>
                  </div>
                  <i className={`text-40 icon-bar-chart-2 text-black-2 `}></i>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-1">
                  <div>
                    <div className="lh-1  items-center text-20 fw-500">
                      {"Points"}
                    </div>
                    <div className="text-30 lh-2 fw-700 text-dark-1 mt-20">
                      {userRank === undefined
                        ? "Loading..."
                        : userRank?.points || "0"}
                    </div>
                  </div>
                  <i className={`text-40 icon-graduation-1 text-black-2 `}></i>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-1">
                  <div>
                    <div className="lh-1  items-center text-20 fw-500">
                      {"Total Solves"}
                    </div>
                    <div className="text-30 lh-2 fw-700 text-dark-1 mt-20">
                      {totalSolveCount}
                    </div>
                  </div>
                  <i className={`text-40 icon-person-3 text-black-2 `}></i>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-1">
                  <div>
                    <div className="lh-1  items-center text-20 fw-500">
                      {"Total Hint Usages"}
                    </div>
                    <div className="text-30 lh-2 fw-700 text-dark-1 mt-20">
                      {totalHintUsagesCount}
                    </div>
                  </div>
                  <i className={`text-40 icon-search text-black-2 `}></i>
                </div>
              </div>
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
        <button onClick={generateStatsReport} disabled={isDownloading}>
            {isDownloading ? 'Downloading...' : 'Download Stats Report'}
        </button>
      </div>
    </div>
  );
}
