import Basket from "../../models/basket";
import Product from "../../models/product";

const initState: Basket = {
  items: [
    // {name: "DVD", price: 13, category: "Music", inStock: 13, image: ""}
  ],
};

type Action = { type: "ADD_ITEM"; payload: Product };

const shoppingBasketReducer = (state: Basket = initState, action: Action) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
};

export default shoppingBasketReducer;
