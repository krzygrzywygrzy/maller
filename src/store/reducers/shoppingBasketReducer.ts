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
  let newState;
  switch (action.type) {
    case "ADD_ITEM":
      newState = [...state.items, action.payload];
      return { items: newState };
    case "REMOVE_ITEM":
      console.log(action.payload);
      newState = state.items.filter((_, i) => i !== action.payload);
      return { items: newState };
    default:
      return state;
  }
};

export default shoppingBasketReducer;
export type { BasketAction };
