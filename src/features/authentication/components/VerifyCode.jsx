import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Unused but keep it

export default function VerifyCode() {
  const [formData, setFormData] = useState({
    code: "",
  });

  const [errors, setErrors] = useState({
    code: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateCode = (code) => {
    const codeRegex = /^[0-9]{6}$/;
    return codeRegex.test(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      code: formData.code
        ? validateCode(formData.code)
          ? ""
          : "Please enter a valid 6-digit code."
        : "Verification code is required.",
    };

    if (newErrors.code) {
      setErrors(newErrors);
      hasErrors = true;
    }

    if (!hasErrors) {
      console.log("Verification Code Submitted: ", formData.code);
      navigate("/set-new-password");
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

              <h3 className="text-25 lh-13 mt-5 text-center">Verify Code</h3>
              <p className="mt-10 text-center">
                An authentication code has been sent to your email.
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Enter Code *
                  </label>
                  <input
                    required
                    type="text"
                    name="code"
                    placeholder="Enter your 6-digit code"
                    value={formData.code}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                  {errors.code && <p className="error-text">{errors.code}</p>}
                </div>

                <p className="mt-10 text-center">
                  Didn’t receive a code?{" "}
                  <Link to="/" className="text-custom-color">
                    Resend
                  </Link>
                </p>

                <div className="col-12 mt-20">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md fw-500 w-1/1"
                  >
                    Verify
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
