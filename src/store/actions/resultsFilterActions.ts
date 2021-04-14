import { Dispatch } from "react";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import ResultsFilter from "../../interfaces/results";
import { ResultsFilterAction } from "../reducers/resultsFilterReducer";

import { rootState } from "../reducers/rootReducer";

const setResultsAction: ActionCreator<
  ThunkAction<void, rootState, void, ResultsFilterAction>
> = (results: ResultsFilter) => {
  return (dispatch: Dispatch<ResultsFilterAction>) => {
    dispatch({ type: "SET_RESULTS", payload: results });
  };
};

export { setResultsAction };
