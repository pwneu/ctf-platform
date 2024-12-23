import { useState } from "react";
import EditProfile from "./EditProfile";
import Password from "./Password";

import FooterProfile from "@/layout/footers/FooterProfile";

const buttons = ["Profile", "Change Password"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-black">
        <div className="row pb-50 ">
          <div className="col-auto">
            <h1 className="text-30 text-white lh-12 fw-700">Settings</h1>
            <div className="mt-10 text-white">
              You can update your password and view your profile details here.
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-1 h-100">
              <div className="tabs -active-purple-2 js-tabs pt-0">
                <div className="tabs__controls d-flex  x-gap-30 y-gap-20 flex-wrap items-center pt-20 px-30 border-bottom-light js-tabs-controls">
                  {buttons.map((elm, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i + 1)}
                      className={`tabs__button text-light-1 js-tabs-button ${
                        activeTab == i + 1 ? "is-active" : ""
                      } `}
                      type="button"
                    >
                      {elm}
                    </button>
                  ))}
                </div>

                <div className="tabs__content py-30 px-30 js-tabs-content">
                  <EditProfile activeTab={activeTab} />
                  <Password activeTab={activeTab} />
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