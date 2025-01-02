/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-useless-escape */
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/api";
import { Turnstile } from "@marsidev/react-turnstile";

const REGISTER_API = "/identity/register";

export default function SignUpForm({ setHasRegistered }) {
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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (password) => {
    const minLengthRegex = /^.{12,}$/; // At least 12 characters
    const maxLengthRegex = /^.{1,128}$/; // Maximum 128 characters
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    let error = "";

    if (!minLengthRegex.test(password)) {
      error = "Password must be at least 12 characters.";
    } else if (!maxLengthRegex.test(password)) {
      error = "Password must not exceed 128 characters.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAgreed) {
      toast.error("You must agree to the Terms and Privacy Policies.");
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

    setIsButtonDisabled(true);

    try {
      await api.post(REGISTER_API, {
        userName: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.firstName + " " + formData.lastName,
        accessKey: formData.accessKey,
        turnstileToken,
      });

      toast.success(
        `The verification link has been sent to ${formData.email}. Please check to activate your account.`
      );

      setHasRegistered(true);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 400) {
        toast.error(`Unable to register: ${error.response.data.message}`);
      } else if (status === 429) {
        toast.error(
          "Too many request in your IP address. Please try again later"
        );
      } else {
        toast.error("Something went wrong registering. Please try again later");
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div
      style={{
        maxHeight: "100vh", // Adjust the height as needed
        overflowY: "auto",
        padding: "1rem",
      }}
    >
      <div className="form-page__content lg:py-40 mt-8">
        <div className="container mt-10">
          <div className="row justify-center items-center mt-8">
            <div className="col-xl-0 col-lg-7 mt-40 ">
              <div className="text-center mt-5 ">
                <img
                  src="assets/img/login/JoinUs-Icon.gif"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "20%", height: "auto" }}
                />
              </div>
              <div className="">
                <h3 className="text-20 mt-15 text-center">
                  Accept the Challenge
                </h3>
                <p className="text-15   mt-15  lh-4 text-center text-dark-1">
                  Sign up now using your university's institutional account and
                  unlock a world of exciting CTF challenges! Whether you're a
                  beginner or a seasoned hacker, there's something here for
                  everyone. Push your limits, climb the leaderboard, and
                  represent your university!
                </p>
                <form
                  className="contact-form respondForm__form row y-gap-20 pt-30"
                  onSubmit={handleSubmit}
                >
                  <div className="col-lg-6">
                    <label className="text-12 lh-1 fw-500 text-dark-1 mb-10">
                      First Name  <span style={{ color: 'red' }}>*</span>
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
                    <label className="text-12 lh-1 fw-500 text-dark-1 mb-10">
                      Last Name  <span style={{ color: 'red' }}>*</span>
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
                    <label className="text-12 lh-1 fw-500 text-dark-1 mb-10">
                      Email address  <span style={{ color: 'red' }}>*</span>
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
                    <label className="text-12 lh-1 fw-500 text-dark-1 mb-10">
                      Username  <span style={{ color: 'red' }}>*</span>
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
                    <label className="text-12 lh-1 fw-500 text-dark-1 mb-10">
                      Password  <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="position-relative ">
                      <input
                        required
                        type={showPassword.password ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                        minLength="12"
                        maxLength="128"
                        className="pe-5"
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
                    <label className="text-12 lh-1 fw-500 text-dark-1 mb-10">
                      Confirm Password  <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        required
                        type={
                          showPassword.confirmPassword ? "text" : "password"
                        }
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        autoComplete="confirm-password"
                        minLength="12"
                        maxLength="128"
                        className="pe-5"
                      />
                      <i
                        className={`fas ${
                          showPassword.confirmPassword
                            ? "fa-eye"
                            : "fa-eye-slash"
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
                    <label className="text-12 lh-1 fw-500 text-dark-1 mb-10">
                      Access Key  <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="accessKey"
                      placeholder="Access Key"
                      value={formData.accessKey}
                      onChange={handleInputChange}
                      autoComplete="accesskey"
                    />
                  </div>

                  <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken("")}
                    onExpire={() => setTurnstileToken("")}
                  />

                  <div className="col-lg-12">
                    <label className="text-12 lh-2 fw-500 text-dark-1 mb-10">
                      <input
                        type="checkbox"
                        name="termsAgreed"
                        checked={formData.termsAgreed}
                        onChange={handleInputChange}
                      />{" "}
                      I agree to all the{" "}
                      <Link
                        to="/terms-and-conditions"
                        className="text-custom-color"
                      >
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy-policy" className="text-custom-color">
                        Privacy Policies
                      </Link>
                      .
                    </label>
                  </div>

                  <div className="col-12 mx-auto">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -md fw-500 w-1/1"
                      disabled={isButtonDisabled}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#d0f721c7";
                        e.target.style.color = "black";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "white";
                      }}
                    >
                      {isButtonDisabled ? "Processing..." : "Create Account"}
                    </button>
                    <p className="mt-10 text-center">
                      Already have an account?{" "}
                      <Link to="/login" className="text-custom-color">
                        Log in
                      </Link>
                    </p>
                    <p className="mt-90 text-center"></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
