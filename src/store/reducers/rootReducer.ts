import { combineReducers } from "redux";
import Basket from "../../interfaces/basket";
import Category from "../../interfaces/categories";
import categoryReducer from "./categoryReducer";
import shoppingBasketReducer from "./shoppingBasketReducer";

/**
 * rootState interface
 * defines what kind of data rootReducer returns
 */
interface rootState {
  basket: Basket;
  categories: Array<Category>;
}

/**
 * Redux rootReducer that combines other reducers
 */
const rootReducer = combineReducers<rootState>({
  basket: shoppingBasketReducer,
  categories: categoryReducer,
});

export default rootReducer;
export type { rootState };
