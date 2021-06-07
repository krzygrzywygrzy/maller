import { useState, useEffect } from "react";
import { index } from "./firebase.config";

const useGetItemByObjectID = (objectID) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState({});

  useEffect(() => {
    const get = async () => {
      try {
        const query = await index.getObject(objectID);
        setStatus("success");
        setData(query);
      } catch (err) {
        setStatus("error");
      }
    };

    get();
  }, [objectID]);

  return { status, data };
};

export default useGetItemByObjectID;
