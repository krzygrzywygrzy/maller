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

//icons
import { ReactComponent as Cart } from "../../assets/icons/cart.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import useSearchInDB from "../../services/useSearchInDB";
import SearchBox from "./searchBox";

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
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (categories.length === 0) getCategories();
  }, [categories.length, getCategories]);

  //searching in db
  const [phrase, setPhrase] = useState<string>("");
  const searchResponse = useSearchInDB(phrase);
  const handleChange = (p: string) => {
    if (!showSearchBox) setShowSearchBox(true);
    setPhrase(p);
  };

  useEffect(() => {
    if (showSearchBox) {
    }
  }, [showSearchBox]);

  //close menu
  const closeMenu = () => {
    setShowCategory(false);
  };

  /**
   * if user is authenticated redirects to account page
   * otherwise to log in form
   */
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
          <div>{showSearchBox && <SearchBox results={searchResponse} />}</div>
        </div>
        <div className="navbar-options">
          <div className="navbar-account">
            <span onClick={accountRedirect} className="navbar-icon-link">
              <UserIcon height="18" className="icon" />
              <div>{user.uid !== undefined ? "Account" : "Log in"}</div>
            </span>
          </div>
          <Link
            href="/basket"
            onClick={() => closeMenu()}
            className="navbar-icon-link"
          >
            <Cart className="icon" height="18" />
            <div>
              Basket <span className="goods-amount">{basket.items.length}</span>
            </div>
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
