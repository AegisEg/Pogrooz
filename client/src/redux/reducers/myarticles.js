import { ARTICLESLOAD } from "../constants";

const INITIAL_STATE = {
  my: [],
  taking: [],
};

const articles = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ARTICLESLOAD: {
      return {
        ...state,
        my: action.payload.my,
        taking: action.payload.taking,
      };
    }
    default:
      return state;
  }
};

export default articles;
