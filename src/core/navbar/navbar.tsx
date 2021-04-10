import { connect } from "react-redux";
import { Link } from "wouter";
import Basket from "../../interfaces/basket";
import "./navbar.css";
import React, { useState, useEffect } from "react";
import CategoryList from "./categoryList";
import { getCategoryAction } from "../../store/actions/categoryActions";
import Category from "../../interfaces/categories";
import { rootState } from "../../store/reducers/rootReducer";

interface NavbarProps {
  basket: Basket;
  categories: Array<Category>;
  getCategories: Function;
}

const Navbar: React.FC<NavbarProps> = ({
  basket,
  categories,
  getCategories,
}: NavbarProps) => {
  const [showCategory, setShowCategory] = useState<Boolean>(false);

  useEffect(() => {
    if (categories.length === 0) getCategories();
  }, []);

  const handleChange = (phrase: String) => {
    //TODO: search in db
  };

  const closeMenu = () => {
    setShowCategory(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">
          <Link href="/">maller</Link>
        </div>
        <div>
          <div className="search-box">
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              placeholder="toys, health, sports..."
            />
            <div className="search_btn">
              <span>search</span>
            </div>
          </div>
        </div>
        <div className="navbar-options">
          <div>Account</div>
          <Link href="/basket" onClick={() => closeMenu()}>
            basket {basket.items.length}
          </Link>
        </div>
      </div>
      <div className="category-container">
        <div
          className="categories"
          onClick={() => {
            setShowCategory(!showCategory);
          }}
        >
          Categories
        </div>
        <div className="side-category">Sale!</div>
        <div className="side-category">Spring Sale!</div>
      </div>
      {showCategory && <CategoryList close={closeMenu} />}
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    basket: state.basket,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getCategories: () => dispatch(getCategoryAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
