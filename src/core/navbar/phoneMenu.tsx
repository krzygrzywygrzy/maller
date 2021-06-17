import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useLocation } from "wouter";
import { connect } from "react-redux";
import { rootState } from "../../store/reducers/rootReducer";
import Category from "../../models/categories";
import { Link } from "wouter";
import SearchBy, { SearchByCategory, SearchByPhrase, SearchBySubcategory } from "../../models/searchBy";
import { setSearchByAction } from "../../store/actions/searchByActions";

//icons
import { ReactComponent as Loop } from "../../assets/icons/loop.svg";
// eslint-disable-next-line
import { ReactComponent as ArrowDown } from "../../assets/icons/down_arr.svg";
// eslint-disable-next-line
import { ReactComponent as ArrowUp } from "../../assets/icons/up_arr.svg";
import { ReactComponent as Cart } from "../../assets/icons/cart.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";

interface MobileMenuProps {
  basketLength: number;
  accountRedirect(): void;
  hideMenu(): void;

  categories: Array<Category>;
  setSearchByAction(searchBy: SearchBy): void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  basketLength,
  accountRedirect,
  hideMenu,
  categories,
  setSearchByAction,
}) => {
  const [, setLocation] = useLocation();
  const [phrase, setPhrase] = useState<string>("");
  const [dropDownMenus, setDropDownMenus] = useState<Array<boolean>>([]);

  /**
   * assingns [dropDownMenus] based on amount of fetch categories
   */
  useEffect(() => {
    let menus: Array<boolean> = [];
    // eslint-disable-next-line
    for (let menu in categories) menus.push(false);
  }, [categories]);

  /**
   * toogling the subcatefory list menu visibility
   * @param index -> index of category in array
   */
  const toogleMenu = (index: number) => {
    //TODO: menu's visibility doesn't update after click

    let newState = [...dropDownMenus];
    dropDownMenus[index] = !dropDownMenus[index];
    setDropDownMenus(newState);
  };

  return (
    <div className="phone-menu">
      <div className="phone-menu-container">
        <div className="phone-menu-item phone-menu-search">
          <input type="text" placeholder="search..." value={phrase} onChange={(e) => setPhrase(e.target.value)} />

          <Loop
            height={18}
            className="loop"
            onClick={() => {
              hideMenu();
              setSearchByAction(new SearchByPhrase(phrase));
              setLocation(`/results/${phrase}`);
            }}
          />
        </div>
        <div
          className="phone-menu-item"
          onClick={() => {
            setLocation("/basket");
            hideMenu();
          }}
        >
          <Cart height="20" className="icon" />{" "}
          <div>
            Basket <span className="goods-amount">{basketLength}</span>
          </div>
        </div>
        <div
          className="phone-menu-item"
          onClick={() => {
            hideMenu();
            accountRedirect();
          }}
        >
          <UserIcon height="20" className="icon" /> <div>Account</div>
        </div>
        <div className="phone-menu-category">Products</div>
        <div>
          {categories.length === 0 ? (
            <span>loading...</span>
          ) : (
            <div>
              {categories.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="phone-menu-item drop-down-menu" onClick={() => toogleMenu(index)}>
                      <Link
                        href={`/results/${item.main}`}
                        onClick={() => {
                          setSearchByAction(new SearchByCategory(item.main));
                          hideMenu();
                        }}
                      >
                        <div>{item.main}</div>
                      </Link>
                      <div>
                        {/* {!dropDownMenus[index] ? (
                          <ArrowUp height="16" />
                        ) : (
                          <ArrowDown height="16" />
                        )} */}
                      </div>
                    </div>
                    {!dropDownMenus[index] && (
                      <div>
                        {categories[index].sub.map((item, i) => {
                          return (
                            <Link
                              key={i}
                              href={`/results/${item}`}
                              onClick={() => {
                                setSearchByAction(new SearchBySubcategory(categories[index].main, item));
                                hideMenu();
                              }}
                            >
                              <div className="drop-down-item">{item}</div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
    setSearchByAction: (searchBy: SearchBy) => dispatch(setSearchByAction(searchBy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
