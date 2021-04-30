import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Category from "../../interfaces/categories";
import { Link } from "wouter";
import { rootState } from "../../store/reducers/rootReducer";
import SearchBy, { SearchBySubcategory } from "../../interfaces/searchBy";
import { setSearchByAction } from "../../store/actions/searchByActions";

interface CategoryListProps {
  categories: Array<Category>;
  close: Function;
  setSearchByAction(searchBy: SearchBy): Function;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  close,
  setSearchByAction,
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
              // <Link
              //   key={index}
              //   href={`/results`}
              //   onClick={() => {
              //     setSearchByAction(
              //       new SearchByCategory(categories[index].main)
              //     );
              //     close();
              //   }}
              // >
              //   <li id="main-cat">{el.main}</li>
              // </Link>
              <li id="main-cat">{el.main}</li>
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
                      setSearchByAction(
                        new SearchBySubcategory(
                          categories[subcat].main,
                          categories[subcat].sub[index]
                        )
                      );
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
    setSearchByAction: (searchBy: SearchBy) =>
      dispatch(setSearchByAction(searchBy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
