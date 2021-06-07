import React from "react";
import { OrderCardImg } from "../orderCard/orderCard";
import { Link } from "wouter";

interface SearchBoxProps {
  results: any;
  hideMenu(): void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ results, hideMenu }) => {
  return (
    <div className="search-box-results">
      {results.status === "success" ? (
        <div>
          {results.data.length > 0 ? results.data.map((item, index) => {
            return (
              <Link key={index} href={`/item/${item.objectID}`} onClick={() => hideMenu()}>
                <div className="search-result-card">
                  <OrderCardImg alt="img" imgSource={item.image} />{" "}
                  <div className="search-result-card-info">
                    <span>{item.name}</span>
                    <span>Category: {item.category}</span>
                  </div>
                </div>
              </Link>
            );
          }) : <div className="search-loading">no results...</div>}
        </div>
      ) : (
        <div className="search-loading">loading...</div>
      )}
    </div>
  );
};

export default SearchBox;
