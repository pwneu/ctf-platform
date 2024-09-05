import React from "react"; 

import { Link } from "react-router-dom";
export default function OurStory() {
  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Our Story</h1>
                </div>

                <div>
                  <p className="page-header__text">
                  Neque convallis a cras semper auctor. Libero id faucibus nisl
                  tincidunt egetnvallis a cras se
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50 justify-between items-center">
            <div className="col-lg-6 pr-50 sm:pr-15">
              <div className="composition -type-8">
                <div className="-el-1">
                  <img src="/assets/img/ourstory/1.png" alt="image" />
                </div>
                <div className="-el-2">
                  <img src="/assets/img/ourstory/2.png" alt="image" />
                </div>
                <div className="-el-3">
                  <img src="/assets/img/ourstory/3.png" alt="image" />
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <h2 className="text-30 lh-16">
                PWNEU OurStory
              </h2>
              <p className="text-dark-1 mt-30">
                Yeou cnvallis a cras Neque convallis a cras semper auctor. Libero id faucibus nisl
                tincidunt egetnvallis a cras sesemper auctor. Libero id faucibus nisl
                tincidunt egetnvallis a cras se
              </p>
              <p className="pr-50 lg:pr-0 mt-25">
                Neque convallis a cras semper auctor. Libero id faucibus nisl
                tincidunt egetnvallis a cras semper auctonvallis a cras semper
                aucto. Neque convallis a cras semper auctor. Liberoe convallis a
                cras semper atincidunt egetnval
              </p>
              <div className="d-inline-block">
                <Link
                  to="/signup"
                  className="button -md -purple-1 text-white mt-30"
                >
                  Neque convallis a cras semper auctor. Libero id faucibus nisl
                  tincidunt egetnvallis a cras se
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
