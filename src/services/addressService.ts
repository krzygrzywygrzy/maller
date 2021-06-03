import { auth, db } from "./firebase.config";
import firebase from "firebase";
import Address from "../models/address";
import showSnackBar from "../core/functions/snackBar";

const saveAddressService = (address: Address) => {
  try {
    if (auth.currentUser?.uid) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update({
          addresses: firebase.firestore.FieldValue.arrayUnion({ address }),
        });
    }
  } catch {
    showSnackBar("Cannot save address! Check your internet connection!");
  }
};

export default saveAddressService;
