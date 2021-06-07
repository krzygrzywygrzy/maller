import { useState, useEffect } from "react";
import { index } from "./firebase.config";

const useSearchInDB = (phrase) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);

  useEffect(() => {
    const search = async () => {
      try {
        if (phrase > 4) {
          const query = await index.search(phrase, { attributesToRetrieve: ["objectID", "name", "category", "image"] });
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
