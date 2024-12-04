import { Link } from "react-router-dom";
import { ShapeRendering } from "@/styles";

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
      <span style={{ color: "#cff721" }}>Secure</span> the future
    </>
  ),
  info_hero: (
    <>
      Join the PWNEU community to master the art of ethical hacking,
      <br /> enhance your cybersecurity skills, and lead the digital defense of
      tomorrow.
    </>
  ),
};
const { title, text_underline, info_hero } = hero_content;
const HomeHero = () => {
  return (
    <>
      <section className="masthead -type-1 js-mouse-move-container mt-50">
        <div className="masthead__bg">
          <img
            src={"/assets/img/learningPaths/learning/herobg2.svg"}
            alt="image"
          />
        </div>

        <div className="container">
          <div className="row y-gap-50 justify-between items-end">
            <div className="col-xl-7 col-lg-6 col-sm-10">
              <div
                className="masthead__content "
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
                      className="buttonhero  -md  text-white mt-1"
                    >
                      <span style={{ color: "#cff721", fontSize: "16px" }}>
                        ► Get Started
                      </span>{" "}
                    </Link>
                  </div>
                  <div className="col-12 col-sm-auto">
                    <Link
                      data-barba
                      to="/mission-vision"
                      className="button -md -green-1 text-dark-1"
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
