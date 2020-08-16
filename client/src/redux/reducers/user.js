import { USER_LOGIN, USER_LOGOUT, USER_EDIT } from "../constants";

const INITIAL_STATE = {
  isAuth: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    }
    case USER_LOGOUT:
      return { isAuth: false };
    case USER_EDIT:
      return {
        ...state,
        ...action.payload.user,
      };
    default:
      return state;
  }
};

export default user;
