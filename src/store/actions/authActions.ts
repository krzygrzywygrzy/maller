import { ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { auth, db } from "../../services/firebase.config";
import { rootState } from "../reducers/rootReducer";
import firebase from "firebase";
import User from "../../models/user";
import showSnackBar from "../../core/functions/snackBar";
import { Dispatch } from "redux";
import { AuthAction } from "../reducers/authReducer";

/**
 * Redux Thunk actions for user authorization
 */

/**
 * handles user sign up
 *
 * @param email -> email user provides in SignUpPage
 * @param user -> user data provided in SignUpPage
 * @param redirect -> function that redirects to home screen
 *
 * calls {authenticate()} to dispatch action
 */
const signUpAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, AuthAction>
> = (password: string, user: User, redirect: Function) => {
  return async (dispatch: ThunkDispatch<rootState, void, AuthAction>) => {
    auth
      .createUserWithEmailAndPassword(user.email, password)
      .then((userCredential) => {
        if (userCredential.user?.uid !== undefined) {
          user.uid = userCredential.user.uid;
          db.collection("users").doc(userCredential.user.uid).set(user);
          authenticate(userCredential.user, dispatch, redirect);
        }
      })
      .catch((_) => {
        showSnackBar("Cannot create user account!");
      });
  };
};

/**
 * handles user login
 *
 * @param email -> email user provides in LogInPage
 * @param password -> password user provides in LogInPage
 * @param redirect -> function that redirects to home screen
 *
 *  calls {authenticate()} to dispatch action
 */
const logInAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, AuthAction>
> = (email: string, password: string, redirect: Function) => {
  return async (dispatch: ThunkDispatch<rootState, void, AuthAction>) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user !== null)
          authenticate(userCredential.user, dispatch, redirect);
      })
      .catch((_) => {
        showSnackBar("Cannot log in!");
      });
  };
};

const authenticate = (
  user: firebase.User,
  dispatch: ThunkDispatch<rootState, void, AuthAction>,
  redirect: Function
) => {
  const docRef = db.collection("users").doc(user.uid);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const userData: User = {
          name: data?.name,
          surname: data?.surname,
          email: data?.email,
          uid: data?.uid,
        };
        dispatch({ type: "AUTH_USER", payload: userData });
        redirect();
      } else {
        showSnackBar("No such user!");
      }
    })
    .catch((_) => {
      showSnackBar("Cannot log in!");
    });
};

const logOutAction: ActionCreator<
  ThunkAction<void, rootState, void, AuthAction>
> = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: "LOG_OUT" });
  };
};

export { signUpAction, logInAction, logOutAction };
