import Category from "../../interfaces/categories";

const initState: Array<Category> = [];

type Action = { type: "LOAD_CATEGORIES"; payload: Array<Category> };

/**
 * categoryReducer
 * manages to return goods categories
 */
const categoryReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case "LOAD_CATEGORIES":
      state = action.payload;
  }
  return state;
};

export default categoryReducer;
