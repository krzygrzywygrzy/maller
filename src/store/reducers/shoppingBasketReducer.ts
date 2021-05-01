import Basket, { BasketItem } from "../../models/basket";

const initState: Basket = {
  items: [],
};

type BasketAction =
  | { type: "ADD_ITEM"; payload: BasketItem }
  | { type: "REMOVE_ITEM"; payload: number };

const shoppingBasketReducer = (
  state: Basket = initState,
  action: BasketAction
) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
};

export default shoppingBasketReducer;
export type { BasketAction };
