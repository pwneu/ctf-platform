import React, { useEffect, useState, useRef } from "react";

export default function Vision() {
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
    <section className="layout-pb-lg" ref={sectionRef}>
      <div className="container">
        <div className="row y-gap-30 justify-between items-center"> 
          <div className={`col-xl-5 col-lg-6 col-md-9 lg:order-2 ${animate ? "fade-in-right" : ""}`}>
            <h3 className="text-10 lh-1 text-center">Vision</h3>
            <p className="mt-25 text-left">
            We are committed to providing exceptional cybersecurity education
              anchored on Christian values, with the aim of developing graduates
              who are not only experts in their field but also embody integrity,
              discipline, and a deep sense of service to humanity. Our mission
              is to empower learners with the knowledge, skills, and ethical
              grounding necessary to protect and secure the digital world,
              bringing honor and glory to God through their professional and
              personal conduct.
            </p>
          </div>
          <div className={`col-lg-5 lg:order-1 ${animate ? "slide-in-left" : ""}`}>
            <img
              className="w-1/1"
               src="/assets/img/about/vision/Vision_Card.svg"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
