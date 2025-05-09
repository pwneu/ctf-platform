import { ourapproach } from "@/data/learningPaths";

export default function OurApproach() {
  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title text-24 ">Our Approach</h2>
            </div>
            <p className="sectionTitle__text text-center text-dark-1">
              At PWNEU, we focus on hands-on, learner-centric cybersecurity
              education. Our platform combines open-source learning materials,
              collaborative events, competitions, and webinars to provide
              real-world experience. We continuously update our challenges to
              keep students engaged and prepared for evolving cybersecurity
              threats.
            </p>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-60 lg:pt-50 text-dark-1">
          {ourapproach.map((elm, i) => (
            <div key={i} className="col-lg-5 col-md-6">
              <div className="coursesCard -type-2 text-center pt-50 pb-40 px-30 bg-white rounded-8">
                <div className="coursesCard__image">
                  <img src={elm.image} alt="image" />
                </div>
                <div className="coursesCard__content mt-30">
                  <h5 className="coursesCard__title text-18 lh-1 fw-700">
                    {elm.title}
                  </h5>
                  <p className="coursesCard__text text-14 mt-10">
                    {elm.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-lg-5 lg:order-1">
              <img
                className="w-1/1"
                src="/assets/img/about/contact/searching.gif"
                alt="image"
              />
            </div>
            <div className="col-xl- col-lg-6 col-md-9 lg:order-2 text-dark-1">
              <p className="mt-45 text-center">
                &ldquo;We&rsquo;re excited to connect with students, educators,
                and cybersecurity enthusiasts who share our passion for learning
                and growth. Whether you have questions, need support, or simply
                want to engage with our community, we&rsquo;re here to help.
                Follow us on our social media channels for the latest updates,
                news, and events, or reach out to us directly via email.
                Let&rsquo;s build a strong, collaborative cybersecurity
                community together at PWNEU!&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
