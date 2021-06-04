import { useState, useEffect } from "react";
import Product from "../models/product";

type SearchStatus =
  | "idle"
  | "pending"
  | "success"
  | "loadnew"
  | "loadnew error";

const useSearchInDB = (phrase: string) => {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [data, setData] = useState<Array<Product>>([]);

  useEffect(() => {
    const search = async () => {
      //TODO: search using algolia
    };
  }, [phrase]);
};

export default useSearchInDB;
