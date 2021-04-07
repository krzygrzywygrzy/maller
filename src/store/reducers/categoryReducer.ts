import Categories from "../../interfaces/categories"

const initState: Categories = {
    main: [
        "Music", "Books", "Films", "Health", "Home", "Electronics"
    ],
} 

type Action = | {type: "LOAD_CATEGORIES", payload: Categories};

const categoryReducer = (state = initState, action: Action) => {
    return state;
}

export default categoryReducer;