import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../../core/productCard/productCard";
import Product from "../../interfaces/product";
import "./results.css";
import { rootState } from "../../store/reducers/rootReducer";
import SearchBy from "../../interfaces/searchBy";

import useSearchResults from "../../services/useSearchResults";

interface ResultsPageProps {
  searchBy: SearchBy;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  searchBy,

}: ResultsPageProps) => {

  useEffect(() => {
    document.title = "results";
  }, []);

  const success = useSearchResults(searchBy);

  return (
    <div>
      <div className="container">
        <div className="product-grid">
          {/* {results.length > 0 ? (
            results.map((item, index) => {
              return <ProductCard product={item} key={index} />;
            })
          ) : (
            <div>Nothing found</div>
          )} */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    searchBy: state.searchBy,
  };
};



export default connect(mapStateToProps)(ResultsPage);
