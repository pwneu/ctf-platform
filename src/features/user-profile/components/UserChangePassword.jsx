/* eslint-disable no-useless-escape */
import { useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";

export default function UserChangePassword({ activeTab }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

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
    const { name, value } = e.target;

    const error = validatePassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSaving) return;

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSaving(true);

    try {
      await api.put("/identity/me/password", null, {
        params: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          repeatPassword: formData.confirmNewPassword,
        },
      });

      toast.success("Password updated successfully.");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setErrors({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setShowPassword({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false,
      });
    } catch (error) {
      const status = error?.response?.status;

      // Don't navigate the user if unauthorized. The user might get confused what happened
      if (status === 400) {
        toast.error(`${error.response.data.message}`);
      } else if (status === 429) {
        toast.error("Slow down on changing password!");
      } else {
        toast.error("Something went wrong registering. Please try again later");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Current password *
          </label>
          <div className="position-relative">
            <input
              required
              type={showPassword.currentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              minLength="12"
              maxLength="128"
              className="pe-5"
            />
            <i
              className={`fas ${
                showPassword.currentPassword ? "fa-eye" : "fa-eye-slash"
              } position-absolute`}
              style={{
                cursor: "pointer",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "#000",
              }}
              onClick={() => togglePasswordVisibility("currentPassword")}
            ></i>
          </div>
          {errors.currentPassword && (
            <p className="error-text">{errors.currentPassword}</p>
          )}
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            New password *
          </label>

          <div className="position-relative">
            <input
              required
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              minLength="12"
              maxLength="128"
              className="pe-5"
            />
            <i
              className={`fas ${
                showPassword.newPassword ? "fa-eye" : "fa-eye-slash"
              } position-absolute`}
              style={{
                cursor: "pointer",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "#000",
              }}
              onClick={() => togglePasswordVisibility("newPassword")}
            ></i>
          </div>
          {errors.newPassword && (
            <p className="error-text">{errors.newPassword}</p>
          )}
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Confirm New Password *
          </label>

          <div className="position-relative">
            <input
              required
              type={showPassword.confirmNewPassword ? "text" : "password"}
              name="confirmNewPassword"
              placeholder="New Password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              minLength="12"
              maxLength="128"
              className="pe-5"
            />
            <i
              className={`fas ${
                showPassword.confirmNewPassword ? "fa-eye" : "fa-eye-slash"
              } position-absolute`}
              style={{
                cursor: "pointer",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "#000",
              }}
              onClick={() => togglePasswordVisibility("confirmNewPassword")}
            ></i>
          </div>
          {errors.confirmNewPassword && (
            <p className="error-text">{errors.confirmNewPassword}</p>
          )}
        </div>

        <div className="col-12">
          <button
            className="button -md text-white"
            style={{ backgroundColor: "black" }}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
