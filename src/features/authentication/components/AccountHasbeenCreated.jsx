import { Link, useNavigate } from "react-router-dom";

export default function AccountHasbeenCreated() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
              <h3 className="text-32 lh-17 text-center">
                Welcome to PWNEU <br></br> Your Account has just been created
                Successfully!
              </h3>
              <p className="mt-50 text-34  text-center">
                An email has also been sent to the email address you just signed
                up for. Please check to activate your account
              </p>
            </div>
            <div className="col-12">
              <button
                type="button"
                name="submit"
                id="submit"
                className="button -md fw-500 w-1/1"
                onClick={handleNavigate}
              >
                Navigate to Login Page
              </button>
              <p className="mt-10 text-center">
                {"If you're lost, navigate to "}
                <Link to="/" className="text-custom-color">
                  Home Page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
