import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Category from "../../interfaces/categories";
import { Link } from "wouter";
import { rootState } from "../../store/reducers/rootReducer";
import ResultsFilter from "../../interfaces/results";
import { setResultsAction } from "../../store/actions/resultsFilterActions";


interface CategoryListProps {
  categories: Array<Category>;
  close: Function;
  setResultsAction: Function;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  close,
  setResultsAction,
}: CategoryListProps) => {
  const [subcat, setSub] = useState<any | null>(null);

  useEffect(() => {
    const displaySubmenu = (e) => {
      if (e.target.tagName === "LI" && e.target.id === "main-cat") {
        let index: Number = subcat;

        categories.forEach((el: Category, i: Number) => {
          if (el.main === e.target.innerText) index = i;
        });
        setSub(index);
      }
    };

    document.addEventListener("mouseover", displaySubmenu);

    return () => {
      document.removeEventListener("mouseover", displaySubmenu);
    };
  }, [subcat, categories]);

  return (
    <div className="category-list unselectable" id="category-list">
      <div className="cl-section border-right">
        <ul>
          {categories.map((el, index) => {
            return (
              <Link
                key={index}
                href={`/results`}
                onClick={() => {
                  setResultsAction({ category: categories[index].main });
                  close();
                }}
              >
                <li id="main-cat">{el.main}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="cl-section">
        {subcat === null ? (
          <div></div>
        ) : (
          <div>
            <ul>
              {categories[subcat].sub.map((el, index) => {
                return (
                  <Link
                    key={index}
                    href={`/results`}
                    onClick={() => {
                      setResultsAction({
                        category: categories[subcat].main,
                        subcategory: categories[subcat].sub[index],
                      });
                      close();
                    }}
                  >
                    <li>{el}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setResultsAction: (results: ResultsFilter) => dispatch(setResultsAction(results)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
