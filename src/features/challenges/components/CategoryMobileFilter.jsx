export default function CategoryMobileFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <>
      {/* Category Mobile Filter */}
      <div className="sidebar__item">
        <h5 className="sidebar__title">Category</h5>
        <div className="sidebar-checkbox">
          <div
            className="sidebar-checkbox__item"
            onClick={() => setSelectedCategory(null)}
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
            <div className="sidebar-checkbox__count"></div>
          </div>
          {categories.map((category, index) => (
            <div
              className="sidebar-checkbox__item cursor"
              key={index}
              onClick={() => setSelectedCategory(category)}
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

              <div className="sidebar-checkbox__title">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* End Category Mobile Filter */}
    </>
  );
}
