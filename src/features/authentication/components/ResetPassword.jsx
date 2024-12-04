/* eslint-disable no-useless-escape */
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/api";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ResetPassword({
  email,
  resetToken,
  setPasswordResetHasCompleted,
}) {
  const [formData, setFormData] = useState({
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

  const [turnstileToken, setTurnstileToken] = useState("");

  const [isBusy, setIsBusy] = useState(false);

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

  const handleSubmit = async (e) => {
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
      setIsBusy(true);

      try {
        await api.put("/identity/resetPassword", {
          email,
          passwordResetToken: resetToken,
          newPassword: formData.password,
          repeatPassword: formData.confirmPassword,
          turnstileToken,
        });

        setPasswordResetHasCompleted(true);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 400) {
          toast.error(`Error: ${error.response.data.message}`);
        } else if (status === 429) {
          toast.error(
            "Too many request in your IP address. Please try again later"
          );
        } else {
          toast.error("Something went wrong. Please try again later");
        }
      } finally {
        setIsBusy(false);
      }
    }
  };

  return (
    <div className="form-page__content lg:py-90">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
           
              

              <div className="text-center">
                <img
                  src="assets/img/login/ResetPassword-Icon.svg"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "20%", height: "auto" }}
                />
              </div>

              <h3 className="text-25 lh-13 mt-5 text-center ">
                {`Set a new password for ${email}`}
              </h3>
              <p className="mt-10 text-center mb-30">
                Your previous password has been reseted. Please set a new{" "}
                <br></br>password for your account.
              </p>

              <form
                id="set-password-form" // Form ID added
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-13">
                  <label className="text-14 lh-1 fw-500 text-dark-1 mb-10">
                    Create New Password *
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
                      minLength="12"
                      maxLength="128"
                      className="pe-5"
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
                  <label className="text-14 lh-1 fw-500 text-dark-1 mb-10">
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
                      minLength="12"
                      maxLength="128"
                      className="pe-5"
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

                <Turnstile
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken("")}
                  onExpire={() => setTurnstileToken("")}
                />

                <div className="col-12 mt-20">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md fw-500 w-1/1"
                    disabled={isBusy}
                  >
                    {isBusy ? "Processing..." : "Set Password"}
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
}
