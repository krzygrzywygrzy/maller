import { Dispatch } from "redux";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { BasketItem } from "../../models/basket";
import { rootState } from "../reducers/rootReducer";
import { BasketAction } from "../reducers/shoppingBasketReducer";

/**
 * Redux Thunk actions for basket
 */

/**
 * handles adding items to basket
 *
 * @param item {BasketItem} -> item added to basket
 */
const basketAddAction: ActionCreator<
  ThunkAction<void, rootState, void, BasketAction>
> = (item: BasketItem) => {
  return (dispatch: Dispatch<BasketAction>) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };
};

//TODO: check if item exists in basket and if so add only extra amount

/**
 *
 * @param index -> index of the item in state array
 */
const basketRemoveAction: ActionCreator<
  ThunkAction<void, rootState, void, BasketAction>
> = (index: number) => {
  return (dispatch: Dispatch<BasketAction>) => {
    dispatch({ type: "REMOVE_ITEM", payload: index });
  };
};

export { basketAddAction, basketRemoveAction };
