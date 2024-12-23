export default function EditProfile({ activeTab }) {
  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""} `}
    >
      <div className=" pt-3">
        <form className="contact-form row y-gap-30">
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              First Name
            </label>
            <input required type="text" placeholder="First Name" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Last Name
            </label>
            <input required type="text" placeholder="Last Name" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Email Address
            </label>
            <input required type="text" placeholder="Email Address" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Username
            </label>
            <input required type="text" placeholder="Username" />
          </div>
        </form>
      </div>
      <div className="mt-90"></div>
    </div>
  );
}
