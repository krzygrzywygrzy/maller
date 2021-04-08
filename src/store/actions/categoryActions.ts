import { Dispatch } from "redux";
import { db } from "../../services/firebase.config"
import firebase from "firebase";
import Categories, { Category } from "../../interfaces/categories";

const getCategoryAction = () => {
    return async (dispatch: Dispatch) => {
        let categories: Array<Category> = [];

        const snapshot: firebase.firestore.QuerySnapshot = await db.collection("categories").get();
        const res = await snapshot.docs;
        res.forEach((el) => {
            categories.push({main: el.data().main, sub: el.data().sub});
        });

        dispatch({type: "LOAD_CATEGORIES", payload: categories});
    }
}

export { getCategoryAction }