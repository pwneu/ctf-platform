import { useNavigate } from "react-router-dom";

export default function PasswordResetSent() {
  const navigate = useNavigate();

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
              <h3 className="text-30 lh-17 text-center">Password Reset Sent</h3>
              <p className="mt-20 text-34 text-center">
                {
                  "If the provided email is valid, you will receive a link to reset your password."
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
