import { useState } from "react";

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  return (
    <>
      <div className="sidebar__item">
        <div className="accordion js-accordion">
          <div
            className={`accordion__item js-accordion-item-active ${
              categoryOpen ? "is-active" : ""
            } `}
          >
            <div
              className="accordion__button items-center"
              onClick={() => setCategoryOpen((pre) => !pre)}
            >
              <h5 className="sidebar__title">Category</h5>

              <div className="accordion__icon">
                <div className="icon icon-chevron-down"></div>
                <div className="icon icon-chevron-up"></div>
              </div>
            </div>

            <div
              className="accordion__content"
              style={categoryOpen ? { maxHeight: "350px" } : {}}
            >
              <div className="accordion__content__inner">
                <div className="sidebar-checkbox">
                  <div
                    onClick={() => setSelectedCategory(null)}
                    className="sidebar-checkbox__item"
                  >
                    <div className="form-checkbox">
                      <input
                        type="checkbox"
                        readOnly
                        checked={selectedCategory === null}
                      />
                      <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon icon-check"></div>
                      </div>
                    </div>

                    <div className="sidebar-checkbox__title">All</div>
                  </div>
                  {categories.map((category, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedCategory(category)}
                      className="sidebar-checkbox__item cursor"
                    >
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          readOnly
                          checked={category === selectedCategory}
                        />
                        <div className="form-checkbox__mark">
                          <div className="form-checkbox__icon icon-check"></div>
                        </div>
                      </div>

                      <div className="sidebar-checkbox__title">
                        {category.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
