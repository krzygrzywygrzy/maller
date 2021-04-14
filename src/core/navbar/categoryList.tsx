import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Category from "../../interfaces/categories";
import { Link } from "wouter";
import { rootState } from "../../store/reducers/rootReducer";

interface CategoryListProps {
  categories: Array<Category>;
  close: Function;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  close,
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
    <div className="category-list" id="category-list">
      <div className="cl-section border-right">
        <ul>
          {categories.map((el, index) => {
            return (
              <Link
                key={index}
                href={`/results/${el.main}/none`}
                onClick={() => close()}
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
                    href={`/results/${categories[subcat].main}/${el}`}
                    onClick={() => close()}
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

export default connect(mapStateToProps)(CategoryList);
