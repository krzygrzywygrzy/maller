import React from "react";
import "./navbar.css";
import { useLocation } from "wouter";

interface MobileMenuProps {
  basketLength: number;
  accountRedirect(): void;
  hideMenu(): void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  basketLength,
  accountRedirect,
  hideMenu,
}) => {
  const [, setLocation] = useLocation();

  return (
    <div className="phone-menu">
      <div className="phone-menu-container">
        <div className="phone-menu-item">search</div>
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
