import { useEffect, useState } from "react";
import SearchBy from "../interfaces/searchBy";

/**
 * custom hook to get search results from firestore
 * @param getResults -> funtion that must return dispatch(getResultsAction)
 * @param searchBy -> must be {SearchByCategory | SearchBySubcategory | SearchByPhrase } @class
 */
const useSearchResults = (getResults: Function, searchBy: SearchBy) => {
  useEffect(() => {
    getResults();
  }, []);
};

export default useSearchResults;
