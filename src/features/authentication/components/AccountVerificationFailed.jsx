import { useNavigate } from "react-router-dom";

function AccountVerificationFailed() {
  const navigate = useNavigate();

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
              <div className="text-center">
                <img
                  src="assets/img/login/AccountHasbeenCreated.svg"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "40%", height: "auto" }}
                />
              </div>
              <h3 className="text-30 text-center">
                Account Verification Failed
              </h3>
              <p className="mt-10 text-34 text-center">
                {
                  "We encountered an issue verifying your account. Please try again later. If the problem persists, feel free to contact support for assistance."
                }
                <br />
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

export default AccountVerificationFailed;
