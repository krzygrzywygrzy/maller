import Basket from "../../interfaces/basket";
import Product from "../../interfaces/product";

const initState: Basket = {
    items: [],
};

type Action = | { type: "ADD_ITEM", payload: Product };

const shoppingBasketReducer = (state: Basket = initState, action: Action) => {
    switch(action){
        default:
            break;
    }
    return state;
}

export default shoppingBasketReducer;