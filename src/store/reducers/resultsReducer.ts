import Product from "../../interfaces/product";

const initState: Array<Product> = [];

type ResultsAction = { type: "LOAD_PRODUCTS"; payload: Array<Product> };

const resultsReducer = (state = initState, action: ResultsAction) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default resultsReducer;
export type { ResultsAction };
