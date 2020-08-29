import {
  ARTICLES_MY_ALL_LOAD_END,
  ARTICLES_TAKING_ALL_LOAD_END,
  ARTICLES_TAKING_GET,
  ARTICLES_TAKING_SET_COUNT,
  ARTICLES_TAKING_SET_LOADING,
  ARTICLES_TAKING_CREATE_COUNT,
  ARTICLES_MY_CURRENT_REFRESH,
  ARTICLES_MY_CURRENT_LOAD,
  ARTICLES_TAKING_CREATE,
  ARTICLES_TAKING_CREATE_REPLACE,
  ARTICLE_TAKING_DELETE_FROM_STATUS,
  ARTICLES_MY_GET,
  ARTICLES_MY_UPDATE,
  ARTICLES_MY_CREATE,
  ARTICLES_MY_SET_COUNT,
  ARTICLES_MY_SET_LOADING,
  ARTICLES_MY_CREATE_COUNT,
  ARTICLES_MY_CREATE_REPLACE,
  ARTICLE_MY_DELETE_FROM_STATUS,
  ARTICLE_MY_REVIEW_UPDATE,
  ARTICLE_MY_REVIEW_CREATE,
  ARTICLE_TAKING_REVIEW_CREATE,
  ARTICLE_TAKING_REVIEW_UPDATE,
  ARTICLE_SET_REQUEST,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_DELETE_REQUEST,
  ARTICLES_MY_DELETE_EXECUTOR,
  ARTICLES_MY_SET_EXECUTOR,
  ARTICLES_MY_CURRENT_UPDATE,
  ARTICLE_SET_ME_REQUEST,
  ARTICLE_UPDATE_ME_REQUEST,
  ARTICLE_REMOVE_ME_REQUEST,
  ARTICLES_TAKING_DELETE_EXECUTOR,
  ARTICLES_TAKING_SET_EXECUTOR,
} from "../constants";

const INITIAL_STATE = {
  isReloadMyAll: false,
  isReloadTakingAll: false,
  my: [
    {
      isFetching: true,
      page: 0,
      isGetted: false,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
  ],
  taking: [
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
    {
      isFetching: true,
      isGetted: false,
      page: 0,
      articles: [],
      countAll: 0,
    },
  ],
  currentArticle: {},
};

const articles = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //REVIEW
    case ARTICLE_MY_REVIEW_UPDATE: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return {
                    ...item,
                    reviews: item.reviews.map((item) => {
                      if (item._id === action.payload.newReview._id)
                        return action.payload.newReview;
                      else return item;
                    }),
                  };
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                reviews: state.currentArticle.reviews.map((item) => {
                  if (item._id === action.payload.newReview._id)
                    return action.payload.newReview;
                  else return item;
                }),
              }
            : state.currentArticle,
      };
    }
    case ARTICLE_MY_REVIEW_CREATE: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return {
                    ...item,
                    reviews: [...item.reviews, action.payload.newReview],
                  };
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                reviews: [
                  ...state.currentArticle.reviews,
                  action.payload.newReview,
                ],
              }
            : state.currentArticle,
      };
    }
    case ARTICLE_TAKING_REVIEW_CREATE: {
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return {
                    ...item,
                    reviews: [...item.reviews, action.payload.newReview],
                  };
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                reviews: [
                  ...state.currentArticle.reviews,
                  action.payload.newReview,
                ],
              }
            : state.currentArticle,
      };
    }
    case ARTICLE_TAKING_REVIEW_UPDATE: {
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return {
                    ...item,
                    reviews: item.reviews.map((item) => {
                      if (item._id === action.payload.newReview._id)
                        return action.payload.newReview;
                      else return item;
                    }),
                  };
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                reviews: state.currentArticle.reviews.map((item) => {
                  if (item._id === action.payload.newReview._id)
                    return action.payload.newReview;
                  else return item;
                }),
              }
            : state.currentArticle,
      };
    }
    //REVIEW
    case ARTICLES_TAKING_GET: {
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          if (status === action.payload.status) {
            return {
              ...item,
              isFetching: false,
              page: action.payload.page,
              isGetted: true,
              articles: action.payload.articles,
            };
          }
          return item;
        }),
      };
    }
    case ARTICLES_TAKING_SET_LOADING:
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          if (status === action.payload.status) {
            return {
              ...item,
              isFetching: true,
            };
          }
          return item;
        }),
      };
    case ARTICLES_TAKING_SET_COUNT: {
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          let setVal;
          if (
            (setVal = action.payload.takeCountsArticles.find(
              (item) => item._id == status
            ))
          ) {
            return {
              ...item,
              countAll: setVal.count,
            };
          } else return item;
        }),
      };
    }
    case ARTICLE_TAKING_DELETE_FROM_STATUS: {
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          if (status === action.payload.lastStatus) {
            return {
              ...item,
              articles: item.articles.filter((item) => {
                return item._id !== action.payload.articleID;
              }),
              countAll: item.countAll - 1,
            };
          }
          return item;
        }),
        isReloadTakingAll: true,
      };
    }
    case ARTICLES_TAKING_CREATE_COUNT: {
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          if (status === action.payload.status) {
            return {
              ...item,
              countAll: item.countAll + 1,
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                status: action.payload.status,
              }
            : state.currentArticle,
        isReloadTakingAll: true,
      };
    }
    case ARTICLES_TAKING_CREATE: {
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          if (status === action.payload.status) {
            return {
              ...item,
              articles: [action.payload.article, ...item.articles],
              countAll: item.countAll + 1,
            };
          }
          return item;
        }),
        isReloadTakingAll: true,
      };
    }
    case ARTICLES_TAKING_CREATE_REPLACE: {
      return {
        ...state,
        taking: state.taking.map((item, index) => {
          let status = index + 2;
          if (status === action.payload.status) {
            return {
              ...item,
              articles: [
                action.payload.article,
                ...item.articles.filter(
                  (item, index, items) => !(index === items.length - 1)
                ),
              ],
              countAll: item.countAll + 1,
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                status: action.payload.article.status,
              }
            : state.currentArticle,
        isReloadTakingAll: true,
      };
    }
    //My ARticles
    case ARTICLES_MY_GET: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.status) {
            return {
              ...item,
              isFetching: false,
              page: action.payload.page,
              isGetted: true,
              articles: action.payload.articles,
            };
          }
          return item;
        }),
      };
    }
    case ARTICLES_MY_SET_LOADING:
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.status) {
            return {
              ...item,
              isFetching: true,
            };
          }
          return item;
        }),
      };
    case ARTICLES_MY_CREATE: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.status) {
            return {
              ...item,
              articles: [action.payload.article, ...item.articles],
              countAll: item.countAll + 1,
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                status: action.payload.status,
              }
            : state.currentArticle,
        isReloadMyAll: true,
      };
    }
    case ARTICLES_MY_CREATE_REPLACE: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.status) {
            return {
              ...item,
              articles: [
                action.payload.article,
                ...item.articles.filter(
                  (item, index, items) => !(index === items.length - 1)
                ),
              ],
              countAll: item.countAll + 1,
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                status: action.payload.article.status,
              }
            : state.currentArticle,
        isReloadMyAll: true,
      };
    }
    case ARTICLES_MY_CREATE_COUNT: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.status) {
            return {
              ...item,
              countAll: item.countAll + 1,
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                status: action.payload.status,
              }
            : state.currentArticle,
        isReloadMyAll: true,
      };
    }
    case ARTICLES_MY_DELETE_EXECUTOR: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id) {
                  return {
                    ...item,
                    executors: item.executors.filter(
                      (item) => item._id !== action.payload.executor._id
                    ),
                  };
                } else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                executors: state.currentArticle.executors.filter(
                  (item) => item._id !== action.payload.executor._id
                ),
              }
            : state.currentArticle,
        isReloadMyAll: true,
      };
    }
    case ARTICLES_MY_SET_EXECUTOR: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return {
                    ...item,
                    executors: [...item.executors, action.payload.executor],
                  };
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                executors: [
                  ...state.currentArticle.executors,
                  action.payload.executor,
                ],
              }
            : state.currentArticle,
        isReloadMyAll: true,
      };
    }
    case ARTICLES_TAKING_DELETE_EXECUTOR: {
      return {
        ...state,
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                executors: state.currentArticle.executors.filter(
                  (item) => item._id !== action.payload.executor._id
                ),
              }
            : state.currentArticle,
      };
    }
    case ARTICLES_TAKING_SET_EXECUTOR: {
      return {
        ...state,
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                executors: [
                  ...state.currentArticle.executors,
                  action.payload.executor,
                ],
              }
            : state.currentArticle,
      };
    }
    case ARTICLES_MY_UPDATE: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return action.payload.article;
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...action.payload.article,
              }
            : state.currentArticle,
        isReloadMyAll: true,
      };
    }
    case ARTICLE_MY_DELETE_FROM_STATUS: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.lastStatus) {
            return {
              ...item,
              articles: item.articles.filter((item) => {
                return item._id !== action.payload.articleID;
              }),
              countAll: item.countAll - 1,
            };
          }
          return item;
        }),
        isReloadMyAll: true,
      };
    }
    case ARTICLES_MY_SET_COUNT: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          let setVal;
          if (
            (setVal = action.payload.myCountsArticles.find(
              (item) => item._id == status
            ))
          ) {
            return {
              ...item,
              countAll: setVal.count,
            };
          } else return item;
        }),
        isReloadMyAll: true,
      };
    }
    case ARTICLES_MY_ALL_LOAD_END: {
      return { ...state, isReloadMyAll: false };
    }
    case ARTICLES_TAKING_ALL_LOAD_END: {
      return { ...state, isReloadTakingAll: false };
    }
    case ARTICLES_MY_CURRENT_LOAD: {
      return { ...state, currentArticle: action.payload.article };
    }
    case ARTICLES_MY_CURRENT_UPDATE: {
      return {
        ...state,
        currentArticle: { ...state.currentArticle, ...action.payload.change },
      };
    }
    case ARTICLES_MY_CURRENT_REFRESH: {
      return { ...state, currentArticle: false };
    }
    case ARTICLE_SET_REQUEST: {
      return {
        ...state,
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                requests: [
                  ...state.currentArticle.reviews,
                  action.payload.request,
                ],
              }
            : state.currentArticle,
      };
    }
    case ARTICLE_UPDATE_REQUEST: {
      return {
        ...state,
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                requests: state.currentArticle.requests.map((item) => {
                  if (item._id === action.payload.request._id)
                    return action.payload.request;
                  else return item;
                }),
              }
            : state.currentArticle,
      };
    }
    //Надо сделать
    case ARTICLE_SET_ME_REQUEST: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return {
                    ...item,
                    requests: [...item.requests, action.payload.request],
                  };
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                requests: [
                  ...state.currentArticle.requests,
                  action.payload.request,
                ],
              }
            : state.currentArticle,
      };
    }
    case ARTICLE_UPDATE_ME_REQUEST: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return {
                    ...item,
                    requests: item.requests.map((item) => {
                      if (action.payload.request._id === item._id)
                        return action.payload.request;
                      else return item;
                    }),
                  };
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                requests: state.currentArticle.requests.map((item) => {
                  if (action.payload.request._id === item._id)
                    return action.payload.request;
                  else return item;
                }),
              }
            : state.currentArticle,
      };
    }
    case ARTICLE_REMOVE_ME_REQUEST: {
      return {
        ...state,
        my: state.my.map((item, index) => {
          let status = index + 1;
          if (status === action.payload.article.status) {
            return {
              ...item,
              articles: item.articles.map((item) => {
                if (item._id === action.payload.article._id)
                  return {
                    ...item,
                    requests: item.requests.filter((item) => {
                      return action.payload.requestId !== item._id;
                    }),
                  };
                else return item;
              }),
            };
          }
          return item;
        }),
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                requests: state.currentArticle.requests.filter((item) => {
                  return action.payload.requestId !== item._id;
                }),
              }
            : state.currentArticle,
      };
    }
    case ARTICLE_DELETE_REQUEST: {
      return {
        ...state,
        currentArticle:
          state.currentArticle._id === action.payload.article._id
            ? {
                ...state.currentArticle,
                requests: state.currentArticle.requests.filter((item) => {
                  return item._id !== action.payload.requestId;
                }),
              }
            : state.currentArticle,
      };
    }
    default:
      return state;
  }
};

export default articles;
