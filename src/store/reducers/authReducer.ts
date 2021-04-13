import User from "../../interfaces/user";

const initState: User = {
  name: "",
  surname: "",
  email: "",
};

const authReducer = (state: User = initState, action: Object) => {
  return state;
};

export default authReducer;
