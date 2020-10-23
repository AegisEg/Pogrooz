import { GET_SETTINGS } from "../constants";

const INITIAL_STATE = {
  menu: [],
  settings: {},
  isGetted: false,
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SETTINGS: {
      return {
        menu: action.payload.menu,
        settings: action.payload.settings,
        isGetted: true,
      };
    }
    default:
      return state;
  }
};

export default settings;
