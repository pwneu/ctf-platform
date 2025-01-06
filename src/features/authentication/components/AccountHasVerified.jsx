/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AccountHasVerified({ email }) {
  return (
    <div 
    style={{
      maxHeight: "100vh", // Adjust the height as needed
      overflowY: "auto",
      padding: "1rem",
    }}
    className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
              <div className="mt-30 text-center">
                <img
                  src="assets/img/login/AccountHasVerified.png"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "50%", height: "auto" }}
                />
              </div>
              <h3 className="text-34 text-center">
                Welcome Aboard, and <br /> Thank You for confirming!
              </h3>
              <p className="mt-50 text-34 text-center text-dark-1">
                Your account has been successfully verified with the email{" "}
                <br />
                {email} — you're all set!
              </p>

              <p className="text-dark-1 mt-30 text-34 text-center">
                Ready to get started? Head over to the <br />
                <Link
                  to="/play"
                  className="text-custom-color text-bold"
                 
                >
                  PWNEU Competition
                </Link>{" "}
                and begin your journey!
              </p> 
            </div>
            <div className="mt-90"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
