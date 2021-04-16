import { ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import SearchBy, { SearchByCategory } from "../../interfaces/searchBy";
import { ResultsAction } from "../reducers/resultsReducer";
import { rootState } from "../reducers/rootReducer";

/**
 * action that dispatches to {resultsReducer} @reducer
 * @param searchBy -> might be {SearchByCategory | SearchBySubcategory | SearchByPhrase } @class
 */

const getResultsAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, ResultsAction>
> = (searchBy: SearchBy) => {
  return async (dispatch: ThunkDispatch<rootState, void, ResultsAction>) => {
    console.log("getting results!");
    //TODO: check type of searchBy
  };
};

export { getResultsAction };
