import React, { useState, useEffect } from "react";

import { contactData } from "@/data/contactLinks"; 

import MapComponent from "./Map"; 

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="">
        <MapComponent />
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between">
            <div className="col-lg-3">
              <h4 className="text-24 fw-600">Stay Connected with PWNEU CyberEduc </h4>
              <p className="mt-25 fw-400">
                We’d love to hear from you! Feel free to get in touch with us for any inquiries.
              </p>

              <div className="y-gap-40 pt-90 lg:pt-80">
                {contactData.map((elm, i) => (
                  <div key={i} className="d-flex items-center">
                    <div className="d-flex justify-center items-center size-1 rounded-full bg-light-0">
                      <img src={elm.icon} alt="icon" style={{ width: "40px", height: "40px" }} />
                    </div>
                    <div className="ml-20">
                      {elm.address
                        ? `${elm.address
                          .split(" ")
                          .slice(0, 5)
                          .join(" ")} \n ${elm.address
                            .split(" ")
                            .slice(4, -1)
                            .join(" ")}`
                        : elm.email || elm.phoneNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-8">
              <h3 className="text-24 fw-600">Send a Message.</h3>
              <p className="mt-25 fw-400">
                Have a question or just want to get in touch? Fill out the form below, and
                <br /> we’ll be sure to get back to you soon!
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
      </section>
    </>
  );
}
