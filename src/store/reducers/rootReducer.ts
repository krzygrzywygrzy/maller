import { combineReducers } from "redux";
import Basket from "../../interfaces/basket";
import Category from "../../interfaces/categories";
import User from "../../interfaces/user";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import shoppingBasketReducer from "./shoppingBasketReducer";

/**
 * rootState interface
 * defines what kind of data rootReducer returns
 */
interface rootState {
  basket: Basket;
  categories: Array<Category>;
  user: User;
}

/**
 * Redux rootReducer that combines other reducers
 */
const rootReducer = combineReducers<rootState>({
  basket: shoppingBasketReducer,
  categories: categoryReducer,
  user: authReducer,
});

export default rootReducer;
export type { rootState };
