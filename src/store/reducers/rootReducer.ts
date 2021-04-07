import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import shoppingBasketReducer from "./shoppingBasketReducer";

const rootReducer = combineReducers({
    basket: shoppingBasketReducer,
    categories: categoryReducer,
});

export default rootReducer;