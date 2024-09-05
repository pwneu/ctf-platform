import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useEffect, useState } from "react";
import { campuses } from "../../../data/campuses"; 
import { Link } from "react-router-dom";
export default function CampusesTag() {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section className="layout-pt-lg layout-pb-lg bg-light-3">
      <div className="container">
        <div className="row y-gap-15 justify-between items-end">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Campuses of New Era University</h2>

              <p className="sectionTitle__text ">
              Uncover the vibrant campuses of New Era University, where each location delivers a distinctive and impactful learning experience designed to elevate your educational and professional growth.
              </p>
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex justify-center x-gap-15 items-center">
              <div className="col-auto">
                <button className="d-flex items-center text-24 arrow-left-hover js-events-slider-prev event-slide-prev">
                  <i className="icon  icon-arrow-left"></i>
                </button>
              </div>
              <div className="col-auto">
                <div className="pagination event-pagination -arrows js-events-slider-pagination"></div>
              </div>
              <div className="col-auto">
                <button className="d-flex items-center text-24 arrow-right-hover js-events-slider-next event-slide-next">
                  <i className="icon icon-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-60 lg:pt-40 js-section-slider">
          {showSlider && (
            <Swiper
              className="overflow-visible"
              // {...setting}
              modules={[Navigation, Pagination]}
              pagination={{
                el: ".event-pagination",
                clickable: true,
              }}
              navigation={{
                nextEl: ".event-slide-next",
                prevEl: ".event-slide-prev",
              }}
              // loop={true}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                // when window width is >= 576px
                450: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  // when window width is >= 992px
                  slidesPerView: 3,
                },
              }}
            >
              {campuses.slice(0, 6).map((elm, i) => (
                <SwiperSlide key={i}>
                  <div className="swiper-slide">
                    <div
                      className="eventCard -type-1"
                      data-aos="fade-left"
                      data-aos-duration={(i + 1) * 500}
                    >
                      <div className="eventCard__img">
                        <img src={elm.imgSrc} alt="image" />
                      </div>

                      <div className="eventCard__bg bg-white">
                        <div className="eventCard__content y-gap-10">
                          <div className="eventCard__inner">
                            <h4 className="eventCard__title text-17 fw-500">
                              <Link
                                className="linkCustom"
                                to={`/#/${elm.id}`}
                              >
                                {elm.title}
                              </Link>
                            </h4>
                            <div className="d-flex x-gap-15 pt-10">
                              <div className="d-flex items-center">
                                <div className="text-14">{elm.desc}</div>
                              </div>
                            </div>
                          </div>

                         
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="row pt-60 lg:pt-40">
          <div className="col-auto">
            <Link
              to="#"
              className="button -icon -outline-purple-1 text-purple-1 fw-500"
            >
                Discover More
              <span className="icon-arrow-top-right text-14 ml-10"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
