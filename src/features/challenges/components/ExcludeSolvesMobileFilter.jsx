import { excludeSolveOptions } from "../data/challengesFilterOptions";

export default function ExcludeSolvesMobileFilter({
  selectedExcludeSolves,
  setSelectedExcludeSolves,
  isBusy,
}) {
  const handleSelectedExcludeSolvesChange = (excludeSolveOption) => {
    if (isBusy) return;
    setSelectedExcludeSolves(excludeSolveOption);
  };

  return (
    <>
      <div className="sidebar__item">
        <h5 className="sidebar__title">Exclude Solves</h5>
        <div className="sidebar-checkbox">
          {excludeSolveOptions.map((excludeSolveOption, index) => (
            <div
              className="sidebar-checkbox__item cursor"
              key={index}
              onClick={() =>
                handleSelectedExcludeSolvesChange(excludeSolveOption)
              }
            >
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  readOnly
                  checked={excludeSolveOption.id === selectedExcludeSolves.id}
                />
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check"></div>
                </div>
              </div>

              <div className="sidebar-checkbox__title">
                {excludeSolveOption.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
