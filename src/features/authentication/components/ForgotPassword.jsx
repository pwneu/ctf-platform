import { useState, useRef } from "react";
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

  const [turnstileToken, setTurnstileToken] = useState(undefined);
  const turnstileRef = useRef(null);
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
        } else if (status === 429) {
          toast.error(
            "Too many request in your IP address. Please try again later"
          );
        } else {
          toast.error("Something went wrong. Please try again later");
        }

        setTurnstileToken(undefined);
        turnstileRef.current?.reset();
      } finally {
        setIsBusy(false);
      }
    }
  };

  return (
    <div className="form-page__content lg:py-90">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9 mt-6">
            <div className="px-90 py-90 md:px-25 md:py-25 mt-90">
              <div className="text-center ">
                <img
                  src="assets/img/login/ForgotPassword-Icon.gif"
                  alt="Image Description"
                  className="img-fluid"
                  style={{ maxWidth: "20%", height: "auto" }}
                />
              </div>
              <h3 className="text-25 lh-13 mt-5 text-center">
                Forgot your password?
              </h3>
              <p className="mt-10 text-center text-dark-1 ">
                No worries, it happens to the best of us. Just enter your{" "}
                <br></br>email below to reset your password.
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-14 lh-1 fw-500 text-dark-1 mb-10">
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
                  ref={turnstileRef}
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken("")}
                  onExpire={() => setTurnstileToken("")}
                />
                <button
                  type="submit"
                  name="submit"
                  id="submit"
                  className="button -md fw-500 w-1"
                  disabled={isBusy || turnstileToken === undefined}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {isBusy ? "Processing..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
