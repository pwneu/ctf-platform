import { useEffect, useState, useRef } from "react";

export default function GeneralSantosBranch() {
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
  }, []);

  return (
    <section className="layout-pt-lg layout-pb-lg" ref={sectionRef}>
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div
            className={`col-xl-5 col-lg-6 col-md-9 lg:order-2 ${
              animate ? "fade-in-right" : ""
            }`}
          >
            <h3 className="text-20 lh-1 text-center">General Santos Branch</h3>
            <p className="mt-25 text-center">
              New Era University opened its New Era University – General Santos
              City Branch in June 1994, at first offering the Preschool
              Education Program. Elementary and Secondary Education Programs
              were opened soon after. It was on June 5, 1998, when the new
              school building situated in a half-hectare land area was
              inaugurated. The school is now fully equipped to implement the K
              to 12 program with Senior High School. NEU – GSC marked another
              significant event of its history in March 2018 upon receiving
              Government Recognition for the Bachelor of Science courses: Real
              Estate Management, Entrepreneurship, Accounting Technology, and
              Accountancy.
            </p>
          </div>
          <div
            className={`col-lg-5 lg:order-1 ${animate ? "slide-in-left" : ""}`}
          >
            <img
              className="w-1/1"
              src="/assets/img/campuses/badge/GeneralSantosBadge.svg"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
