import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useLocation } from "wouter";
import { connect } from "react-redux";
import { rootState } from "../../store/reducers/rootReducer";
import Category from "../../models/categories";

//icons
import { ReactComponent as Loop } from "../../assets/icons/loop.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/down_arr.svg";
import { ReactComponent as ArrowUp } from "../../assets/icons/up_arr.svg";

interface MobileMenuProps {
  basketLength: number;
  accountRedirect(): void;
  hideMenu(): void;
  search(phrase: string): void;
  categories: Array<Category>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  basketLength,
  accountRedirect,
  hideMenu,
  search,
  categories,
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
    //TODO: arrows don't update

    let newState = dropDownMenus;
    dropDownMenus[index] = !dropDownMenus[index];
    setDropDownMenus(newState);

    console.log(dropDownMenus[index]);
  };

  return (
    <div className="phone-menu">
      <div className="phone-menu-container">
        <div className="phone-menu-item phone-menu-search">
          <input
            type="text"
            placeholder="search..."
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
          />
          <Loop
            height={18}
            className="loop"
            onClick={() => {
              hideMenu();
              search(phrase);
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
          basket {basketLength}
        </div>
        <div
          className="phone-menu-item"
          onClick={() => {
            hideMenu();
            accountRedirect();
          }}
        >
          account
        </div>
        <div className="phone-menu-category">Products</div>
        <div>
          {categories.length === 0 ? (
            <span>loading...</span>
          ) : (
            <div>
              {categories.map((item, index) => {
                return (
                  <div>
                    <div
                      className="phone-menu-item drop-down-menu"
                      key={index}
                      onClick={() => toogleMenu(index)}
                    >
                      <div>{item.main}</div>
                      <div>
                        {!dropDownMenus[index] ? (
                          <ArrowUp height="16" />
                        ) : (
                          <ArrowDown height="16" />
                        )}
                      </div>
                    </div>
                    {!dropDownMenus[index] && (
                      <div>
                        {categories[index].sub.map((item, index) => {
                          return (
                            <div key={index} className="drop-down-item">
                              {item}
                            </div>
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

export default connect(mapStateToProps)(MobileMenu);
