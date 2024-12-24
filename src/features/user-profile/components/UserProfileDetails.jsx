import { api } from "@/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UserProfileDetails({ activeTab }) {
  const [userEmail, setUserEmail] = useState("");
  const [userDetails, setUserDetails] = useState();

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
  }, []);

  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""} `}
    >
      <div className=" pt-3">
        <form className="contact-form row y-gap-30">
          <div className="col-md-7">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Id</label>

            <input disabled type="text" value={userDetails?.id || ""} />
          </div>

          <div className="col-md-7">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Full Name
            </label>

            <input disabled type="text" value={userDetails?.fullName || ""} />
          </div>

          <div className="col-md-7">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Username
            </label>

            <input disabled type="text" value={userDetails?.userName || ""} />
          </div>

          <div className="col-md-7">
            <label
              className="text-16 lh-1 fw-500 text-dark-1 mb-10"
              type="password"
            >
              Email
            </label>

            <input disabled type="text" value={userEmail || ""} />
          </div>

          <div className="col-md-7">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Date Created
            </label>

            <input
              disabled
              type="text"
              value={new Date(userDetails?.createdAt).toLocaleString() || ""}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
