import Basket, { BasketItem } from "../../models/basket";

const initState: Basket = {
  items: [],
};

type BasketAction =
  | { type: "ADD_ITEM"; payload: BasketItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CHANGE_AMOUNT"; payload: { index: number; amount: number } }
  | { type: "CLEAR_BASKET" }
  | { type: "ADD_ITEM_AMOUNT"; payload: { amount: number; index: number } };

const shoppingBasketReducer = (
  state: Basket = initState,
  action: BasketAction
) => {
  let newState: Array<BasketItem>;
  switch (action.type) {
    case "ADD_ITEM":
      newState = [...state.items, action.payload];
      return { items: newState };
    case "REMOVE_ITEM":
      newState = state.items.filter((_, i) => i !== action.payload);
      return { items: newState };
    case "CHANGE_AMOUNT":
      newState = state.items;
      newState[action.payload.index].amount = action.payload.amount;
      return { items: newState };
    case "CLEAR_BASKET": {
      return { items: [] };
    }
    case "ADD_ITEM_AMOUNT": {
      newState = state.items;
      newState[action.payload.index].amount += action.payload.amount;
      return { items: newState };
    }
    default:
      return state;
  }
};

export default shoppingBasketReducer;
export type { BasketAction };
