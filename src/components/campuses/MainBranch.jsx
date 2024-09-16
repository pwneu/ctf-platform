import React, { useEffect, useState, useRef } from "react";

export default function MainBranch() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true); 
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.3, 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="layout-pt-lg layout-pb-lg" ref={sectionRef}>
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className={`col-lg-5 lg:order-1 ${animate ? "slide-in-left" : ""}`}>
            <img
              className="w-1/1"
              src="/assets/img/campuses/badge/MainBadge.svg"
              alt="image"
            />
          </div>
          <div className={`col-xl-5 col-lg-6 col-md-9 lg:order-2 ${animate ? "fade-in-right" : ""}`}>
            <h3 className="text-20 lh-1 text-center">Main Branch</h3>
            <p className="mt-25 text-center">
              The New Era Educational Institute (NEEI) was formally opened on
              June 17, 1975 by virtue of GPR No. 232, Series of 1975 issued by
              the Ministry of Education, Culture and Sports (now known as the
              Department of Education). NEEI initially offered secondary
              education in Echague (now Carlos Palanca Street), Quiapo, Manila.
              On June 6, 1977, pursuant to the requirements of the Corporation
              Law (Republic Act 1459), NEEI was declared as a private,
              non-stock, non-profit, non-sectarian educational institution. The
              year 1978 saw the opening of NEEI’s collegiate course offerings at
              the Evangelical College (EVCO) building along Don Mariano Marcos
              (now Commonwealth) Avenue, Diliman, Quezon City. Upon the
              conferment of degrees to 12 collegiate graduates in 1981, the
              school became known as the New Era College (NEC). On May 10, 1986,
              the permanent building for NEC was inaugurated, situated in a wide
              expanse of land along St. Joseph Street, Milton Hills Subdivision,
              Diliman, (now known as #9 Central Avenue, New Era) Quezon City.
              NEC was granted 'University' status by the Commission on Higher
              Education (CHEd) on June 30, 1995, thus adopting its present name,
              New Era University.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
