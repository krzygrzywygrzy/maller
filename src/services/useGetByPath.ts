import { useState, useEffect } from "react";
import { DbError } from "../core/errors/errors";
import { BasketItem } from "../models/basket";
import Product from "../models/product";
import { db } from "./firebase.config";

const useGetByPath = (payload: Array<BasketItem>) => {
  const [status, setStatus] = useState<string>("idle");
  const [items, setItems] = useState<Array<Product>>([]);

  useEffect(() => {
    const get = async () => {
      if (payload.length > 0) {
        let arr: Array<Product> = [];
        setStatus("pending");
        for (let i = 0; i <= payload.length - 1; i++) {
          let item = await getByPath(payload[i].objectID);
          if (item instanceof DbError) {
            setStatus("error");
            break;
          } else {
            arr.push(item);

            if (i === payload.length - 1) {
              setStatus("success");
              setItems(arr);
            }
          }
        }
      }
    };

    get();
  }, [payload]);
  return { status, items };
};

const getByPath = async (payload: string): Promise<DbError | Product> => {
  const response = await db.doc(payload).get();
  const doc = response.data();

  if (doc !== undefined) {
    return {
      name: doc.name,
      inStock: doc.inStock,
      price: doc.price,
      image: doc.image,
    };
  } else return new DbError("cannot get item");
};

export default useGetByPath;
export { getByPath };
