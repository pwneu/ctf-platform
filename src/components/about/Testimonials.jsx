import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ExpertTestimonials } from "@/data/tesimonials";
import { useRef, useEffect, useState } from "react";

export default function Testimonials({ backgroundComponent }) {
  const swiperRef = useRef(null);
  const [setCurrentSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // Set the initial slide to index 0
    }
  }, []);

 

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex);

    if (swiper.activeIndex >= 5) {
      setCurrentSlideIndex(swiper.activeIndex - 5);
    }
  };

  return (
    <section className="layout-pt-lg layout-pb-lg section-bg">
      <div
        className={`section-bg__item  ${
          backgroundComponent ? "bg-white-two" : "bg-light-6"
        }`}
      ></div>

      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Testimonials</h2>

              <p className="sectionTitle__text ">
                10,000+ unique online course list designs
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-center pt-60">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="overflow-hidden js-testimonials-slider">
              {showSlider && (
                <Swiper
                  className="overflow-visible"
                  // {...setting}
                  modules={[Navigation, Pagination]}
                  loop={true}
                  spaceBetween={4}
                  speed={1000}
                  slidesPerView={1}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper; // Store the Swiper instance in the ref
                  }}
                  onSlideChange={handleSlideChange}
                >
                  {ExpertTestimonials.map((elm, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <div className="swiper-slide h-100">
                        <div className="testimonials -type-2 text-center">
                          <div className="testimonials__icon">
                          </div>
                          <div className="testimonials__text md:text-20 fw-500 text-dark-1">
                            {elm.text}
                          </div>
                          <div className="testimonials__author">
                            <h5 className="text-17 lh-15 fw-500">
                              {elm.author}
                            </h5>
                            <div className="mt-5">{elm.position}</div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
