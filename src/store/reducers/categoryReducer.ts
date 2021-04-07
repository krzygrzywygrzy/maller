import Categories from "../../interfaces/categories"

const initState: Categories = {
    main: [
        "Music", "Books", "Films", "Health", "Home", "Electronics"
    ],
    sub: [
        ["Top Hits", "Rock", "Metal"],
        ["Best Sellers", "Thrillers", "Romances"],
        ["Top Hits", "Horrors", "Superheroes"],
        ["Sport Accesories", "Higiene",],
        ["Accesories", "Furniture"],
        ["Smartphones", "Computers", "Tablets"],
    ]
} 

type Action = | {type: "LOAD_CATEGORIES", payload: Categories};

const categoryReducer = (state = initState, action: Action) => {
    return state;
}

export default categoryReducer;