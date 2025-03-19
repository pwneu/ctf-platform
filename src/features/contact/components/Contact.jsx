import { contactData } from "@/data/contactLinks";
import MapComponent from "./MapComponent";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section
        data-aos="fade-down"
        data-aos-offset="80"
        data-aos-duration={900}
      >
        <MapComponent />
      </section>
      <section className="layout-pt-md layout-pb-lg mt-90">
        <div
          className="container"
          data-aos="fade-up"
          data-aos-offset="80"
          data-aos-duration={900}
        >
          <div className="row y-gap-20 justify-between">
            <div className="col-lg-4">
              <h4 className="text-24 fw-600 text-dark-1">
                Stay Connected with PWNEU CyberEduc{" "}
              </h4>
              <p className="mt-25 fw-400 text-dark-1">
                We’d love to hear from you! Feel free to get in touch with us
                for any inquiries.
              </p>

              <div className="y-gap-30 pt-90 lg:pt-80">
                {contactData.map((elm) => (
                  <div
                    key={elm.id}
                    className="d-flex items-center"
                    style={{
                      alignItems: "center", // Ensures vertical alignment of all items
                    }}
                  >
                    <div
                      className="d-flex justify-center items-center size-1 rounded-full bg-light-0 text-dark-1"
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center", // Centers the icon vertically
                        justifyContent: "center", // Centers the icon horizontally
                      }}
                    >
                      <img
                        src={elm.icon}
                        alt={`icon-${elm.id}`}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div
                      className="ml-20 text-dark-1"
                      style={{
                        marginLeft: "20px", // Adds spacing between the icon and text
                        display: "flex", // Flex layout for proper alignment
                        alignItems: "center", // Aligns text vertically
                      }}
                    >
                      {elm.address ||
                        elm.email ||
                        elm.orgACSS ||
                        elm.phoneNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="text-24 fw-600 ">Send a Message.</h3>
              <p className="mt-25 fw-400 text-dark-1">
                Have a question or just want to get in touch? Fill out the form
                below, and we’ll be sure to get back to you soon!
              </p>

              <p className="mt-25 fw-400 text-dark-1">
                For technical assistance, contact the production team: david.roderos@neu.edu.ph / sharongrace.hangaan@neu.edu.ph
              </p>

              <form
                className="contact-form row y-gap-30 pt-60 lg:pt-40"
                onSubmit={handleSubmit}
              >
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="Name..."
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email Address
                  </label>
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="Email..."
                  />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Message...
                  </label>
                  <textarea
                    required
                    name="comment"
                    placeholder="Message"
                    rows="8"
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -purple-1 text-white"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          style={{
            minHeight: "42vh",
            marginTop: "200px",
          }}
        ></div>
      </section>
    </>
  );
}
