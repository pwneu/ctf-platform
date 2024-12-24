import FooterProfile from "@/layout/footers/FooterProfile";

export default function UserCertificate() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-black -dark-bg-dark-2 shadow-1">
        <div className="row pb-50 mb-10 mt-30 ">
          <div className="col-auto">
            <h1 className="text-30 text-white lh-12 fw-700 ">
              Get your Certificate
            </h1>
            <div className="mt-10 text-white ">
              To access your certificate, please enter your unique Certificate
              ID below and click &ldquo;Submit.&rdquo;
            </div>
          </div>
        </div>

        <div className="row y-gap-30 ">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-1 h-100 ">
              <div className="tabs -active-purple-2 js-tabs pt-0 ">
                <div className="tabs__content py-30 px-30 js-tabs-content">
                  <div>
                    <form
                      onSubmit={handleSubmit}
                      className="contact-form row y-gap-30"
                    >
                      <div className="col-md-12">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-25">
                          Certificate ID
                        </label>

                        <input
                          required
                          type="text"
                          placeholder="Enter the ID provided to you"
                        />
                      </div>

                      <div className="col-12">
                        <button className="button -purple-4 -sm -rounded  text-white">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterProfile />
    </div>
  );
}
