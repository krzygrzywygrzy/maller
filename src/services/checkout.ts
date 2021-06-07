import Basket from "../models/basket";
import { auth, db } from "./firebase.config";
import firebase from "firebase";

type Feedback = "success" | "error";

const checkoutService = async (
  basket: Basket,
  payment: string
): Promise<Feedback> => {
  try {
    if (auth.currentUser?.uid) {
      //add the order to collection
      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .update({
          orders: firebase.firestore.FieldValue.arrayUnion({
            basket,
            paymentStatus:
              payment === "cash on delivery" ? "cash on delivery" : "paid",
          }),
        });

      //TODO: decrease amount of items in db
      
    }
  } catch {
    //TODO:
  }

  return "success";
};

export default checkoutService;
