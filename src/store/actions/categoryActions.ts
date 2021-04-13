import { ActionCreator } from "redux";
import { db } from "../../services/firebase.config";
import Category from "../../interfaces/categories";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rootState } from "../reducers/rootReducer";
import { CategoryAction } from "../reducers/categoryReducer";

/**
 * Redux Thunk action for categories
 * gets cateogry list from firebase
 * dispatches {categoryReducer} 'LOAD_CATEGORIES' action
 */
const getCategoryAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, CategoryAction>
> = () => {
  return async (
    dispatch: ThunkDispatch<rootState, void, CategoryAction>
  ): Promise<void> => {
    let categories: Array<Category> = [];

    db.collection("categories")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((el) => {
          categories.push({ main: el.data().main, sub: el.data().sub });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch({ type: "LOAD_CATEGORIES", payload: categories });
  };
};

export { getCategoryAction };
