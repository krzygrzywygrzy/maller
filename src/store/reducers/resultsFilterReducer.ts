import Results from "../../interfaces/results";

const initState: Results = {};

type ResultsFilterAction = { type: "SET_RESULTS"; payload: Results };

const resultsReducer = (state = initState, action: ResultsFilterAction) => {
  switch (action.type) {
    case "SET_RESULTS":
      state = action.payload;
  }

  return state;
};

export default resultsReducer;
export type { ResultsFilterAction };
