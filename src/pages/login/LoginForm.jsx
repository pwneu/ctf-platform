/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";

const LOGIN_API = "/identity/login";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  // TODO -- Remove "remember me" form data. The website will always remember the user.

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
        const response = await api.post(LOGIN_API, {
          userName: formData.username,
          password: formData.password,
        });

        // console.log(response.data);

        setAuth(response.data);
        toast.success(`Logged in with user id: ${response.data.id}`);
        navigate(fromLocation, { replace: true });
      } catch (error) {
        toast.error(`Error loggin in: ${error.response.data.message}`);
        console.error(`Error loggin in: ${error.response.data.message}`);
      } finally {
        setIsButtonDisabled(false);
      }
    }
  };

  return (
    <div className="form-page__content lg:py-90">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-7 col-lg-9">
            <div className="px-90 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-25 lh-13 mt-5 text-center">
                Welcome Back Eranians!
              </h3>
              <p className="mt-10">
                {/* Log in with your university's institutional account. Don’t have
                an account yet? Register through your school. */}
                Log in with your username and your password.
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
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
                  {errors.username && (
                    <p className="error-text">{errors.username}</p>
                  )}
                </div>
                <div className="col-12">
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
                      minLength="12"
                      maxLength="128"
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
                <div className="col-12 d-flex justify-content-between align-items-center mt-4">
                  {/* <div className="form-check">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />{" "}
                    <label
                      htmlFor="rememberMe"
                      className="form-check-label text-14"
                    >
                      Remember Me
                    </label>
                  </div> */}
                  <Link
                    to="/forgot-password"
                    className="text-custom-color text-14"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md fw-500 w-1/1"
                    disabled={isButtonDisabled}
                  >
                    {isButtonDisabled ? "Processing..." : "Log In"}
                  </button>
                </div>
                <div className="col-12 text-center">
                  <p>
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-custom-color">
                      Register
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
