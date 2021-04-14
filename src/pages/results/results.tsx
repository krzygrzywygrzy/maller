import React from "react";
import { connect } from "react-redux";
import ProductCard from "../../core/productCard/productCard";
import Product from "../../interfaces/product";
import ResultsFilter from "../../interfaces/results";
import "./results.css";

import { rootState } from "../../store/reducers/rootReducer";

interface ResultsPageProps {
  resultsFilters: ResultsFilter;
  results: Array<Product>;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  resultsFilters,
  results,
}: ResultsPageProps) => {
  document.title = "results";

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
    resultsFilters: state.resultsFilters,
    results: state.results,
  };
};

export default connect(mapStateToProps)(ResultsPage);
