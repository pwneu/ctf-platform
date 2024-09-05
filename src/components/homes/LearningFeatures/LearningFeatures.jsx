import gsap from "gsap";

import React, { useEffect } from "react";
import { learningPath } from "../../../data/learningPaths"; //DONE
export default function LearningFeatures() {
  useEffect(() => {
    const parallaxIt = () => {
      const target = document.querySelectorAll(".js-mouse-move-container");

      target.forEach((container) => {
        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = el.getAttribute("data-move");

          document.addEventListener("mousemove", (e) => {
            const relX = e.pageX - container.offsetLeft;
            const relY = e.pageY - container.offsetTop;

            gsap.to(el, {
              x:
                ((relX - container.offsetWidth / 2) / container.offsetWidth) *
                Number(movement),
              y:
                ((relY - container.offsetHeight / 2) / container.offsetHeight) *
                Number(movement),
              duration: 0.2,
            });
          });
        });
      });
    };

    parallaxIt();
  }, []);

  return (
    <section className="layout-pt-lg layout-pb-lg js-mouse-move-container">
      <div className="container">
        <div className="row y-gap-30 items-center">
          <div className="col-lg-6 order-2 order-lg-1">
            <h2 className="text-45 lg:text-40 md:text-30 text-dark-1">
              Unlock Your Cybersecurity
              <br className="xl:d-none" /> Potential with PWNEU CyberEduc
            </h2>
            <p className="text-dark-1 mt-20">
              Explore the key features of our upskilling
              <br className="lg:d-none" /> platform.
            </p>

            <div className="row y-gap-30 pt-60 lg:pt-40">
              {learningPath.map((elm, i) => (
                <div key={i} className="col-12">
                  <div className="featureIcon -type-1">
                    <div
                      className={`featureIcon__icon ${elm.iconBg && elm.iconBg
                        }`}
                    >
                      <img src={elm.iconSrc && elm.iconSrc} alt="icon" />
                    </div>

                    <div className="featureIcon__content ml-30 md:ml-20">
                      <h4 className="text-10 fw-560">{elm.title}</h4>
                      <p className="mt-5">
                        {elm.description.split(" ").length > 5 ? (
                          <>
                            {elm.description.split(" ").slice(0, 5).join(" ")}
                            <br className="lg:d-none" />
                            {elm.description.split(" ").slice(5).join(" ")}
                          </>
                        ) : (
                          elm.description
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6 order-1 order-lg-1">
            <div className="elements-image">
              <div className="elements-image__img1">
                <img
                  className="js-mouse-move"
                  data-move="10"
                  src="/assets/img/learningPaths/learning/owl_unlock.svg"
                  alt="image"
                />
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
