import { useEffect, useState } from "react";
import SearchBy from "../interfaces/searchBy";

/**
 * custom hook to get search results from firestore
 * @param getResults -> funtion that must return dispatch(getResultsAction)
 * @param searchBy -> must be {SearchByCategory | SearchBySubcategory | SearchByPhrase } @class
 * @returns {success: boolean} -> false = "error"; true = "success"
 */
const useSearchResults = (getResults: Function, searchBy: SearchBy) => {
  const [success, setSuccess] = useState<boolean>();
  useEffect(() => {
    getResults(searchBy);
  }, [searchBy, getResults]);
  return success;
};

export default useSearchResults;
