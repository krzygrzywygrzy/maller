import { Action, ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { auth, db } from "../../services/firebase.config";
import { rootState } from "../reducers/rootReducer";
import firebase from "firebase";
import User from "../../interfaces/user";

/**
 * Redux Thunk actions for user authorization
 */

/**
 * handles user sign up
 *
 * @param email -> email user provides in SignUpPage
 * @param password -> password user provides in SignUpPAge
 *
 * calls {authenticate()} to dispatch action
 */
const signUpAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, Action>
> = (password: string, user: User) => {
  return async (dispatch: ThunkDispatch<rootState, void, Action>) => {
    auth
      .createUserWithEmailAndPassword(user.email, password)
      .then((userCredential) => {
        if (userCredential.user?.uid !== undefined) {
          user.uid = userCredential.user.uid;
          db.collection("users").doc(userCredential.user.uid).set(user);
          authenticate(userCredential, dispatch);
        }
      })
      .catch((err) => {
        //TODO: handle errors
        console.log(err);
      });
  };
};

/**
 * handles user login
 *
 * @param email -> email user provides in LogInPage
 * @param password -> password user provides in LogInPage
 *
 *  calls {authenticate()} to dispatch action
 */
const logInAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, Action>
> = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<rootState, void, Action>) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentail) => {
        authenticate(userCredentail, dispatch);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const authenticate = (
  userCredential: firebase.auth.UserCredential,
  dispatch: ThunkDispatch<rootState, void, Action>
) => {
  console.log(userCredential);
};

export { signUpAction, logInAction };
