import { useState, useEffect } from "react";
import Product from "../models/product";

type SearchStatus =
  | "idle"
  | "pending"
  | "success"
  | "loadnew"
  | "loadnew error";

interface SearchResults {
  status: string;
  data: Product[];
}

const useSearchInDB = (phrase: string): SearchResults => {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [data, setData] = useState<Array<Product>>([]);

  useEffect(() => {
    const search = async () => {
      //TODO: search using algolia
    };

    search();
  }, [phrase]);

  return { status, data };
};

export default useSearchInDB;
export type { SearchResults };
