import User from "../../models/user";

const initState: User = {
  name: "",
  surname: "",
  email: "",
};

type AuthAction = { type: "AUTH_USER"; payload: User } | { type: "LOG_OUT" };

const authReducer = (state: User = initState, action: AuthAction) => {
  switch (action.type) {
    case "AUTH_USER":
      state = action.payload;
      break;
    case "LOG_OUT":
      state = initState;
      break;
  }
  return state;
};

export default authReducer;
export type { AuthAction };
