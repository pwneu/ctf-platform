import { excludeSolveOptions } from "../data/challengesFilterOptions";
import { useState } from "react";

export default function ExcludeSolvesFilter({
  selectedExcludeSolves,
  setSelectedExcludeSolves,
  isBusy,
}) {
  const [excludeSolvesOpen, setExcludeSolvesOpen] = useState(true);

  const handleSelectedExcludeSolvesChange = (excludeSolveOption) => {
    if (isBusy) return;
    setSelectedExcludeSolves(excludeSolveOption);
  };

  return (
    <>
      <div className="sidebar__item">
        <div className="accordion js-accordion">
          <div
            className={`accordion__item js-accordion-item-active ${
              excludeSolvesOpen ? "is-active" : ""
            } `}
          >
            <div
              className="accordion__button items-center"
              onClick={() => setExcludeSolvesOpen((pre) => !pre)}
            >
              <h5 className="sidebar__title">Exclude Solves</h5>

              <div className="accordion__icon">
                <div className="icon icon-chevron-down"></div>
                <div className="icon icon-chevron-up"></div>
              </div>
            </div>

            <div
              className="accordion__content"
              style={excludeSolvesOpen ? { maxHeight: "350px" } : {}}
            >
              <div className="accordion__content__inner">
                <div className="sidebar-checkbox">
                  {excludeSolveOptions.map((excludeSolveOption, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        handleSelectedExcludeSolvesChange(excludeSolveOption)
                      }
                      className="sidebar-checkbox__item cursor"
                    >
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          readOnly
                          checked={
                            excludeSolveOption.id === selectedExcludeSolves.id
                          }
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
