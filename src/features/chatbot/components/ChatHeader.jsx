const ChatHeader = () => (
  <section className="layout-pt-lg  bg-dark-3">
    <div className="container">
      <div className="row y-gap-30 justify-between items-center">
        <div className="col-xl-7 col-lg-4">
          <div className="sectionTitle -light">
            <h2
              className="sectionTitle__title mt-2 "
              data-aos="fade-down"
              data-aos-offset="80"
              data-aos-duration={900}
            >
              {" "}
              {"Dash AI Chatbot (Experimental v0.0.1) "}{" "}
            </h2>
            <p
              className="sectionTitle__text mt-30 "
              data-aos="fade-up"
              data-aos-offset="80"
              data-aos-duration={900}
            >
              Learn to use Dash AI, the advanced chatbot designed for CTF
              challenges. Get real-time hints, guidance, and interactive
              problem-solving to enhance your cybersecurity skills and tackle
              challenges with confidence. Start your CTF journey today!
            </p>
          </div>
        </div>
        <div
          className="col-lg-4 lg:order-4"
          data-aos="fade-up"
          data-aos-offset="80"
          data-aos-duration={900}
        >
          <img
            className="w-1/1"
            src="assets/img/chatbot/dashai-icons.png"
            alt="image"
          />
        </div>
      </div>
    </div>
  </section>
);

export default ChatHeader;
