import SearchBy from "../../models/searchBy";

const initState: SearchBy = {};

type SearchByAction = { type: "SET_RESULTS"; payload: SearchBy };

/**
 * searchByReducer -> keeps & @returns search parameters to find desirable products
 * @param state -> state of reducer; might be {SearchByCategory | SearchBySubcategory | SearchByPhrase } @class
 */
const searchByReducer = (state = initState, action: SearchByAction) => {
  switch (action.type) {
    case "SET_RESULTS":
      state = action.payload;
  }

  return state;
};

export default searchByReducer;
export type { SearchByAction };
