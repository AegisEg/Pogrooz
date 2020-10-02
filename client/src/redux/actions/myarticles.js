import {
  ARTICLES_MY_ALL_GET,
  ARTICLES_TAKING_ALL_GET,
  ARTICLES_MY_ALL_LOAD,
  ARTICLES_TAKING_ALL_LOAD,
  ARTICLES_MY_ALL_SET_LOADING,
  ARTICLES_TAKING_ALL_SET_LOADING,
  ARTICLES_TAKING_SET_COUNT,
  ARTICLES_TAKING_SET_LOADING,
  ARTICLES_TAKING_GET,
  ARTICLE_TAKING_REVIEW_UPDATE,
  ARTICLE_TAKING_REVIEW_CREATE,
  ARTICLES_MY_GET,
  ARTICLES_MY_LOAD,
  ARTICLES_TAKING_LOAD,
  ARTICLES_MY_UPDATE,
  ARTICLES_MY_CREATE,
  ARTICLES_MY_SET_COUNT,
  ARTICLES_MY_SET_LOADING,
  ARTICLES_MY_CREATE_COUNT,
  ARTICLE_MY_REVIEW_UPDATE,
  ARTICLE_MY_REVIEW_CREATE,
  ARTICLES_MY_CURRENT_LOAD,
  ARTICLE_SET_REQUEST,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_DELETE_REQUEST,
  ARTICLES_MY_DELETE_EXECUTOR,
  ARTICLES_MY_SET_EXECUTOR,
  REVIEWS_MY_CREATE,
  REVIEWS_MY_UPDATE,
  ARTICLE_MY_UPDATE_STATUS,
  ARTICLE_TAKING_UPDATE_STATUS,
  REVIEWS_ME_UPDATE,
  REVIEWS_ME_CREATE,
  ARTICLE_MY_SET_DELIVERED,
  ARTICLE_TAKING_SET_DELIVERED,
  USER_SET_NEED_LOCATION,
} from "../constants";
import store from "../store";
import api from "../../config/api";
import settings from "../../config/settings";
import SocketController from "../../controllers/SocketController";
import { toast } from "react-toastify";

//GET ALL
export const articlesAllMyGet = (apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        type: "my",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ARTICLES_MY_ALL_GET,
          payload: {
            articles: data.articles,
          },
        });
        resolve({});
      });
  });
};
export const articlesAllTakingGet = (apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        type: "taking",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ARTICLES_TAKING_ALL_GET,
          payload: {
            articles: data.articles,
          },
        });
      });
  });
};
//LOADING
export const articlesAllMyLoad = (apiToken) => (dispatch) => {
  dispatch({
    type: ARTICLES_MY_ALL_SET_LOADING,
  });
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        offset: store.getState().myarticles.myAll.articles.length,
        type: "my",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ARTICLES_MY_ALL_LOAD,
          payload: {
            articles: data.articles,
          },
        });
        resolve({});
      });
  });
};
export const articlesAllTakingLoad = (apiToken) => (dispatch) => {
  dispatch({
    type: ARTICLES_TAKING_ALL_SET_LOADING,
  });
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        offset: store.getState().myarticles.takingAll.articles.length,
        type: "taking",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ARTICLES_TAKING_ALL_LOAD,
          payload: {
            articles: data.articles,
          },
        });
        resolve({});
      });
  });
};
//GET
export const articlesMyGet = (status, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        status: status,
        type: "my",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ARTICLES_MY_GET,
          payload: {
            articles: data.articles,
            status,
          },
        });
        resolve({});
      });
  });
};
export const articlesTakingGet = (status, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        status: status,
        type: "taking",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ARTICLES_TAKING_GET,
          payload: {
            articles: data.articles,
            status: status,
          },
        });
      });
  });
};
//LOADING
export const articlesMyLoad = (status, apiToken) => (dispatch) => {
  dispatch({
    type: ARTICLES_MY_SET_LOADING,
    payload: { status: status },
  });
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        status: status,
        offset: store.getState().myarticles.my[status - 1].articles.length,
        type: "my",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ARTICLES_MY_LOAD,
          payload: {
            articles: data.articles,
            status: status,
          },
        });
        resolve({});
      });
  });
};
export const articlesTakingLoad = (status, apiToken) => (dispatch) => {
  dispatch({
    type: ARTICLES_TAKING_SET_LOADING,
    payload: { status: status },
  });
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        status: status,
        offset: store.getState().myarticles.taking[status - 2].articles.length,
        type: "taking",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ARTICLES_TAKING_LOAD,
          payload: {
            articles: data.articles,
            status: status,
          },
        });
        resolve({});
      });
  });
};
///
export const setMyCount = (myCountsArticles) => (dispatch) => {
  dispatch({
    type: ARTICLES_MY_SET_COUNT,
    payload: { myCountsArticles },
  });
};
export const createMyArticle = (article, status, apiToken) => (dispatch) => {
  let objStatus = store.getState().myarticles.my[status - 1];
  let formData = new FormData();
  formData.append("socketId", SocketController.getSocketId());
  formData.append("article", JSON.stringify({ ...article, status: status }));
  if (
    article.type === "order" &&
    article.cargoPhoto &&
    !!article.cargoPhoto.length
  ) {
    let files = [];
    article.cargoPhoto.map((item, index) => {
      formData.append("cargoPhoto" + index, item.file);
    });
  }
  if (article.type === "offer" && article.car.photo.file)
    formData.append("carPhoto", article.car.photo.file);
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/createArticle`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          if (objStatus.isGetted)
            dispatch({
              type: ARTICLES_MY_CREATE,
              payload: { status, article: data.article },
            });
          else
            dispatch({
              type: ARTICLES_MY_CREATE_COUNT,
              payload: { status, article: data.article },
            });
          resolve({ error: false });
        } else resolve(data);
      });
  });
};
export const copyMyArticle = (article, apiToken) => (dispatch) => {
  let status = 2;
  let objStatus = store.getState().myarticles.my[status - 1];
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/createArticle`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        articleId: article._id,
        socketId: SocketController.getSocketId(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          if (objStatus.isGetted) {
            dispatch({
              type: ARTICLES_MY_CREATE,
              payload: { status, article: data.article },
            });
          } else {
            dispatch({
              type: ARTICLES_MY_CREATE_COUNT,
              payload: { status, article },
            });
          }
          resolve({ error: false });
        } else resolve(data);
      });
  });
};
export const editMyArticle = (article, editingId, apiToken) => (dispatch) => {
  let formData = new FormData();

  if (editingId) {
    formData.append("socketId", SocketController.getSocketId());
    if (
      article.type === "order" &&
      article.cargoPhoto &&
      !!article.cargoPhoto.length
    ) {
      let count = 0;
      article.cargoPhoto.map((item, index) => {
        if (item.file) {
          formData.append("cargoPhoto" + index, item.file);
          count += 1;
        }
      });

      formData.append(
        "article",
        JSON.stringify({
          ...article,
          cargoPhoto: article.cargoPhoto.filter((item, index) => {
            return !item.file;
          }),
        })
      );
    } else formData.append("article", JSON.stringify(article));
    formData.append("editingId", editingId);
    if (article.type === "offer" && article.car.photo.file)
      formData.append("carPhoto", article.car.photo.file);

    if (apiToken) {
      return new Promise((resolve, reject) => {
        fetch(`${api.urlApi}/api/article/updateArticle`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              let status = data.article.status,
                article = data.article;
              let objStatus = store.getState().myarticles.my[status - 1];
              if (objStatus.articles.find((item) => item._id == article._id));
              dispatch({
                type: ARTICLES_MY_UPDATE,
                payload: { article, status },
              });
              resolve({ error: false });
            } else resolve(data);
          });
      });
    }
  }
};
export const setExecutor = (article, executor) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (store.getState().user.apiToken) {
      fetch(`${api.urlApi}/api/article/setExecutor`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.getState().user.apiToken}`,
        },
        body: JSON.stringify({
          executorId: executor._id,
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error && data.executor && data.article) {
            if (article.type === "order") {
              article.status = 3;
              dispatch({
                type: ARTICLE_MY_UPDATE_STATUS,
                payload: { lastStatus, article },
              });
            }
            dispatch({
              type: ARTICLES_MY_SET_EXECUTOR,
              payload: { article: data.article, executor: data.executor },
            });
          }
          resolve(data);
        });
    } else resolve({ error: true });
  });
};
export const deleteExecutor = (article, executor, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (store.getState().user.apiToken) {
      fetch(`${api.urlApi}/api/article/deleteExecutor`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.getState().user.apiToken}`,
        },
        body: JSON.stringify({
          executorId: executor._id,
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            if (
              !data.article.executors.length &&
              data.article.status === 2 &&
              lastStatus !== 2
            ) {
              article.status = 2;
              dispatch({
                type: ARTICLE_MY_UPDATE_STATUS,
                payload: { lastStatus, article },
              });
            }
            dispatch({
              type: ARTICLES_MY_DELETE_EXECUTOR,
              payload: { article: data.article, executor: data.executor },
            });
          }
          resolve(data);
        });
    } else resolve({ error: true });
  });
};
export const saveReview = (review, article, userId, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/saveReview`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          review: review,
          orderId: article._id,
          userId: userId,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error && data.newReview) {
            if (article.author._id === data.newReview.author._id) {
              if (data.existReview) {
                dispatch({
                  type: ARTICLE_MY_REVIEW_UPDATE,
                  payload: {
                    article,
                    newReview: data.newReview,
                  },
                });
                dispatch({
                  type: REVIEWS_MY_UPDATE,
                  payload: {
                    review: data.newReview,
                  },
                });
              } else {
                dispatch({
                  type: ARTICLE_MY_REVIEW_CREATE,
                  payload: {
                    article,
                    newReview: data.newReview,
                  },
                });
                dispatch({
                  type: REVIEWS_MY_CREATE,
                  payload: {
                    review: data.newReview,
                  },
                });
              }
            } else {
              if (data.existReview) {
                dispatch({
                  type: ARTICLE_TAKING_REVIEW_UPDATE,
                  payload: {
                    article,
                    newReview: data.newReview,
                  },
                });
                dispatch({
                  type: REVIEWS_ME_UPDATE,
                  payload: {
                    review: data.newReview,
                  },
                });
              } else {
                dispatch({
                  type: ARTICLE_TAKING_REVIEW_CREATE,
                  payload: {
                    article,
                    newReview: data.newReview,
                  },
                });
                dispatch({
                  type: REVIEWS_ME_CREATE,
                  payload: {
                    review: data.newReview,
                  },
                });
              }
            }
          }
          resolve(data);
        });
    } else resolve({});
  });
};
export const setTakingCount = (takeCountsArticles) => (dispatch) => {
  dispatch({
    type: ARTICLES_TAKING_SET_COUNT,
    payload: { takeCountsArticles },
  });
};
export const currentLoad = (articleId, type) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let user = store.getState().user;
    if (user.isAuth) headers.Authorization = "Bearer " + user.apiToken;
    fetch(
      `${api.urlApi}/api/article/${
        user.isAuth ? "getUserArticle" : "getArticle"
      }`,
      {
        method: "post",
        headers: headers,
        body: JSON.stringify({
          id: articleId,
          type: type,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.article) {
          dispatch({
            type: ARTICLES_MY_CURRENT_LOAD,
            payload: { article: data.article },
          });
        }

        resolve(data);
      });
  });
};
export const setRequest = (article, request) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/createRequest`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().user.apiToken}`,
      },
      body: JSON.stringify({
        articleId: article._id,
        request: request,
        socketId: SocketController.getSocketId(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error)
          data.errors.map((item) => {
            toast.error(item.msg);
          });
        if (!data.error && data.request) {
          dispatch({
            type: ARTICLE_SET_REQUEST,
            payload: {
              article,
              request: data.request,
            },
          });
        }
        resolve();
      });
  });
};
export const setRequestCancel = (article, user, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/setRequestCancel`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        articleId: article._id,
        deliveredUser: user._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error)
          data.errors.map((item) => {
            toast.error(item.msg);
          });
        resolve();
      });
  });
};
export const updateRequest = (requestId, request, article) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/updateRequest`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().user.apiToken}`,
      },
      body: JSON.stringify({
        requestId: requestId,
        request: request,
        socketId: SocketController.getSocketId(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error)
          data.errors.map((item) => {
            toast.error(item.msg);
          });
        if (!data.error && data.request) {
          dispatch({
            type: ARTICLE_UPDATE_REQUEST,
            payload: {
              article,
              request: data.request,
            },
          });
        }
        resolve();
      });
  });
};
export const deleteRequest = (requestId, article) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/deleteRequest`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getState().user.apiToken}`,
      },
      body: JSON.stringify({
        requestId: requestId,
        socketId: SocketController.getSocketId(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error)
          data.errors.map((item) => {
            toast.error(item.msg);
          });
        if (!data.error) {
          dispatch({
            type: ARTICLE_DELETE_REQUEST,
            payload: {
              article,
              requestId: requestId,
            },
          });
        }
        resolve();
      });
  });
};
//Статусы
//Draft
export const draftMyArticle = (article, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/draftArticle`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            article.status = 1;
            //Удаляем из старого
            dispatch({
              type: ARTICLE_MY_UPDATE_STATUS,
              payload: { lastStatus, article },
            });
            resolve({ error: false, articleId: article._id });
          } else resolve(data);
        });
    } else resolve({ error: true });
  });
};
//Public
export const publicMyArticle = (article, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/publicArticle`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            article.status = 2;
            dispatch({
              type: ARTICLE_MY_UPDATE_STATUS,
              payload: { lastStatus, article },
            });
            resolve({ error: false, articleId: article._id });
          }
          resolve(data);
        });
    } else resolve({ error: true });
  });
};
//Restore
export const restoreMyArticle = draftMyArticle;
//Cancel
export const cancelMyArticle = (article, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/cancelArticle`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            article.status = 6;
            dispatch({
              type: ARTICLE_MY_UPDATE_STATUS,
              payload: { lastStatus, article },
            });
            resolve({ error: false, articleId: article._id });
          }
          resolve(data);
        });
    } else resolve({ error: true });
  });
};
//OnWay
export const onWayMyArticle = (article, apiToken, isExecutor) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/onWayArticle`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            article.status = 4;
            if (isExecutor)
              dispatch({
                type: ARTICLE_TAKING_UPDATE_STATUS,
                payload: { lastStatus, article },
              });
            else
              dispatch({
                type: ARTICLE_MY_UPDATE_STATUS,
                payload: { lastStatus, article },
              });
            if (!store.getState().user.needSendLocation) {
              dispatch({
                type: USER_SET_NEED_LOCATION,
                payload: true,
              });
            }
            resolve({ error: false });
          } else resolve();
        });
    } else resolve();
  });
};
//Complete
export const completeMyArticle = (article, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/completeArticle`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            article.status = 5;
            dispatch({
              type: ARTICLE_MY_UPDATE_STATUS,
              payload: { lastStatus, article },
            });
            resolve({ error: false });
          } else resolve();
        });
    } else resolve({ error: true });
  });
};
export const deleteMyArticle = (article, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/deleteArticle`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            article.status = 7;
            dispatch({
              type: ARTICLE_MY_UPDATE_STATUS,
              payload: { lastStatus, article },
            });
            resolve({ error: false, articleId: article._id });
          }
          resolve(data);
        });
    } else resolve({ error: true });
  });
};
export const equipMyArticle = (article, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/equipArticle`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            article.status = 3;
            dispatch({
              type: ARTICLE_MY_UPDATE_STATUS,
              payload: { lastStatus, article },
            });
            resolve({ error: false, articleId: article._id });
          }
          resolve(data);
        });
    } else resolve({ error: true });
  });
};
export const setDeliveredMyArticle = (article, user, apiToken) => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/setDeliveredCargo`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          articleId: article._id,
          deliveredUser: user._id,
          socketId: SocketController.getSocketId(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error)
            data.errors.map((item) => {
              toast.error(item.msg);
            });
          if (!data.error) {
            if (article.author._id === store.getState().user._id)
              dispatch({
                type: ARTICLE_MY_SET_DELIVERED,
                payload: { article, user: user._id },
              });
            else
              dispatch({
                type: ARTICLE_TAKING_SET_DELIVERED,
                payload: { article, user: user._id },
              });
            if (data.isDisableGeo && store.getState().user.needSendLocation) {
              dispatch({
                type: USER_SET_NEED_LOCATION,
                payload: false,
              });
            }
            resolve({ error: false });
          }
          resolve(data);
        });
      resolve();
    } else resolve({ error: true });
  });
};
