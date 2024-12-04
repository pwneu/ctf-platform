export default function NotFound() {
  return (
    <>
      <section className="no-page layout-pt-lg layout-pb-lg ">
        <div className="container">
          <div className="row y-gap-50 justify-center items-center">
            <div className="col-lg-6 text-center">
              <div className="no-page__img">
                <img src="/assets/img/404/searching.gif" alt="image" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-8 text-center">
              <div className="no-page__content">
                <h1 className="no-page__main text-dark-1">
                  40<span className="text-purple-1">4</span>
                </h1>
                <h2 className="text-3 lh-12 mt-5">
                  Oops! It looks like you&apos;re lost.
                </h2>
                <div className="mt-10">
                  The page you&apos;re looking for isn&apos;t available.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
