import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductCard from "../../core/productCard/productCard";
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

  const results = useSearchResults(searchBy);

  return (
    <div>
      <div className="container">
        <div>{results.state}</div>
        <div className="product-grid"></div>
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

//return <ProductCard product={item} key={index} />;
