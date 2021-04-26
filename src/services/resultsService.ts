import Product from "../interfaces/product";
import {
  SearchByCategory,
  SearchByPhrase,
  SearchBySubcategory,
} from "../interfaces/searchBy";
import { db } from "./firebase.config";

const getByCateogry = async (
  payload: SearchByCategory
): Promise<Array<Product>> => {
  let list: Array<Product> = [];

  let documents: Array<string> = [];
  const docsSnapshot = (await db.collection(payload.category).get()).docs;
  docsSnapshot.forEach((el) => {
    documents.push(el.id);
  });

  documents.forEach(async (doc) => {
    const res = await db
      .collection(payload.category)
      .doc(doc)
      .collection(doc)
      .get();

    res.docs.forEach((finalDoc) => {
      const el = finalDoc.data();
      list.push({ name: el.name, price: el.price, inStock: el.inStock });
    });
  });
  return list;
};

const getBySubcategory = async (payload: SearchBySubcategory) => {
  let list: Array<Product> = [];
  const res = await db
    .collection(payload.category)
    .doc(payload.subcategory)
    .collection(payload.subcategory)
    .get();

  res.docs.forEach((finalDoc) => {
    const el = finalDoc.data();
    list.push({ name: el.name, price: el.price, inStock: el.inStock });
  });

  return list;
};

const getByPhrase = async (payload: SearchByPhrase) => {
  console.log(payload.phrase);
};

export { getByCateogry, getBySubcategory, getByPhrase };
