import { Link } from "react-router-dom";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function ForgotPassword({ setPasswordResetSent }) {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
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
      setIsBusy(true);

      try {
        const queryParams = new URLSearchParams({
          email: formData.email,
          turnstileToken: turnstileToken || "",
        });

        await api.post(`/identity/forgotPassword?${queryParams.toString()}`);

        setPasswordResetSent(true);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 400) {
          toast.error(`Error: ${error.response.data.message}`);
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
                    {isBusy ? "Processing..." : "Submit"}
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
