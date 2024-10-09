import { useEffect, useState, useRef } from "react";

export default function BatangasBranch() {
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
            <h3 className="text-10 lh-1 text-center">Batangas Branch</h3>
            <p className="mt-25 text-center">
              As part of the celebration of New Era University&apos;s 25th
              anniversary, the New Era University – Lipa City Branch was
              established on May 5, 2000 in Batangas. The school, located in a
              four-hectare land, initially offered Preschool and Elementary
              Education. The Secondary Education Program, the K to 12 Curriculum
              with the Senior High School Program, and the School of Graduate
              Studies (SGS) were implemented accordingly. Recently, NEU – Lipa
              held the launching of the iOS Sign Language Application and
              Certification Program for Sign Language Interpreters. Adding to
              its victories, was the granting of government recognition for the
              Bachelor of Science courses: Accountancy, Accounting Technology,
              Real Estate Management, and Entrepreneurship as well as the newly
              applied courses: BS Computer Science, BS Computer Engineering,
              Bachelor of Technical-Vocational Teacher Education, and BS
              Psychology.
            </p>
          </div>
          <div
            className={`col-lg-5 lg:order-1 ${animate ? "slide-in-left" : ""}`}
          >
            <img
              className="w-1/1"
              src="/assets/img/campuses/badge/BatangasBadge.svg"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
