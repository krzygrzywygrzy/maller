import { useEffect, useState } from "react";
import SearchBy from "../interfaces/searchBy";
import fetchResults from "./resultsService";

/**
 * custom hook to get search results from firestore
 * @param getResults -> funtion that must return dispatch(getResultsAction)
 * @param searchBy -> must be {SearchByCategory | SearchBySubcategory | SearchByPhrase } @class
 * @returns {success: boolean} -> false = "error"; true = "success"
 */

//TODO: resolve bug with dissapearing results
const useSearchResults = (searchBy: SearchBy) => {
  //const [success, setSuccess] = useState<boolean>();
  useEffect(() => {
    const get = async () => {
      const res = await fetchResults(searchBy);
      console.log(res);
    };
    get();
  }, []);
  // return success;
};

export default useSearchResults;
