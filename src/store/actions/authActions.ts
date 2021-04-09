import { Dispatch } from "redux";
import { auth } from "../../services/firebase.config";

const signUpAction = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log(user);
      })
      .catch((err) => {
        //TODO: handle errors
        console.log(err);
      });
  };
};

export { signUpAction };
