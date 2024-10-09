import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (password) => {
    const lengthRegex = /^.{8,12}$/; // 8 to 12 characters
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

    if (!lengthRegex.test(password)) {
      return "Password must be between 8 and 12 characters.";
    } else if (!uppercaseRegex.test(password)) {
      return "Password must include at least one uppercase letter.";
    } else if (!lowercaseRegex.test(password)) {
      return "Password must include at least one lowercase letter.";
    } else if (!digitRegex.test(password)) {
      return "Password must include at least one digit.";
    } else if (!specialCharRegex.test(password)) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordError = validatePassword(formData.password);
    const confirmPasswordError =
      formData.confirmPassword === formData.password
        ? ""
        : "Passwords do not match.";

    const newErrors = {
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    if (passwordError || confirmPasswordError) {
      setErrors(newErrors);
    } else {
      console.log("New Password Set: ", formData.password);
      navigate("/password-completed");
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

              <h3 className="text-25 lh-13 mt-5 text-center">Set a Password</h3>
              <p className="mt-10 text-center">
                Your previous password has been reset. Please set a new password
                for your account.
              </p>

              <form
                id="set-password-form" // Form ID added
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="username"
                  value={formData.email || ""}
                  aria-hidden="true"
                />
                <div className="col-lg-13">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Create Password *
                  </label>
                  <div className="position-relative">
                    <input
                      required
                      type={showPassword.password ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                      minLength="8"
                      maxLength="12"
                      className="form-control pe-5"
                      aria-describedby="password-error"
                    />
                    <i
                      className={`fas ${
                        showPassword.password ? "fa-eye" : "fa-eye-slash"
                      } position-absolute`}
                      style={{
                        cursor: "pointer",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        color: "#000",
                      }}
                      onClick={() => togglePasswordVisibility("password")}
                    ></i>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="error-text">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="col-lg-13">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Re-enter Password *
                  </label>
                  <div className="position-relative">
                    <input
                      required
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                      minLength="8"
                      maxLength="12"
                      className="form-control pe-5"
                      aria-describedby="confirm-password-error"
                    />
                    <i
                      className={`fas ${
                        showPassword.confirmPassword ? "fa-eye" : "fa-eye-slash"
                      } position-absolute`}
                      style={{
                        cursor: "pointer",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        color: "#000",
                      }}
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    ></i>
                  </div>
                  {errors.confirmPassword && (
                    <p id="confirm-password-error" className="error-text">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="col-12 mt-20">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md fw-500 w-1/1"
                  >
                    Set Password
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
