import { useState, useEffect } from "react";
import SearchBy, { SearchByCategory, SearchByPhrase, SearchBySubcategory } from "../models/searchBy";
import { db } from "./firebase.config";

/**
 * Gets options that results can be filtered by
 * @param searchBy type of searching that results depend on
 * @returns {status, data}
 */
const useGetFilterOptions = (searchBy: SearchBy) => {
  const [status, setStatus] = useState<string>("idle");
  const [data, setData] = useState<any>({});

  useEffect(() => {
    /**
     * gets options for category
     */
    const getOptions = async (category: string) => {
      const query = await db.collection("categories").doc(category).get();
      return query.data();
    };

    const get = async () => {
      setStatus("pending");
      try {
        if (searchBy instanceof SearchByCategory) {
          const options = await getOptions(searchBy.category);
        } else if (searchBy instanceof SearchBySubcategory) {
          throw Error("Unimplemented");
        } else if (searchBy instanceof SearchByPhrase) {
          throw Error("Unimplemented");
        }
      } catch (err) {
        setStatus("error");
      }
    };
    get();
  }, [searchBy]);

  return { status, data };
};

export default useGetFilterOptions;
