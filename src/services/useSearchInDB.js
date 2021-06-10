import { useState, useEffect } from "react";
import { index } from "./firebase.config";

/**
 * custom hook that manages to get product that match phrase
 * @param phrase -> the text user provided in search input
 * @returns -> {status}: request status; {data} -> Object containing ["objectID", "name", "category", "image"]
 */
const useSearchInDB = (phrase) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);

  useEffect(() => {
    const search = async () => {
      try {
        if (phrase.length > 2) {
          setStatus("pending");
          const query = await index.search(phrase, {
            attributesToRetrieve: ["objectID", "name", "category", "image"],
          });
          setStatus("success");
          setData(query.hits);
        }
      } catch (e) {
        setStatus("error");
      }
    };

    search();
  }, [phrase]);

  return { status, data };
};

export default useSearchInDB;
