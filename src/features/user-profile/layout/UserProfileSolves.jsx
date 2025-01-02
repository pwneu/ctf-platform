// import { solveoverview } from "../data/solveoverview";
import FooterProfile from "@/layout/footers/FooterProfile";
import { api } from "@/api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserProfileSolves() {
  const navigate = useNavigate();
  const [userSolves, setUserSolves] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [page, setPage] = useState(0); // Initial of 0 so useEffect will work
  const [requestedPage, setRequestedPage] = useState(1); // Track requested page
  const [pageSize] = useState(20);
  const [totalSolveCount, setTotalSolveCount] = useState(0);

  const fetchUserSolves = useCallback(
    async (pageNumber) => {
      setIsBusy(true);

      const params = {
        sortBy: "solvedat",
        sortOrder: "desc",
        page: pageNumber,
        pageSize,
      };

      try {
        const response = await api.get("/play/me/solves", { params });
        setUserSolves(response.data.items);
        setTotalSolveCount(response.data.totalCount);
        setPage(pageNumber); // Only update page after successful fetch
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          navigate("/login");
        } else if (status === 429) {
          toast.warn("Slow down!");
        } else {
          toast.error("Error fetching user solves. Please try again later");
        }
        // Revert requestedPage back to page if there was an error
        setRequestedPage(page);
      } finally {
        setIsBusy(false);
      }
    },
    [navigate, pageSize, page]
  );

  useEffect(() => {
    if (requestedPage !== page) {
      fetchUserSolves(requestedPage);
    }
  }, [requestedPage, fetchUserSolves, page]);

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

                  {userSolves.length > 0 ? (
                    userSolves.map((userSolve) => (
                      <Link
                        key={userSolve.challengeId}
                        to={`/play/${userSolve.challengeId}`}
                        // className="px-30 border-bottom-light"
                        className="px-30"
                      >
                        <div className="row x-gap-10 items-center py-15">
                          <div className="col-lg-5">
                            <div className="d-flex items-center">
                              <div className="ml-0">
                                <div className="fw-20">
                                  {userSolve.challengeId}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-2">
                            {userSolve.challengeName}
                          </div>
                          <div className="col-lg-2">{userSolve.points}</div>
                          <div className="col-lg-3">
                            {new Date(userSolve.solvedAt).toLocaleString()}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        {/* TODO -- Design or remove */}
                        No user solves found.
                      </td>
                    </tr>
                  )}

                  <div className="text-center mt-3">
                    <p>Total Solves: {totalSolveCount}</p>
                    <p>
                      Page: {page} of {Math.ceil(totalSolveCount / pageSize)}
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
                          page >= Math.ceil(totalSolveCount / pageSize)
                        }
                        className={`custom-button ms-1 ${
                          isBusy ||
                          page >= Math.ceil(totalSolveCount / pageSize)
                            ? "disabled"
                            : ""
                        }`}
                      >
                        Next <FaArrowRight className="ms-1" />
                      </button>
                    </div>
                  </div>

                  {/* {solveoverview.map((elm, i) => (
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
