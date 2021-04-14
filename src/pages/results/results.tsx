import React from "react";
import { connect } from "react-redux";
import Results from "../../interfaces/results";
import { rootState } from "../../store/reducers/rootReducer";

interface ResultsPageProps {
  results: Results;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  results,
}: ResultsPageProps) => {
  console.log(results);

  return <div>results</div>;
};

const mapStateToProps = (state: rootState) => {
  return {
    results: state.results,
  };
};

export default connect(mapStateToProps)(ResultsPage);
