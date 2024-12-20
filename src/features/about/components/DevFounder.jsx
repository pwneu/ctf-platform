import { developers } from "@/data/teams";

export default function DevFounder() {
  return (
    <section
      className="py-16 bg-center bg-no-repeat "
      style={{
        backgroundImage: "url('/assets/img/learningPaths/pathways/bg1.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "136vh",
        minHeight: "180vh",
      }}
    >
      <div className="container mx-auto  flex flex-col justify-center items-center h-full ">
        <div className="text-center ">
          <img
            data-aos="fade-down"
            data-aos-offset="80"
            data-aos-duration={900}
            src="assets/img/about/whoweare/pwneu.svg"
            alt="Community Icon"
            style={{
              marginTop: "200px",
              width: "90%",
              maxWidth: "100px",
            }}
          />
        </div>
      </div>

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight"
                data-aos="fade-down"
                data-aos-offset="80"
                data-aos-duration={900}
              >
                Meet the Executive Team
              </h1>

              <p
                className="text-white mt-4 leading-relaxed content-wrapper js-content-wrapper overflow-hidden"
                data-aos="fade-down"
                data-aos-offset="80"
                data-aos-duration={900}
              >
                We are pleased to introduce our Executive Team, each bringing
                exceptional skills and expertise to our organization:
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-60 lg:pt-50 justify-content-center">
          {developers.map((elm, i) => (
            <div
              key={i}
              className="col-xl-3 col-lg-2 col-md-6 linkCustomTwo justify-content-center "
            >
              <div
                className="categoryCard -type-3"
                data-aos="fade-down"
                data-aos-offset="80"
                data-aos-duration={900}
              >
                <div className="categoryCard__content">
                  <h4 className="categoryCard__title text-11 fw-700 text-white ">
                    {elm.title}
                  </h4>
                  <div className="categoryCard__text text-white text-11 lh-1 mt-5">
                    {elm.profession}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row y-gap-30 pt-20 lg:pt-50 justify-content-center text-white mt-8 px-4 text-center max-w-2xl">
          <p
            className="mt-4 leading-relaxed content-wrapper js-content-wrapper overflow-hidden"
            data-aos="fade-up"
            data-aos-offset="80"
            data-aos-duration={900}
          >
            We are developers and UnitGG CTF (Capture The Flag) players,
            dedicated to providing a dynamic and engaging learning platform for
            students pursuing cybersecurity at New Era University. Our mission
            is to encourage and empower students by offering them the tools,
            resources, and support they need to excel in the field of
            cybersecurity. We believe in hands-on learning through real-world
            challenges. That&apos;s why we focus on creating an environment
            where students can participate in CTF competitions, gain practical
            experience, and develop critical problem-solving skills. Whether
            you&apos;re a beginner just starting out or an advanced learner
            looking to hone your skills, our platform offers a range of
            challenges that cater to all skill levels. <br></br>
          </p>
        </div>
      </div>
    </section>
  );
}
