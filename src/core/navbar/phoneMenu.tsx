import React, { useState } from "react";
import "./navbar.css";
import { useLocation } from "wouter";
import { ReactComponent as Loop } from "../../assets/icons/loop.svg";

interface MobileMenuProps {
  basketLength: number;
  accountRedirect(): void;
  hideMenu(): void;
  search(phrase: string): void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  basketLength,
  accountRedirect,
  hideMenu,
  search,
}) => {
  const [, setLocation] = useLocation();
  const [phrase, setPhrase] = useState<string>("");

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
      </div>
    </div>
  );
};

export default MobileMenu;
