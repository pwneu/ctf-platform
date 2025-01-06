import { useNavigate } from "react-router-dom";

export default function PasswordResetSent() {
  const navigate = useNavigate();

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
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16 mt-30">
              <div className="text-center ">
                <img
                  src="assets/img/login/PasswordResetSent.png"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "30%", height: "auto" }}
                />
              </div>

              <h3 className="text-30  text-center">
              Password Reset Requested
              </h3>
              <p className="mt-30 text-34 text-center text-dark-1">
              {
                  "If the email you provided is valid, we’ve sent a link to reset your password."
                }
                <br />
                {
                  "Please check your inbox (and your spam folder, just in case)."
                }
              </p>
            </div>
            <button
              type="button"
              name="submit"
              id="submit"
              className="button -md fw-500 w-1  "
              onClick={() => navigate("/login")}
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Return to Login Page
            </button>
            <div className="mt-90"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
