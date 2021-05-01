import { useEffect, useState } from "react";
import Product from "../models/product";
import SearchBy, {
  SearchByCategory,
  SearchBySubcategory,
} from "../models/searchBy";
import { getByCateogry, getBySubcategory } from "./resultsService";

/**
 * custom hook to get search results from firestore
 * @param getResults -> funtion that must return dispatch(getResultsAction)
 * @param searchBy -> must be {SearchByCategory | SearchBySubcategory | SearchByPhrase } @class
 * @returns {ResultsList}
 */

class ResultsList {
  constructor(s: string, i: Array<Product>) {
    this.state = s;
    this.items = i;
  }
  state: string;
  items: Array<Product>;
}

const useSearchResults = (searchBy: SearchBy): ResultsList => {
  const [status, setStatus] = useState<string>("idle");
  const [items, setItems] = useState<Array<Product>>([]);

  useEffect(() => {
    const get = async () => {
      setStatus("pending");
      if (searchBy instanceof SearchByCategory) {
        setItems(await getByCateogry(searchBy));
        setStatus("success");
      } else if (searchBy instanceof SearchBySubcategory) {
        setItems(await getBySubcategory(searchBy));
        setStatus("success");
      }
    };

    get();
  }, [searchBy]);
  return new ResultsList(status, items);
};

export default useSearchResults;
export { ResultsList };
