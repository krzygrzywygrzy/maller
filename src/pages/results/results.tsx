import React, { Dispatch } from "react";
import { connect } from "react-redux";
import ProductCard from "../../core/productCard/productCard";
import Product from "../../interfaces/product";
import "./results.css";

import { rootState } from "../../store/reducers/rootReducer";
import SearchBy from "../../interfaces/searchBy";
import { getResultsAction } from "../../store/actions/resultsActions";
import useSearchResults from "../../services/useSearchResults";

interface ResultsPageProps {
  searchBy: SearchBy;
  results: Array<Product>;
  getResultsAction: Function;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  searchBy,
  results,
  getResultsAction,
}: ResultsPageProps) => {
  document.title = "results";
  useSearchResults(getResultsAction, searchBy);

  return (
    <div>
      <div className="container">
        <div className="product-grid">
          {results.length > 0 ? (
            results.map((item, index) => {
              return <ProductCard product={item} key={index} />;
            })
          ) : (
            <div>
              <span>loading...</span>
            </div>
          )}
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

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getResultsAction: () => {
      dispatch(getResultsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
