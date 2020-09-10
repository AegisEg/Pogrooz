import {
  REVIEWS_MY_GET,
  REVIEWS_ME_GET,
  REVIEWS_ME_CREATE,
  REVIEWS_MY_CREATE,
  REVIEWS_ME_UPDATE,
  REVIEWS_MY_UPDATE,
  REVIEWS_MY_SET_LOADING,
  REVIEWS_ME_SET_LOADING,
  REVIEWS_MY_LOAD,
  REVIEWS_ME_LOAD,
} from "../constants";

const INITIAL_STATE = {
  reviewsMy: { isFetching: false, reviews: [], canLoad: true, isGetted: false },
  reviewsMe: { isFetching: false, reviews: [], canLoad: true, isGetted: false },
};

const reviews = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REVIEWS_MY_GET: {
      return {
        ...state,
        reviewsMy: {
          reviews: action.payload.reviews,
          canLoad: action.payload.reviews.length === 20,
          isGetted: true,
          isFetching: false,
        },
      };
    }
    case REVIEWS_ME_GET: {
      return {
        ...state,
        reviewsMe: {
          reviews: action.payload.reviews,
          canLoad: action.payload.reviews.length === 20,
          isGetted: true,
          isFetching: false,
        },
      };
    }
    case REVIEWS_MY_LOAD: {
      return {
        ...state,
        reviewsMy: {
          reviews: [...state.reviewsMy.reviews, ...action.payload.reviews],
          canLoad: action.payload.reviews.length === 20,
          isGetted: true,
          isFetching: false,
        },
      };
    }
    case REVIEWS_ME_LOAD: {
      return {
        ...state,
        reviewsMe: {
          reviews: [...state.reviewsMe.reviews, ...action.payload.reviews],
          canLoad: action.payload.reviews.length === 20,
          isGetted: true,
          isFetching: false,
        },
      };
    }
    case REVIEWS_MY_SET_LOADING: {
      return {
        ...state,
        reviewsMy: {
          ...state.reviewsMy,
          isFetching: true,
        },
      };
    }
    case REVIEWS_ME_SET_LOADING: {
      return {
        ...state,
        reviewsMe: {
          ...state.reviewsMe,
          isFetching: true,
        },
      };
    }
    case REVIEWS_ME_CREATE: {
      return {
        ...state,
        reviewsMe: {
          reviews: [action.payload.review, ...state.reviewsMe.reviews],
        },
      };
    }
    case REVIEWS_MY_CREATE: {
      return {
        ...state,
        reviewsMy: {
          reviews: [action.payload.review, ...state.reviewsMy.reviews],
        },
      };
    }
    case REVIEWS_ME_UPDATE: {
      return {
        ...state,
        reviewsMe: {
          reviews: state.reviewsMe.reviews.map((item) => {
            if (item._id === action.payload.review._id)
              return action.payload.review;
            else return item;
          }),
        },
      };
    }
    case REVIEWS_MY_UPDATE: {
      return {
        ...state,
        reviewsMy: {
          reviews: state.reviewsMy.reviews.map((item) => {
            if (item._id === action.payload.review._id)
              return action.payload.review;
            else return item;
          }),
        },
      };
    }

    default:
      return state;
  }
};

export default reviews;
