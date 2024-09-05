import gsap from "gsap"; 

import React, { useEffect } from "react";

export default function AuthImageMove() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
    <div className="form-page__img bg-dark-account " >
      <div className="form-page-composition">
        <img
          style={{ width: "100%" }}
          data-move="50"
          className="js-mouse-move"
          src="/assets/img/login/WelcomeNote2.svg"
          alt="bg"
        />
      </div>

      
    </div>
  );
}
