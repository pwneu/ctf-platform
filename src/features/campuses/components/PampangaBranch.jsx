import { useEffect, useState, useRef } from "react";

export default function PampangaBranch() {
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
            className={`col-lg-5 lg:order-1 ${animate ? "slide-in-left" : ""}`}
          >
            <img
              className="w-1/1"
              src="/assets/img/campuses/badge/PampangaBadge.svg"
              alt="image"
            />
          </div>
          <div
            className={`col-xl-5 col-lg-6 col-md-9 lg:order-2 ${
              animate ? "fade-in-right" : ""
            }`}
          >
            <h3 className="text-20 lh-1 text-center">Pampanga Branch</h3>
            <p className="mt-25 text-center">
              New Era University&#39;s first branch outside Metro Manila is
              situated in a sprawling six-hectare campus in the City of San
              Fernando, Pampanga. New Era University &ndash; Pampanga City
              Branch was established on June 25, 1994. The school initially
              offered Preparatory and Elementary Education Programs followed by
              the Secondary Education Program and is now offering Collegiate
              Programs in the branch &ndash; Bachelor of Elementary Education
              and BS Business Administration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
