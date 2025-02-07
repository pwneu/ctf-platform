/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { Turnstile } from "@marsidev/react-turnstile";

const LOGIN_API = "/identity/login";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState(undefined);
  const turnstileRef = useRef(null);

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location.state?.from?.pathname || "/";

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const containsSqlInjection = (input) => {
    return sqlInjectionPatterns.some((pattern) => pattern.test(input));
  };

  const sqlInjectionPatterns = [
    /(--|#|\/\*|\*\/|;|'|"|`)/, // Comment or escape characters
    /(OR\s+1=1|AND\s+1=1)/i, // // Basic boolean-based injection
    /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi, // https://stackoverflow.com/questions/7428955/regex-expressions-prevent-sql-script-injection
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    const usernameError = formData.username ? "" : "Username is required.";
    const passwordError = formData.password
      ? validatePassword(formData.password)
      : "Password is required.";

    const newErrors = {
      username: usernameError,
      password: passwordError,
    };

    setErrors(newErrors);

    if (usernameError || passwordError) {
      hasErrors = true;
    }

    if (!hasErrors) {
      // console.log("Form Data Submitted: ", formData);

      setIsButtonDisabled(true);

      try {
        if (containsSqlInjection(formData.username)) {
          toast.info(atob("UFdORVV7Tm9fJHFsMV9GMFJfeU91fQ==")); // PWNEU{No_$ql1_F0R_yOu}
          return;
        }

        const response = await api.post(LOGIN_API, {
          userName: formData.username,
          password: formData.password,
          turnstileToken,
        });

        setAuth(response.data);
        // toast.success(`Logged in with user id: ${response.data.id}`);
        navigate(fromLocation, { replace: true });
      } catch (error) {
        const status = error?.response?.status;

        if (status === 400) {
          toast.error(`Error logging in: ${error.response.data.message}`);
        } else if (status === 429) {
          toast.error(
            "Too many request in your IP address. Please try again later"
          );
        } else {
          toast.error(
            "Something went wrong logging in. Please try again later"
          );
        }

        turnstileRef.current?.reset();
        setTurnstileToken(undefined);
      } finally {
        setIsButtonDisabled(false);
      }
    }
  };

  return (
    <div
      style={{
        maxHeight: "100vh", // Adjust the height as needed
        overflowY: "auto",
        padding: "1rem",
      }}
      className="form-page__content lg:py-90"
    >
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9 ">
            <div className="mt-90 px-90 py-90 md:px-25 md:py-25  rounded-16 ">
              <div className="text-center ">
                <img
                  src="assets/img/login/AccountHasbeenCreated.png"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "30%", height: "auto" }}
                />
              </div>
              <h3 className="text-12 text-center">Welcome, Challenger!</h3>
              <p className="mt-10 text-center text-dark-1">
                Log in with your university's institutional account. Don’t have
                an account yet? Register now and join the action!
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Username <span style={{ color: "red" }}>*</span>
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
                  {errors.username && (
                    <p className="error-text">{errors.username}</p>
                  )}
                </div>
                <div className="col-12">
                  <label className="text-13 lh-1 fw-500 text-dark-1 mb-10">
                    Password <span style={{ color: "red" }}>*</span>
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

                <Turnstile
                  ref={turnstileRef}
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken("")}
                  onExpire={() => setTurnstileToken("")}
                />

                {/* Footer Links */}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 text-black">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-custom-color fw-500">
                      Register
                    </Link>
                  </p>
                  <Link
                    to="/forgot-password"
                    className="text-black text-14 fw-500"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="col-6 mx-auto mt-4">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md fw-500 w-1/1"
                    disabled={isButtonDisabled || turnstileToken === undefined}
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
                    {turnstileToken === undefined
                      ? "Please wait..."
                      : isButtonDisabled
                      ? "Processing..."
                      : "LOG IN"}
                  </button>
                </div>
              </form>
              <div className="mt-90"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
