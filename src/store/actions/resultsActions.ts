import { ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import showSnackBar from "../../core/functions/snackBar";
import SearchBy, {
  SearchByCategory,
  SearchByPhrase,
  SearchBySubcategory,
} from "../../interfaces/searchBy";
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
    if (searchBy instanceof SearchByCategory)
      getByCateogry(searchBy as SearchByCategory);
    else if (searchBy instanceof SearchBySubcategory)
      getBySubcategory(searchBy as SearchBySubcategory);
    else if (searchBy instanceof SearchByPhrase)
      getByPhrase(searchBy as SearchByPhrase);
    else {
      showSnackBar("Wrong search arguments!");
    }
  };
};

const getByCateogry = async (payload: SearchByCategory) => {
  console.log(payload.category);
};

const getBySubcategory = async (payload: SearchBySubcategory) => {
  console.log(payload.subcategory);
};

const getByPhrase = async (payload: SearchByPhrase) => {
  console.log(payload.phrase);
};

export { getResultsAction };
