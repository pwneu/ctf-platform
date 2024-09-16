import React, { useEffect, useState, useRef } from "react";

export default function RizalBranch() {
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
              src="/assets/img/campuses/badge/RizalBadge.svg"
              alt="image"
            />
          </div>

          <div className={`col-xl-5 col-lg-6 col-md-9 lg:order-2 ${animate ? "fade-in-right" : ""}`}>
            <h3 className="text-10 lh-1 text-center">Rizal Branch</h3>
            <p className="mt-25 text-center">
              The New Era University – Rizal Branch is the fifth and newest
              branch of the University. The campus occupies a fifty-hectare
              tract of hilly land in Pinugay, Baras, Rizal close to the foot of
              the majestic Sierra Madre Mountain Range and near the famous
              limestone formation conservation area, Masungi Georeserve. The
              campus' terrain ranges from flat to undulating to sloping, which
              are either open or covered with trees. A stream also traverses the
              campus. On June 30, 2017, the groundbreaking ceremony of the
              two-story main building of the campus was held. The branch was
              granted government recognition by the Commission on Higher
              Education (CHED) on March 7, 2022 and the pioneer batch under the
              Bachelor of Science in Agriculture program held their first
              official class on January 7, 2019.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
