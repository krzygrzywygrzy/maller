import { ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import showSnackBar from "../../core/functions/snackBar";
import Product from "../../interfaces/product";
import SearchBy, {
  SearchByCategory,
  SearchByPhrase,
  SearchBySubcategory,
} from "../../interfaces/searchBy";
import { db } from "../../services/firebase.config";
import { ResultsAction } from "../reducers/resultsReducer";
import { rootState } from "../reducers/rootReducer";

/**
 * action that dispatches to {resultsReducer} @reducer
 * @param searchBy -> might be {SearchByCategory | SearchBySubcategory | SearchByPhrase } @class
 */

const getResultsAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, ResultsAction>
> = (searchBy: SearchBy) => {
  let list: Array<Product> = [];
  return async (dispatch: ThunkDispatch<rootState, void, ResultsAction>) => {
    if (searchBy instanceof SearchByCategory) {
      list = await getByCateogry(searchBy as SearchByCategory);
    } else if (searchBy instanceof SearchBySubcategory)
      getBySubcategory(searchBy as SearchBySubcategory);
    else if (searchBy instanceof SearchByPhrase)
      getByPhrase(searchBy as SearchByPhrase);
    else {
      showSnackBar("Wrong search arguments!");
    }
    dispatch({ type: "LOAD_PRODUCTS", payload: list });
  };
};

const getByCateogry = async (
  payload: SearchByCategory
): Promise<Array<Product>> => {
  let list: Array<Product> = [];
  db.collection(payload.category)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const products = doc.data()?.products;
        if (products !== undefined) {
          products.forEach((product) => {
            list.push({
              name: product.name,
              inStock: product.inStock,
              price: product.price,
            });
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return list;
};

const getBySubcategory = async (payload: SearchBySubcategory) => {
  console.log(payload.subcategory);
};

const getByPhrase = async (payload: SearchByPhrase) => {
  console.log(payload.phrase);
};

export { getResultsAction };
