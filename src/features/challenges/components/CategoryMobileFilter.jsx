export default function CategoryMobileFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  isBusy,
}) {
  const handleSelectedCategoryChange = (category) => {
    if (isBusy) return;
    sessionStorage.setItem("selectedCategoryId", category?.id || "");
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="sidebar__item">
        <h5 className="sidebar__title ">Category</h5>
        <div className="sidebar-checkbox">
          <div
            className="sidebar-checkbox__item"
            onClick={() => handleSelectedCategoryChange(null)}
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
              onClick={() => handleSelectedCategoryChange(category)}
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
                {" "}
                {`${category.name} (${category.challengesCount})`}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-20"> </div>
      </div>
    </>
  );
}
