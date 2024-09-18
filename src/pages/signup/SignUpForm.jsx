import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    accessKey: "",
    termsAgreed: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (password) => {
    const lengthRegex = /^.{8,12}$/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    let error = "";

    if (!lengthRegex.test(password)) {
      error = "Password must be between 8 and 12 characters.";
    } else if (!uppercaseRegex.test(password)) {
      error = "Password must include at least one uppercase letter.";
    } else if (!lowercaseRegex.test(password)) {
      error = "Password must include at least one lowercase letter.";
    } else if (!digitRegex.test(password)) {
      error = "Password must include at least one digit.";
    } else if (!specialCharRegex.test(password)) {
      error = "Password must include at least one special character.";
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "password" || name === "confirmPassword") {
      const error = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.termsAgreed) {
      alert("You must agree to the Terms and Privacy Policies.");
      return;
    }

    const passwordError = validatePassword(formData.password);
    const confirmPasswordError =
      formData.password !== formData.confirmPassword
        ? "Passwords do not match."
        : "";

    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    console.log("Form Data Submitted: ", formData);

    navigate("/user-account-created");
  };

  return (
    <div className="form-page__content lg:py-40 mt-8">
      <div className="container mt-10">
        <div className="row justify-center items-center mt-8">
          <div className="col-xl-10 col-lg-9 mt-8">
            <div className="mt-5 px-1 py-0 md:px-35 md:py-25 bg-white rounded-16">
              <h3 className="text-1 lh-2 mt-2">Join Us!</h3>
              <p className="text-1 mt-10">
                Sign up with your university's institutional account to get started!
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                {/* Input fields */}
                <div className="col-lg-6">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    First Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Last Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Username *
                  </label>
                  <input
                    required
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    autoComplete="username"
                  />
                </div>

                <div className="col-lg-6">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
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
                    <p className="error-text">{errors.password}</p>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <div className="position-relative">
                    <input
                      required
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      autoComplete="confirm-password"
                      minLength="8"
                      maxLength="12"
                      className="form-control pe-5"
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
                    <p className="error-text">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="col-lg-12">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Access Key *
                  </label>
                  <input
                    required
                    type="password"
                    name="accessKey"
                    placeholder="Access Key"
                    value={formData.accessKey}
                    onChange={handleInputChange}
                    autoComplete="accesskey"
                  />
                </div>

                <div className="col-lg-12">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    <input
                      type="checkbox"
                      name="termsAgreed"
                      checked={formData.termsAgreed}
                      onChange={handleInputChange}
                    />{" "}
                    I agree to all the{" "}
                    <Link to="/terms" className="text-custom-color text-bold">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-custom-color text-bold"
                    >
                      Privacy Policies
                    </Link>
                    .
                  </label>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md fw-500 w-1/1"
                  >
                    Create Account
                  </button>
                  <p className="mt-10 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-custom-color text-bold">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
