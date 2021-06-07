import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductCard from "../../core/productCard/productCard";
import "./results.css";
import { rootState } from "../../store/reducers/rootReducer";
import SearchBy from "../../models/searchBy";
import useResults from "../../services/useResults";

interface ResultsPageProps {
  searchBy: SearchBy;
  query?: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  searchBy,
  query,
}: ResultsPageProps) => {
  useEffect(() => {
    document.title = `results - ${query}`;
  }, [query]);

  const results = useResults(query);
  
  return (
    <div>
      <div className="container">
        {results.status === "success" ? (
          results.data.length > 0 ? (
            <div className="product-grid">
              {results.data.map((item, index) => {
                return <ProductCard product={item} key={index} />;
              })}
            </div>
          ) : (
            <div className="empty-list ">nothing found</div>
          )
        ) : (
          <div className="loading">
            <span>loading...</span>
          </div>
        )}
      </div>
      {results.state === "success" && results.items.length > 0 && (
        <div className="results-side-menu">
          {/* <span>Filters</span> */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    searchBy: state.searchBy,
  };
};

export default connect(mapStateToProps)(ResultsPage);
