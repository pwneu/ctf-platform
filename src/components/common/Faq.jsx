import React, { useState } from "react"; 
import { faq } from "@/data/faq"; 
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
export default function Faq() {
  const [activeFaq, setActiveFaq] = useState(0);
  return (
    <section className="layout-pt-lg layout-pb-lg bg-light-4">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-12 col-lg-9 col-md-11">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">
                Frequently Asked Questions.
              </h2>

              <p className="sectionTitle__text ">
              Got questions? We’ve got answers! Check out our FAQs below for the most common queries.
              </p>
            </div>

            <div className="accordion -block text-left pt-50 lg:pt-90 js-accordion">
              {faq.map((elm, i) => (
                <div
                  onClick={() =>
                    setActiveFaq((pre) => (pre == elm.id ? 0 : elm.id))
                  }
                  key={i}
                  className={`accordion__item  ${
                    activeFaq == elm.id ? "is-active" : ""
                  }`}
                >
                  <div className="accordion__button">
                    <div className="accordion__icon">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="icon"
                        data-feather="plus"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="icon"
                        data-feather="minus"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                    </div>
                    <span className="text-17 fw-500 text-dark-1">
                      {elm.question}
                    </span>
                  </div>

                  <div
                    style={activeFaq == elm.id ? { maxHeight: "100px" } : {}}
                    className="accordion__content"
                  >
                    <div className="accordion__content__inner">
                      <p>{elm.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
