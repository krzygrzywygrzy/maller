import Product from "../../interfaces/product";

const initState: Array<Product> = [
  {
    name: "Sempiternal",
    description: "DAMN GOOD METALCORE LP",
    price: 40,
    inStock: 100,
  },
  {
    name: "Sempiternal",
    description: "DAMN GOOD METALCORE LP",
    price: 40,
    inStock: 100,
  },
  {
    name: "Sempiternal",
    description: "DAMN GOOD METALCORE LP",
    price: 40,
    inStock: 100,
  },
  {
    name: "Sempiternal",
    description: "DAMN GOOD METALCORE LP",
    price: 40,
    inStock: 100,
  },
];

type ResultsAction = { type: "LOAD_PRODUCTS"; payload: Array<Product> };

const resultsReducer = (state = initState, action: ResultsAction) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      state = action.payload;
      break;
  }
  return state;
};

export default resultsReducer;
export type { ResultsAction };
