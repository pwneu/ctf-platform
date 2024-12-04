import { Link } from "react-router-dom";

export default function PasswordResetCompleted() {
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
              <div className="text-center">
                <img
                  src="assets/img/login/PasswordChangesSuccessfully!.svg"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "60%", height: "auto" }}
                />
              </div>

              <h3 className="text-30 text-center">
                Password Changes Successfully!
              </h3>
              <p className="mt-35 text-37 text-center">
                {"Your previous password has been reseted. Please set a new"}
                <br />
                {"password for your account."}
              </p>
            </div>
            <Link to="/login">
              <button
                type="button"
                name="submit"
                id="submit"
                className="mt-20 button -md fw-500 w-1/1"
              >
                Return to Login Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
