import Basket from "../models/basket";
import { auth, db } from "./firebase.config";
import firebase from "firebase";

type Feedback = "success" | "error";

const checkoutService = async (basket: Basket, payment: string): Promise<Feedback> => {
    if (auth.currentUser?.uid){

        //add the order to collection 
        await db.collection("users").doc(auth.currentUser.uid).update({
            orders: firebase.firestore.FieldValue.arrayUnion({
                basket, paymentStatus: payment === "cash on delivery" ? "cash on delivery": "paid"               
            })
        });
        
        //TODO: check if data is order is added to collection

        //decrease amount of items in db
        for(let i = 0; i< basket.items.length; i++)
            decreaseItemAmount(basket.items[i].path);
    }

    return "success";
}

/**
 * decreases amount of item in db
 * @param path -> path to the product 
 */
const decreaseItemAmount = (path: string) => {
    db.doc(path).update({
        inStock: firebase.firestore.FieldValue.increment(-1)
    });
}

export default checkoutService;