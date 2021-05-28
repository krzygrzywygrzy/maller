import { connect } from "react-redux";
import { Link } from "wouter";
import Basket from "../../models/basket";
import "./navbar.css";
import React, { useState, useEffect } from "react";
import CategoryList from "./categoryList";
import { getCategoryAction } from "../../store/actions/categoryActions";
import Category from "../../models/categories";
import { rootState } from "../../store/reducers/rootReducer";
import User from "../../models/user";
import { useLocation } from "wouter";
import { ReactComponent as MenuBurger } from "../../assets/icons/menu.svg";
import MobileMenu from "./phoneMenu";

interface NavbarProps {
  basket: Basket;
  categories: Array<Category>;
  user: User;
  getCategories(): void;
}

const Navbar: React.FC<NavbarProps> = ({
  basket,
  categories,
  getCategories,
  user,
}: NavbarProps) => {
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState<boolean>(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (categories.length === 0) getCategories();
  }, [categories.length, getCategories]);

  const handleChange = (phrase: string) => {
    //TODO: search in db
  };

  const closeMenu = () => {
    setShowCategory(false);
  };

  const accountRedirect = () => {
    if (user.uid !== undefined) setLocation("/profile");
    else setLocation("/login");
  };

  const hideMobileMenu = () => {
    setShowPhoneMenu(false);
  };

  return (
    <div className="navbar unselectable">
      <div className="navbar-container">
        <div className="navbar-title ">
          <Link href="/">maller</Link>
        </div>
        <div>
          <div className="search-box">
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              placeholder="toys, health, sports..."
            />
            <div className="search_btn ">
              <span>search</span>
            </div>
          </div>
        </div>
        <div className="navbar-options">
          <div className="navbar-account ">
            <span onClick={accountRedirect}>
              {user.uid !== undefined ? "Account" : "Log in"}
            </span>
          </div>
          <Link href="/basket" onClick={() => closeMenu()}>
            basket {basket.items.length}
          </Link>
        </div>
        <div className="burger-menu">
          <MenuBurger
            height={24}
            onClick={() => setShowPhoneMenu(!showPhoneMenu)}
          />
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
      {showPhoneMenu && (
        <MobileMenu
          basketLength={basket.items.length}
          accountRedirect={accountRedirect}
          hideMenu={hideMobileMenu}
          search={handleChange}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    basket: state.basket,
    categories: state.categories,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getCategories: () => dispatch(getCategoryAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
