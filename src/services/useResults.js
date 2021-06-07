import { useState, useEffect } from "react";
import { index } from "./firebase.config";

const useResults = (phrase) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        setStatus("pending");
        const query = await index.search(phrase, { attributesToRetrieve: ["objectID", "name", "price", "image"] });
        setData(query.hits);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    get();
  }, [phrase]);

  return { data, status };
};

export default useResults;
