// import { hintusage } from "../data/hintusage";
import FooterProfile from "@/layout/footers/FooterProfile";
import { api } from "@/api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserProfileHintUsages() {
  const navigate = useNavigate();
  const [userHintUsages, setUserHintUsages] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [page, setPage] = useState(0); // Initial of 0 so useEffect will work
  const [requestedPage, setRequestedPage] = useState(1); // Track requested page
  const [pageSize] = useState(20);
  const [totalHintUsagesCount, setTotalHintUsagesCount] = useState(0);

  const fetchUserHintUsages = useCallback(
    async (pageNumber) => {
      setIsBusy(true);

      const params = {
        sortBy: "usedat",
        sortOrder: "desc",
        page: pageNumber,
        pageSize,
      };

      try {
        const response = await api.get(`/play/me/hintUsages`, { params });
        setUserHintUsages(response.data.items);
        setTotalHintUsagesCount(response.data.totalCount);
        setPage(pageNumber); // Only update page after a successful fetch
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 429) {
          toast.warn("Slow down!");
        } else {
          toast.error(
            "Something went wrong getting user hint usages. Please try again later."
          );
        }
        // Revert requestedPage back to the last successful page if there's an error
        setRequestedPage(page);
      } finally {
        setIsBusy(false);
      }
    },
    [navigate, pageSize, page]
  );

  useEffect(() => {
    if (requestedPage !== page) {
      fetchUserHintUsages(requestedPage);
    }
  }, [requestedPage, fetchUserHintUsages, page]);

  const handlePagination = (direction) => {
    if (isBusy) return;
    setRequestedPage((prev) =>
      direction === "next" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content">
        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white h-100">
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
                      {/* <div className="col-lg-5">
                        <div className="text-white">Hint Id</div>
                      </div> */}
                      <div className="col-lg-5">
                        <div className="text-white">Challenge Id</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-white">Challenge Name</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-white">Point Deduction</div>
                      </div>
                      <div className="col-lg-3">
                        <div className="text-white">Used At</div>
                      </div>
                    </div>
                  </div>

                  {userHintUsages.length > 0 ? (
                    userHintUsages.map((userHintUsage) => (
                      <Link
                        key={userHintUsage.challengeId}
                        to={`/play/${userHintUsage.challengeId}`}
                        // className="px-30 border-bottom-light"
                        className="px-30"
                      >
                        <div className="row x-gap-0 items-center py-15">
                          <div className="col-lg-5">
                            <div className="d-flex items-center">
                              <div className="ml-0">
                                <div className="lh-12">
                                  {userHintUsage.challengeId}
                                </div>
                                {/* <div className="text-14 lh-12 mt-5">
                                  Deduction Points:{" "}
                                  {userHintUsage.deduction}
                                </div> */}
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-2">
                            {userHintUsage.challengeName}
                          </div>
                          <div className="col-lg-2">
                            {userHintUsage.deduction}
                          </div>
                          <div className="col-lg-3">
                            {new Date(userHintUsage.usedAt).toLocaleString()}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No hint usages found.
                      </td>
                    </tr>
                  )}

                  <div className="text-center mt-3">
                    <p>Total Hint Usages: {totalHintUsagesCount}</p>
                    <p>
                      Page: {page} of{" "}
                      {Math.ceil(totalHintUsagesCount / pageSize)}
                    </p>
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={() => handlePagination("prev")}
                        disabled={isBusy || page <= 1}
                        className={`custom-button me-2 ${
                          isBusy || page <= 1 ? "disabled" : ""
                        }`}
                      >
                        <FaArrowLeft className="me-1" /> Previous
                      </button>
                      <button
                        onClick={() => handlePagination("next")}
                        disabled={
                          isBusy ||
                          page >= Math.ceil(totalHintUsagesCount / pageSize)
                        }
                        className={`custom-button ms-1 ${
                          isBusy ||
                          page >= Math.ceil(totalHintUsagesCount / pageSize)
                            ? "disabled"
                            : ""
                        }`}
                      >
                        Next <FaArrowRight className="ms-1" />
                      </button>
                    </div>
                  </div>

                  {/* {hintusage.map((elm, i) => (
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
                  ))} */}
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
