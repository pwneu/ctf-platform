import { api } from "@/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserProfileOverview() {
  const [userEmail, setUserEmail] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [userRank, setUserRank] = useState();
  const [userPlayData, setUserPlayData] = useState();

  useEffect(() => {
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

    const getMyPlayData = async () => {
      try {
        const response = await api.get(`/play/me/data`);
        setUserPlayData(response.data);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 404) {
          toast.error(error.response.data.message || "User not found");
        } else {
          toast.error(
            "Something went wrong getting user play data. Please try again later"
          );
        }
        setUserPlayData(null);
      }
    };

    getMyDetails();
    getMyEmail();
    getMyRank();
    getMyPlayData();
  }, []);

  return (
    <>
      <div className="dashboard__content bg-dark-account">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            {userDetails === undefined ? (
              <div>Loading</div>
            ) : (
              <>
                <div className="text-28 fw-500 text-dark-1 mt-2">{`@${userDetails.userName}`}</div>
                <h1 className="text-30 lh-12 fw-700 text-white">
                  {userDetails.fullName}
                </h1>
                <div className="mt-10 text-white">{`@${userDetails.userName}`}</div>
                <div className="mt-10 text-white">{`${userEmail}`}</div>
              </>
            )}
          </div>
        </div>

        <div className="row y-gap-30">
          {/* {cardboards.map((elm, i) => (
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
          ))} */}
          <div className="col-xl-3 col-md-6">
            <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
              <div>
                <div className="lh-1 fw-500 text-dark-1">Rank</div>
                <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                  {userRank === undefined
                    ? "Loading..."
                    : userRank?.position || "Unranked"}
                </div>
              </div>
              <i
                className={`text-40 text-dark-1 text-40 icon-bar-chart-2 text-black-2`}
              ></i>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
              <div>
                <div className="lh-1 fw-500 text-dark-1">Points</div>
                <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                  {userRank === undefined
                    ? "Loading..."
                    : userRank?.points || "0"}
                </div>
              </div>
              <i
                className={`text-40 text-dark-1 text-40 icon-graduation-1 text-black-2`}
              ></i>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
              <div>
                <div className="lh-1 fw-500 text-dark-1">Total Solves</div>
                <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                  {userPlayData === undefined
                    ? "Loading..."
                    : userPlayData?.totalSolves || "0"}
                </div>
              </div>
              <i
                className={`text-40 text-dark-1 text-40 icon-person-3 text-black-2`}
              ></i>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
              <div>
                <div className="lh-1 fw-500 text-dark-1">Total Hint Usages</div>
                <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                  {userPlayData === undefined
                    ? "Loading..."
                    : userPlayData?.totalHintUsages || "0"}
                </div>
              </div>
              <i
                className={`text-40 text-dark-1 text-40 icon-search text-black-2`}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
