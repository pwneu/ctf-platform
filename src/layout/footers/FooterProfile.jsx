import Links from "../components/Links";

export default function FooterProfile() {
  return (
    <footer className="footer text-dark-1">
      <div className="container">
        <div className="py-30 border-top-light">
          <div className="row items-center justify-between">
            <div className="col-auto">
              <div className="text-13 lh-1">
                © {new Date().getFullYear()} PWNEU. All Right Reserved.
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="d-flex items-center flex-wrap x-gap-20 text-dark-1">
                  <Links />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
