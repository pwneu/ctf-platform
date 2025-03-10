import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "@/api";
import useAuth from "@/hooks/useAuth";

export default function UserProfileStatsReport() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const generateStatsReport = async () => {
    if (isDownloading) return;
    try {
      setIsDownloading(true);

      try {
        await api.get('/identity/me/details');
      } catch (error) {
        if (error?.response?.status === 404) {
          toast.error(error.response.data.message);
          return;
        }
        throw error;
      }

      const response = await api.get(`/play/me/stats`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `user-stats-report-${auth.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else if (status === 429) {
        toast.warn("Slow down on generating your user stats!");
      } else {
        toast.error(
          "Something went wrong generating user stats. Please try again later"
        );
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="dashboard__content">
        <div className="row y-gap-30 mt-0">
          <div className="col-xl-12">
            <div className="rounded-16 bg-white -dark-bg-dark-2  h-100 ">
              <div className="py-30 px-30">
                <div>
                  <div className="d-flex items-center py-10 px-0 border-bottom-light">
                    <h2 className="text-17 lh-2 fw-500">
                      Performance Insights and Key Takeaways
                    </h2>
                  </div>
                  <div className="col-xl-10 text-dark-1">
                    <p className="mt-15 ">
                      This section offers insights into your CTF journey,
                      highlighting areas of strength, such as specific
                      categories or types of challenges where you performed
                      well. It also provides a breakdown of the number of
                      challenges attempted versus the number solved, along with
                      suggestions on areas to improve for future competitions.
                    </p>

                    <p className="mt-2 ">
                      Download detailed performance statistics and challenges
                      breakdown to assess progress and strategy moving forward.
                    </p>
                  </div>
                </div>

                <div className="mt-30 border-bottom-light">
                  <div className="rounded-8 px-25 py-25  ">
                    <div className="row">
                      <div className="col-10 ">
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
                        {/* <span>Download</span> */}
                        <button
                          className="text-dark-1"
                          onClick={generateStatsReport}
                          disabled={isDownloading}
                        >
                          {isDownloading
                            ? "Downloading..."
                            : "Download Stats Report"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-90"></div> */}
        </div>
      </div>
    </>
  );
}
