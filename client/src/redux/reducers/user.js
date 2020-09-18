import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_EDIT,
  USER_SET_TARIFF,
  USER_SET_GEOLOCATION_ERROR,
  USER_SET_LOCATION_ID,
} from "../constants";

const INITIAL_STATE = {
  isAuth: false,
  tariff: false,
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
    case USER_SET_TARIFF:
      return {
        ...state,
        tariff: action.payload.tariff,
        expiriesTariffAt: action.payload.expiriesTariffAt,
      };
    case USER_SET_GEOLOCATION_ERROR: {
      return {
        ...state,
        geolocationsError: action.payload.error,
      };
    }
    case USER_SET_LOCATION_ID: {
      return {
        ...state,
        geolocationsId: action.payload.id,
      };
    }
    default:
      return state;
  }
};

export default user;
