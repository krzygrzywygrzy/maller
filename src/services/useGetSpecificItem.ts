import { useEffect, useState } from "react";
import { DbError } from "../core/errors/errors";
import showSnackBar from "../core/functions/snackBar";
import Product from "../interfaces/product";
import SearchBy, {
  SearchByPhrase,
  SearchBySubcategory,
} from "../interfaces/searchBy";
import { db } from "./firebase.config";

/**
 * custom hook to get
 * @param id
 * @param searchBy
 * @returns query {status}: @string && {item}: @product
 */
const useGetSpecificItem = (id: string, searchBy: SearchBy) => {
  const [status, setStatus] = useState<string>("idle");
  const [item, setItem] = useState<Product>();

  useEffect(() => {
    const get = async () => {
      let response: any;

      setStatus("pending");
      if (searchBy instanceof SearchBySubcategory) {
        response = await getInSubCategory(searchBy, id);
      } else if (searchBy instanceof SearchByPhrase) {
        response = await getInPhrase();
      } else {
        showSnackBar("Wrong search arguments!");
      }

      if (response instanceof DbError) {
        setStatus("error");
        showSnackBar(response.message);
      } else {
        setItem(response);
        setStatus("success");
      }
    };

    get();
  }, [id, searchBy]);
  return { status, item };
};

/**
 *
 * @param payload {SearchBySubcategory} -> decides where to search for the document
 * @param id -> document id of the item
 * @returns {Product} or {DbError} when error accured
 */
const getInSubCategory = async (
  payload: SearchBySubcategory,
  id: string
): Promise<Product | DbError> => {
  const query = await db
    .collection(payload.category)
    .doc(payload.subcategory)
    .collection(payload.subcategory)
    .doc(id)
    .get();

  //TODO: update the products in db to have more fields
  const data = query.data();
  if (data !== undefined) {
    return {
      name: data.name,
      price: data.price,
      inStock: data.inStock,
      description: data.description,
      rating: data.rating,
    };
  } else {
    return new DbError("Cannot get data! Check your internet connection!");
  }
};

const getInPhrase = async (): Promise<Product | DbError> => {
  throw Error("unimplemented");
};

export default useGetSpecificItem;
