import Basket from "../../interfaces/basket";

const initState: Basket = {
    items: [],
};

const shoppingBasketReducer = (state: Basket = initState, action: String) => {
    switch(action){
        default:
            break;
    }
    return state;
}

export default shoppingBasketReducer;