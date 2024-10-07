import gsap from "gsap";
import { Link } from "react-router-dom";
import { ShapeRendering } from "../../styles/index"; 
import { useEffect } from "react";

const masthead_info = [
  {
    id: 1,
    icon: "/assets/img/homehero/icons/Innovators_icon.svg",
    text: "A Community of Innovators",
  },
  {
    id: 2,
    icon: "/assets/img/homehero/icons/EdgeTraining_icon.svg",
    text: "Cutting-Edge Training",
  },
  {
    id: 3,
    icon: "/assets/img/homehero/icons/RealWorld _icon.svg",
    text: "Real-World Challenges",
  },
  {
    id: 4,
    icon: "/assets/img/homehero/icons/Certifications_icon.svg",
    text: "Certifications & Recognition",
  },
  {
    id: 5,
    icon: "/assets/img/homehero/icons/Career_icon.svg",
    text: "Career Development Resources",
  },
];

const hero_content = {
  title: (
    <>
      Unleash Your Potential and{" "}
      <span style={{ textDecoration: "underline", color: "#cff721" }}>
        Secure
      </span>{" "}
      the future
    </>
  ),
  info_hero: (
    <>
      Join the PWNEU community to master the art of ethical hacking,
      <br /> enhance your cybersecurity skills, and lead the digital defense of
      tomorrow.
    </>
  ),
  starts: [
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
  ],
};
const { title, text_underline, info_hero } = hero_content;

const HomeHero = () => {
  useEffect(() => {
    const parallaxIt = () => {
      const target = document.querySelectorAll(".js-mouse-move-container");

      target.forEach((container) => {
        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = el.getAttribute("data-move");

          document.addEventListener("mousemove", (e) => {
            const relX = e.pageX - container.offsetLeft;
            const relY = e.pageY - container.offsetTop;

            gsap.to(el, {
              x:
                ((relX - container.offsetWidth / 2) / container.offsetWidth) *
                Number(movement),
              y:
                ((relY - container.offsetHeight / 2) / container.offsetHeight) *
                Number(movement),
              duration: 0.2,
            });
          });
        });
      });
    };

    parallaxIt();
  }, []);

  return (
    <>
      <section className="masthead -type-1 js-mouse-move-container">
        <div className="masthead__bg">
          <img
            src={"/assets/img/learningPaths/learning/herobg1.gif"}
            alt="image"
          />
        </div>

        <div className="container">
          <div className="row y-gap-30 justify-between items-end">
            <div className="col-xl-6 col-lg-6 col-sm-10">
              <div
                className="masthead__content"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <h1 className="masthead__title">
                  {title}{" "}
                  <span className="text-green-1 underline">
                    {text_underline}
                  </span>
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-duration="100"
                  className="masthead__text"
                >
                  {info_hero}
                </p>
                <div
                  data-aos="fade-up"
                  data-aos-duration="200"
                  className="masthead__buttons row x-gap-10 y-gap-10"
                >
                  <div className="col-12 col-sm-auto">
                    <Link
                      data-barba
                      to="/signup"
                      className="buttonhero button-get-started -md  text-white"
                    >
                      Get Started Today
                    </Link>
                  </div>
                  <div className="col-12 col-sm-auto">
                    <Link
                      data-barba
                      to="/mission-vision"
                      className="buttonhero button-learn-more text-white"
                    >
                      Learn More About Our Mission
                    </Link>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-duration="300"
                  className="masthead-info row y-gap-15 sm:d-none"
                >
                  {masthead_info.map((item, i) => (
                    <div
                      key={i}
                      className="masthead-info__item d-flex items-center text-white"
                    >
                      <div className="masthead-info__icon mr-10">
                        <img src={item.icon} alt="icon" />
                      </div>
                      <div className="masthead-info__title lh-1">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* animated shape start */}
        <ShapeRendering />
        {/* animated shape end */}
      </section>
    </>
  );
};

export default HomeHero;
