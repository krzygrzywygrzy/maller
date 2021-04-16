import React from "react";
import { connect } from "react-redux";
import ProductCard from "../../core/productCard/productCard";
import Product from "../../interfaces/product";
import "./results.css";

import { rootState } from "../../store/reducers/rootReducer";
import SearchBy from "../../interfaces/searchBy";

interface ResultsPageProps {
  searchBy: SearchBy;
  results: Array<Product>;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  searchBy,
  results,
}: ResultsPageProps) => {
  document.title = "results";

  console.log(searchBy);

  return (
    <div>
      <div className="container">
        <div className="product-grid">
          {results.map((item, index) => {
            return <ProductCard product={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    searchBy: state.searchBy,
    results: state.results,
  };
};

export default connect(mapStateToProps)(ResultsPage);
