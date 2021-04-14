import ResultsFilter from "../../interfaces/results";

const initState: ResultsFilter = {};

type ResultsFilterAction = { type: "SET_RESULTS"; payload: ResultsFilter };

const resultsFilterReducer = (
  state = initState,
  action: ResultsFilterAction
) => {
  switch (action.type) {
    case "SET_RESULTS":
      state = action.payload;
  }

  return state;
};

export default resultsFilterReducer;
export type { ResultsFilterAction };
