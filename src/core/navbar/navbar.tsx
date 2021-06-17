import { connect } from "react-redux";
import { Link } from "wouter";
import Basket from "../../models/basket";
import "./navbar.css";
import React, { useState, useEffect, useRef } from "react";
import CategoryList from "./categoryList";
import { getCategoryAction } from "../../store/actions/categoryActions";
import Category from "../../models/categories";
import { rootState } from "../../store/reducers/rootReducer";
import User from "../../models/user";
import { useLocation } from "wouter";
import { ReactComponent as MenuBurger } from "../../assets/icons/menu.svg";
import MobileMenu from "./phoneMenu";
import useSearchInDB from "../../services/useSearchInDB.js";
import SearchBox from "./searchBox";
import useOutsideClick from "../functions/useOutsideClick";

//icons
import { ReactComponent as Cart } from "../../assets/icons/cart.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as Loop } from "../../assets/icons/loop.svg";
import SearchBy, { SearchByPhrase } from "../../models/searchBy";
import { setSearchByAction } from "../../store/actions/searchByActions";

interface NavbarProps {
  basket: Basket;
  categories: Array<Category>;
  user: User;
  getCategories(): void;
  setSearchByAction(searchBy: SearchBy): void;
}

const Navbar: React.FC<NavbarProps> = ({ basket, categories, getCategories, user, setSearchByAction }: NavbarProps) => {
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState<boolean>(false);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (categories.length === 0) getCategories();
  }, [categories.length, getCategories]);

  /**
   * db text search
   */
  const [phrase, setPhrase] = useState<string>("");
  const searchResponse = useSearchInDB(phrase);

  //react to phrase change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!showSearchBox) setShowSearchBox(true);
    setShowCategory(false);
    setPhrase(e.target.value);
  };

  //close menu when phrase is empty
  useEffect(() => {
    if (phrase.length === 0) setShowSearchBox(false);
  }, [phrase]);

  //close menu when clicked outside
  const searchResultsBoxRef = useRef(null);
  useOutsideClick(searchResultsBoxRef, () => {
    setShowSearchBox(false);
  });

  /**
   * end of db text search
   */

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

  const hideSearchBox = () => {
    setShowSearchBox(false);
  };
  //hide categories menu when clicked outside
  const categoiresMenuRef = useRef(null);
  //useOutsideClick(categoiresMenuRef, () => setShowCategory(false));

  //click Enter to search
  useEffect(() => {
    const enterSearch = (e) => {
      if (e.key === "Enter") {
        setSearchByAction(new SearchByPhrase(phrase));
        setLocation(`/results/${phrase}`);
        setShowSearchBox(false);
      }
    };

    if (showSearchBox) {
      document.addEventListener("keypress", enterSearch);
    }

    return () => {
      document.removeEventListener("keypress", enterSearch);
    };
  }, [showSearchBox, phrase, setLocation, setShowSearchBox, setSearchByAction]);

  return (
    <div className="navbar unselectable">
      <div className="navbar-container">
        <div className="navbar-title ">
          <Link href="/">maller</Link>
        </div>
        <div>
          <div className="search-box">
            <input type="text" onChange={handleChange} placeholder="music, books..." value={phrase} />
            <Loop
              height="18"
              onClick={() => {
                setSearchByAction(new SearchByPhrase(phrase));
                setLocation(`/results/${phrase}`);
              }}
            />
          </div>
          {showSearchBox && (
            <div ref={searchResultsBoxRef}>
              <SearchBox results={searchResponse} hideMenu={hideSearchBox} />
            </div>
          )}
        </div>
        <div className="navbar-options">
          <div className="navbar-account">
            <span onClick={accountRedirect} className="navbar-icon-link">
              <UserIcon height="18" className="icon" />
              <div>{user.uid !== undefined ? "Account" : "Log in"}</div>
            </span>
          </div>
          <Link href="/basket" onClick={() => closeMenu()} className="navbar-icon-link">
            <Cart className="icon" height="18" />
            <div>
              Basket <span className="goods-amount">{basket.items.length}</span>
            </div>
          </Link>
        </div>
        <div className="burger-menu">
          <MenuBurger height={24} onClick={() => setShowPhoneMenu(!showPhoneMenu)} />
        </div>
      </div>
      <div className="category-container">
        <div
          ref={categoiresMenuRef}
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
        <MobileMenu basketLength={basket.items.length} accountRedirect={accountRedirect} hideMenu={hideMobileMenu} />
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
    setSearchByAction: (searchBy: SearchBy) => dispatch(setSearchByAction(searchBy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
