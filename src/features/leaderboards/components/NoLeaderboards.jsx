export default function NoLeaderboards() {
  return (
    <>
      <section
        className="no-page layout-pt-lg layout-pb-lg "
        style={{ marginTop: "0px", paddingTop: "0px" }}
      >
        <div className="container">
          <div className="row y-gap-50 justify-center items-center">
            <h3 className="text-30 lh-15" style={{ textAlign: "center" }}>
              No Leaderboards Available...
            </h3>
            <div className="col-lg-6 text-center">
              <div className="no-page__img">
                <img
                  src="/assets/img/about/contact/searching.gif"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
