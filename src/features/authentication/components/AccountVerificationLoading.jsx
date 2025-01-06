export default function AccountVerificationLoading() {
  return (
    <>
      <div 
      style={{
        maxHeight: "100vh", // Adjust the height as needed
        overflowY: "auto",
        padding: "1rem",
      }}
      className="form-page__content lg:py-50">
        <div className="container">
          <div className="row justify-center items-center">
            <div className="col-xl-8 col-lg-9">
              <div className="px-50 py-50 md:px-25 md:py-25 bg-white rounded-16">
                <div className="mt-30 text-center">
                  <img
                    src="assets/img/login/AccountVerificationLoading.png"
                    alt="Image Description"
                    className="img-fluid"
                    style={{ maxWidth: "30%", height: "auto" }}
                  />
                </div>
                <h3 className="text-30 text-center">Verifying...</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="/assets/img/general/loading.gif" alt="Loading..." />
                </div>
              </div>
            </div>
            <div className="mt-90"></div>
          </div>
        </div>
      </div>
    </>
  );
}
