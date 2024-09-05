import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { instractors } from "@/data/instractors"; 
import { Link } from "react-router-dom";
export default function Mentorship() {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row y-gap-50">
          <div className="col-xl-3 col-lg-4 col-md-8">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">
                Learn from the Best Instructors
              </h2>

              <p className="sectionTitle__text ">
               Gain knowledge from leading professionals in the College of Informatics and Computing Studies and the College of Criminology.
              </p>
            </div>


          </div>

          <div className="offset-xl-1 col-lg-8">
            <div className="overflow-hidden js-section-slider">
              {showSlider && (
                <Swiper
                  // {...setting}

                  modules={[Navigation, Pagination]}
                  pagination={{
                    el: ".pagination-instractors-eight",
                    clickable: true,
                  }}
                  navigation={{
                    nextEl: ".category-six-right",
                    prevEl: ".category-six-left",
                  }}
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    // when window width is >= 576px
                    450: {
                      slidesPerView: 1,
                    },
                    // when window width is >= 768px
                    600: {
                      slidesPerView: 2,
                    },
                    900: {
                      slidesPerView: 3,
                    },
                    1200: {
                      // when window width is >= 992px
                      slidesPerView: 3,
                    },
                  }}
                  loop={true}
                >
                  {instractors.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <div className="swiper-slide">
                        <div className="d-flex flex-column items-center">
                          <div>
                            <img src={elm.image} alt="image" />
                          </div>
                          <div className="d-flex items-center mt-20">
                          </div>
                          <h5 className="text-17 fw-500 mt-10">
                           {elm.name}
                          </h5>                       
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              <div className="d-flex justify-center x-gap-15 items-center pt-60 lg:pt-40">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
