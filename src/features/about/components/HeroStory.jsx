import "swiper/css";
import "swiper/css/pagination";
import { feature } from "@/data/herostory";
import { slidesData } from "@/data/herostory";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper"; // Import Autoplay module
import { useEffect, useState } from "react";

export default function HeroStory() {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section className="mainSlider -type-1 js-mainSlider customizedHeroBackground">
      <div className="swiper-wrapper-two">
        {showSlider && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} // Add Autoplay module
            navigation={{
              nextEl: ".hero-slider-next",
              prevEl: ".hero-slider-prev",
            }}
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
              450: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1200: {
                slidesPerView: 1,
              },
            }}
            speed={1200}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            onSlideChange={() => console.log("Slide changed!")}
          >
            {slidesData.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="swiper-slide hightFull">
                  <div className="mainSlider__bg">
                    <div
                      className="bg-image js-lazy customedBg"
                      style={{ backgroundImage: `url(${item.bgImage})` }}
                    ></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-9 col-lg-8">
            <div
              className="mainSlider__content"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h1 className="mainSlider__title text-white">
                Step into Cybersecurity Mastery with{" "}
                <span className="text-green-1">New Era University</span>
              </h1>

              <p className="mainSlider__text text-white">
                Elevate your cybersecurity expertise with New Era University’s
                cutting-edge programs. Our immersive learning experiences,
                crafted by industry-leading experts and dedicated teams, are
                designed to equip you with the skills needed to excel in a
                rapidly evolving field. Join us and collaborate with our teams
                to turn your passion for cybersecurity into mastery.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-20 justify-center mainSlider__items">
          {feature.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-4 col-sm-6">
              <div className="mainSlider-item text-center">
                <img src={elm.imgSrc} alt="icon" />
                <h4 className="text-20 fw-500 lh-18 text-white mt-8">
                  {elm.title}
                </h4>
                <p className="text-15 text-white">{elm.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="swiper-prev hero-slider-prev button -white-20 text-white size-60 rounded-full d-flex justify-center items-center js-prev">
        <i className="icon icon-arrow-left text-24"></i>
      </button>

      <button className="swiper-next hero-slider-next button -white-20 text-white size-60 rounded-full d-flex justify-center items-center js-next">
        <i className="icon icon-arrow-right text-24"></i>
      </button>
    </section>
  );
}
