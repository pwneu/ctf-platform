import { Link } from "react-router-dom";

export default function PasswordCompleted() {
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
              <h3 className="text-32 lh-17 text-center">
                Password Changes Successfully!
              </h3>
              <p className="mt-5 text-19 text-center">
                Please{" "}
                <Link to="/login" className="text-custom-color text-bold">
                  Login
                </Link>{" "}
                to your email account again.
              </p>
              <div className="col-12">
                <Link to="/login">
                  <button
                    type="button"
                    name="submit"
                    id="submit"
                    className="mt-20 button -md fw-500 w-1/1"
                  >
                    Log In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
