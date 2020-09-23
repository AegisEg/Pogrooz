import {
  GEOARTICLE_SET_LOCATION,
  GEOARTICLES_GET,
  GEOARTICLES_ADD,
  GEOARTICLES_DELETE,
} from "../constants";

const INITIAL_STATE = {
  articles: [],
  isGetted: false,
  isFetching: true,
};

const geoarticle = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GEOARTICLE_SET_LOCATION: {
      return {
        ...state,
        articles: state.articles.map((item) => {
          if (item._id === action.payload.articleId)
            return {
              ...item,
              lastCarrierLocation: action.payload.location,
            };
          else return item;
        }),
      };
    }
    case GEOARTICLES_GET: {
      return {
        ...state,
        articles: action.payload.articles,
        isGetted: true,
        isFetching: false,
      };
    }
    case GEOARTICLES_ADD: {
      return {
        ...state,
        articles: [...state.articles, action.payload.article],
      };
    }
    case GEOARTICLES_DELETE: {
      return {
        ...state,
        articles: state.articles.filter(
          (item) => item._id !== action.payload.articleId
        ),
      };
    }
    default:
      return state;
  }
};

export default geoarticle;
