import { useEffect, useState, useRef } from "react";

export default function GoalsAndObjectives() {
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
    <section className="layout-pb-lg" ref={sectionRef}>
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div
            className={`col-lg-5 lg:order-1 ${animate ? "fade-in-right" : ""}`}
          >
            <img
              className="w-1/1"
              src="/assets/img/about/goalsandobjectives/Goalsandobjectives_Card.svg"
              alt="image"
            />
          </div>
          <div
            className={`col-xl-5 col-lg-6 col-md-9 lg:order-2 ${
              animate ? "slide-in-left" : ""
            }`}
          >
            <h3 className="text-10 lh-1 text-center">Vision</h3>
            <p className="mt-25 text-left">
              Our goal is to provide value-laden cybersecurity education that
              fosters the total development of individuals by offering curricula
              that are responsive to current needs, optimizing learning through
              innovative instructional methods and resources, conducting
              impactful research, extending outreach services that promote
              self-reliance, facilitating access to non-conventional education
              programs, developing servant leaders among staff and faculty, and
              ultimately producing God-fearing, competent, and disciplined
              cybersecurity professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
