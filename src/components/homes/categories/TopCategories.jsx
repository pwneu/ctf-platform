import React from "react";
import { topCatagoriesThree } from "../../../data/topCategories"; //DONE
import { Link } from "react-router-dom";
export default function TopCategories() {
  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Top Categories</h2>

              <p className="sectionTitle__text ">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          <div className="col-lg-6">
            <div className="row y-gap-30">
              {topCatagoriesThree.slice(0, 4).map((elm, i) => (
                <Link
                  to={`/list-of-challenges`}
                  className="col-md-6 linkCustomTwo"
                  key={i}
                >
                  <div className="categoryCard -type-1">
                    <div className="categoryCard__image">
                      <div
                        className="bg-image ratio ratio-30:16 js-lazy"
                        style={{ backgroundImage: `url(${elm.imageSrc})` }}
                      ></div>
                    </div>

                    <div className="categoryCard__content text-center">
                      <h4 className="categoryCard__title text-17 lh-15 fw-500 text-white">
                        {elm.title}
                      </h4>
                      <div className="categoryCard__subtitle text-13 text-white lh-1 mt-5">
                        {elm.courses}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="row y-gap-30">
              <div className="col-12">
                <Link to={`/list-of-challenges`} className="categoryCard -type-1">
                  <div className="categoryCard__image">
                    <div
                      className="bg-image ratio ratio-30:35 js-lazy"
                      style={{
                        backgroundImage: `url(${topCatagoriesThree[4].imageSrc})`,
                      }}
                    ></div>
                  </div>
                  <div className="categoryCard__content text-center">
                    <h4 className="categoryCard__title text-17 lh-15 fw-500 text-white">
                      {topCatagoriesThree[4].title}
                    </h4>
                    <div className="categoryCard__subtitle text-13 text-white lh-1 mt-5">
                      {topCatagoriesThree[4].courses}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="row y-gap-30">
              {topCatagoriesThree.slice(5, 7).map((elm, i) => (
                <Link
                  to={`/list-of-challenges`}
                  key={i}
                  className="col-lg-12"
                >
                  <div className="categoryCard -type-1">
                    <div className="categoryCard__image">
                      <div
                        className="bg-image ratio ratio-30:16 js-lazy"
                        style={{ backgroundImage: `url(${elm.imageSrc})` }}
                      ></div>
                    </div>
                    <div className="categoryCard__content text-center">
                      <h4 className="categoryCard__title text-17 lh-15 fw-500 text-white">
                        {elm.title}
                      </h4>
                      <div className="categoryCard__subtitle text-13 text-white lh-1 mt-5">
                        {elm.courses}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
