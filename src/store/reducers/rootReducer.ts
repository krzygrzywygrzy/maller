import { combineReducers } from "redux";
import shoppingBasketReducer from "./shoppingBasketReducer";

const rootReducer = combineReducers({
    basket: shoppingBasketReducer,
});

export default rootReducer;