import { useNavigate } from "react-router-dom";

export default function PasswordResetSent() {
  const navigate = useNavigate();

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
              <div className="text-center">
                <img
                  src="assets/img/login/Password Reset Requested.gif"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "40%", height: "auto" }}
                />
              </div>

              <h3 className="text-30 lh-17 text-center">
                Password Reset Requested
              </h3>
              <p className="mt-10 text-34 text-center">
                {
                  "If the email you provided is valid, we’ve sent a link to reset your password. "
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
              className="button -md fw-500 w-1/1"
              onClick={() => navigate("/login")}
            >
              Return to Login Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
