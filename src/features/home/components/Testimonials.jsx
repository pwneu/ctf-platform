import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper"; // Include Autoplay module
import { Swiper, SwiperSlide } from "swiper/react";
// import ModalVideo from "@/components/ModalVideo";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  // const [isOpen, setIsOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <>
      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-xl-6 col-lg-5 col-md-9">
              <h2 className="text-30 lh-13">
                What <span style={{ color: "#007C17" }}>Our Students</span>
                <br />
                Have To Say
              </h2>
              <p className="mt-15">
                Our students consistently praise the innovative curriculum and
                supportive learning environment that help them excel in their
                studies. They appreciate the hands-on approach and the
                real-world skills they gain, which prepare them for successful
                careers.
              </p>

              <div
                className="pt-60 lg:pt-50 pr-5 overflow-hidden js-section-slider"
                data-aos="fade-left"
                data-aos-duration={1000}
              >
                {showSlider && (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]} // Add Autoplay module
                    pagination={{
                      el: ".pagination-testimonials-eight",
                      clickable: true,
                    }}
                    navigation={{
                      nextEl: ".right-testimonials-eight",
                      prevEl: ".left-testimonials-eight",
                    }}
                    spaceBetween={30}
                    slidesPerView={1}
                    className="overflow-visible"
                    autoplay={{
                      delay: 8000, // Auto-swipes every 3 seconds
                      disableOnInteraction: false, // Keeps autoplay even after user interacts with the slider
                    }}
                    loop={true} // Ensures continuous looping of slides
                  >
                    {testimonials.slice(0, 8).map((elm, i) => (
                      <SwiperSlide key={i}>
                        <div className="swiper-slide">
                          <div className="pt-40 pb-30 px-40 border-light rounded-8">
                            <div className="testimonials__content">
                              <h4 className="text-18 fw-500 text-orange-1">
                                {elm.comment}
                              </h4>
                              <p className="lh-2 fw-500 mt-15 mb-30">
                                “{elm.description}”
                              </p>

                              <div className="row x-gap-20 y-gap-20 items-center border-top-light pt-15">
                                <div className="col-auto">
                                  <div className="lh-12 fw-700 text-dark-1 ">
                                    {elm.name}
                                  </div>
                                  <div className="text-13 lh-1 mt-5">
                                    {elm.position}
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


                {/* Pagination for Testimonials
                <div className="d-flex x-gap-15 items-center pt-30">
                  <div className="col-auto">
                    <button className="d-flex items-center text-24 arrow-left-hover js-prev left-testimonials-eight">
                      <i className="icon icon-arrow-left"></i>
                    </button>
                  </div>
                  <div className="col-auto">
                    <div className="pagination -arrows js-pagination pagination-testimonials-eight"></div>
                  </div>
                  <div className="col-auto">
                    <button className="d-flex items-center text-24 arrow-right-hover js-next right-testimonials-eight">
                      <i className="icon icon-arrow-right"></i>
                    </button>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="composition -type-7">
                <div className="-el-1">
                  <img
                    className="w-1/1"
                    src="/assets/img/testimonials/testimonialCard.png"
                    alt="image"
                  />
                </div>

                {/* <div className="-el-2" onClick={() => setIsOpen(true)}>
                  <div
                    style={{ cursor: "pointer" }}
                    className="d-flex items-center justify-center bg-white size-90 rounded-full js-gallery"
                    data-gallery="gallery1"
                  >
                    <div className="icon-play text-30"></div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <ModalVideo
        videoId={"XQtilPmhgUs"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}
    </>
  );
}
