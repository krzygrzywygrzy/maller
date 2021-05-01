import { combineReducers } from "redux";
import Basket from "../../models/basket";
import Category from "../../models/categories";
import User from "../../models/user";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import shoppingBasketReducer from "./shoppingBasketReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import SearchBy from "../../models/searchBy";
import searchByReducer from "./searchByReducer";

/**
 * rootState interface
 * defines what kind of data rootReducer returns
 */
interface rootState {
  basket: Basket;
  categories: Array<Category>;
  user: User;
  searchBy: SearchBy;
}

/**
 * Redux rootReducer that combines other reducers
 */
const rootReducer = combineReducers<rootState>({
  basket: shoppingBasketReducer,
  categories: categoryReducer,
  user: authReducer,
  searchBy: searchByReducer,
});

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

export default persistReducer(persistConfig, rootReducer);
export type { rootState };
