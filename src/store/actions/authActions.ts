import { Action, ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { auth } from "../../services/firebase.config";
import { rootState } from "../reducers/rootReducer";

const signUpAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, Action>
> = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<rootState, void, Action>) => {
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

const logInAction: ActionCreator<
  ThunkAction<Promise<void>, rootState, void, Action>
> = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<rootState, void, Action>) => {
    throw Error("Log in unimplemented");
  };
};

export { signUpAction };
