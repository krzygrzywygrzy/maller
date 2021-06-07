import React from "react";
import { OrderCardImg } from "../orderCard/orderCard";

interface SearchBoxProps {
  results: any;
}

const SearchBox: React.FC<SearchBoxProps> = ({ results }) => {
  return (
    <div className="search-box-results">
      {results.status === "success" ? (
        <div>
          {results.data.map((item, index) => {
            return (
              <div className="search-result-card" key={index}>
                <OrderCardImg alt={item.name} imgSource={item.image} />{" "}
                <div className="search-result-card-info">
                  <span>{item.name}</span>
                  <span>Category: {item.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="search-loading">loading...</div>
      )}
    </div>
  );
};

export default SearchBox;
