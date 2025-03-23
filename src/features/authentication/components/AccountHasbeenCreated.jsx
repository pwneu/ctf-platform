import { useNavigate } from "react-router-dom";

export default function AccountHasbeenCreated() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        maxHeight: "100vh", // Adjust the height as needed
        overflowY: "auto",
        padding: "1rem",
      }}
      className="form-page__content lg:py-50"
    >
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
              <div className="mt-30 text-center">
                <img
                  src="assets/img/login/AccountHasbeenCreated.png"
                  alt="AccountHasbeenCreated"
                  className="img-fluid"
                  style={{ maxWidth: "30%", height: "auto" }}
                />
              </div>
              <h3 className="text-30 text-center">
                Action Required: <br></br>
              </h3>
              <p className="mt-30 text-34 text-center text-dark-1">
                We&apos;ve sent a{" "}
                <span
                  className="text-custom-color"
                  style={{ fontWeight: "bold" }}
                >
                  verification email
                </span>{" "}
                to the address you provided. Please note that there may be a
                slight delay in receiving the link, so check your inbox (and
                spam folder, just in case)!
              </p>
              <p className="mt-30 text-34 text-center text-dark-1">
                {`If you haven't received it after some time, feel free to reach out to an administrator for assistance.`}
              </p>

              {/* TODO -- remove when migrated to another cloud provider */}
              <p className="mt-30 text-34 text-center text-red-500 fw-bold">
                NOTE: Due to technical issues with our cloud provider, our email
                verification service is currently disabled. Please contact an
                administrator to verify your account manually.
              </p>
            </div>
            <div className="col-12">
              <button
                type="button"
                name="submit"
                id="submit"
                className="button -md fw-500 w-1/"
                onClick={handleNavigate}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Navigate to Login Page
              </button>
            </div>
            <div className="mt-90"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
