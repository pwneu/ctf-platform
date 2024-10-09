import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      email: formData.email
        ? validateEmail(formData.email)
          ? ""
          : "Please enter a valid email address."
        : "Email is required.",
    };

    if (newErrors.email) {
      setErrors(newErrors);
      hasErrors = true;
    }

    if (!hasErrors) {
      console.log("Reset Password Request Submitted: ", formData.email);
      navigate("/verify-code");
    }
  };

  return (
    <div className="form-page__content lg:py-90">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-80 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <div className="mb-20">
                <Link to="/login" className="text-custom-color text-14">
                  &lt; Back to Login
                </Link>
              </div>

              <h3 className="text-25 lh-13 mt-5 text-center">
                Forgot Password
              </h3>
              <p className="mt-10 text-center">
                No worries, it happens to the best of us. Just enter your email
                below to reset your password.
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="col-12 mt-20">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md fw-500 w-1/1"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
