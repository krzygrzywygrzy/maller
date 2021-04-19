import showSnackBar from "../core/functions/snackBar";
import Product from "../interfaces/product";
import SearchBy, {
  SearchByCategory,
  SearchByPhrase,
  SearchBySubcategory,
} from "../interfaces/searchBy";
import { db } from "./firebase.config";

const fetchResults = async (searchBy: SearchBy): Promise<Array<Product>> => {
  let results: Array<Product> = [];
  if (searchBy instanceof SearchByCategory) {
    results = await getByCateogry(searchBy as SearchByCategory);
  } else if (searchBy instanceof SearchBySubcategory)
    getBySubcategory(searchBy as SearchBySubcategory);
  else if (searchBy instanceof SearchByPhrase)
    getByPhrase(searchBy as SearchByPhrase);
  else {
    showSnackBar("Wrong search arguments!");
  }

  return results;
};

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
  console.log(payload.subcategory);
};

const getByPhrase = async (payload: SearchByPhrase) => {
  console.log(payload.phrase);
};

export default fetchResults;
