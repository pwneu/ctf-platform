import { coursesData } from "@/data/courses";
import { useState, useEffect } from "react";

import PinContent from "./PinContent";
import ResentSolves from "./ResentSolves";
const menuItems = [
  { id: 1, href: "#resent-solvers", text: "Resent Solvers ", isActive: true },
  { id: 2, href: "#download", text: "Download", isActive: false },
  { id: 2, href: "#hint", text: "Hints", isActive: false},
];

export default function Details({ id }) {
  const [pageItem, setPageItem] = useState(coursesData[0]);
  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    setPageItem(coursesData.filter((elm) => elm.id == id)[0] || coursesData[0]);
  }, [id]);

  return (
    <div id="js-pin-container" className="js-pin-container relative">
      <section className="page-header -type-5 bg-dark-1">
        <div className="page-header__bg">
          <div
            className="bg-image js-lazy"
            data-bg="img/event-single/bg.png"
          ></div>
        </div>

        <div className="container">
          <div className="page-header__content pt-90 pb-90">
            <div className="row y-gap-30 relative">
              <div className="col-xl-7 col-lg-8">
                <div>
                  <h1 className="text-30 lh-14 text-white pr-60 lg:pr-0">
                    {pageItem.title}
                  </h1>
                </div>

                <p className="col-xl-9 mt-20 ">
                  I’m here for you, always—like a ghost. But not just any ghost…
                </p>

                <div className="mt-30 d-flex x-gap-15 y-gap-10 pb-20">
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-green-1 text-dark-1 fw-400">
                      Web Exploitation
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">
                      Solvers: 20
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-purple-1 text-white fw-400">
                      Points: 20
                    </div>
                  </div>
                </div>
                <form
                className="contact-form respondForm__form text-white row y-gap-20 pt-30"
              >
                <div className="col-lg-9  text-white ">
                  <input
                    required
                    type="text"
                    name="PWNEU{FLAG}"
                    placeholder="PWNEU{FLAG}"
                    autoComplete="given-name"
                  />
                </div>
              </form>

              </div>
            </div>
          </div>
        </div>
      </section>
      <PinContent pageItem={pageItem} />

      <section className="pt-30 layout-pb-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="pt-25 pb-30 px-30 ">
                <div className="tabs -active-purple-2 js-tabs pt-0">
                  <div className="tabs__controls d-flex js-tabs-controls">
                    {menuItems.map((elm, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTab(elm.id)}
                        className={`tabs__button js-tabs-button js-update-pin-scene ${
                          i != 0 ? "ml-30" : ""
                        } ${activeTab == elm.id ? "is-active" : ""} `}
                        type="button"
                      >
                        {elm.text}
                      </button>
                    ))}
                  </div>

                  <div className="tabs__content   js-tabs-content">
                    <div
                      className={`tabs__pane -tab-item-1 ${
                        activeTab == 1 ? "is-active" : ""
                      } `}
                    >
                      <ResentSolves />
                    </div>

                    {/* <div
                        className={`tabs__pane -tab-item-2 ${
                          activeTab == 2 ? "is-active" : ""
                        } `}
                      >
                        <Leaderboard />
                      </div>

                      */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
