import {
  ARTICLES_MY_ALL_LOAD_END,
  ARTICLES_TAKING_ALL_LOAD_END,
  ARTICLES_TAKING_SET_COUNT,
  ARTICLES_TAKING_SET_LOADING,
  ARTICLES_TAKING_GET,
  ARTICLE_TAKING_DELETE_FROM_STATUS,
  ARTICLES_TAKING_CREATE_COUNT,
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
  ARTICLES_MY_CURRENT_LOAD,
  ARTICLE_SET_REQUEST,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_DELETE_REQUEST,
  ARTICLES_MY_DELETE_EXECUTOR,
  ARTICLES_MY_SET_EXECUTOR,
  ARTICLES_MY_CURRENT_UPDATE,
  REVIEWS_MY_CREATE,
  REVIEWS_MY_UPDATE,
} from "../constants";
import store from "../store";
import api from "../../config/api";
import settings from "../../config/settings";
import SocketController from "../../controllers/SocketController";
import { toast } from "react-toastify";

export const articlesMyLoad = (status, page, apiToken) => (dispatch) => {
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
        page: page,
        type: "my",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (page !== 0 && !data.articles.length) {
          dispatch(articlesMyLoad(status, page - 1, apiToken));
        } else {
          dispatch({
            type: ARTICLES_MY_GET,
            payload: {
              articles: data.articles,
              status: status,
              page: page,
            },
          });
        }
        resolve({});
      });
  });
};
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
          if (objStatus.isGetted && objStatus.page === 0) {
            let articles = objStatus.articles;
            if (articles.length === settings.countArticleOnPage)
              dispatch({
                type: ARTICLES_MY_CREATE_REPLACE,
                payload: { status, article: data.article },
              });
            if (articles.length < settings.countArticleOnPage)
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
          if (objStatus.isGetted && objStatus.page === 0) {
            let articles = objStatus.articles;
            if (articles.length === settings.countArticleOnPage)
              dispatch({
                type: ARTICLES_MY_CREATE_REPLACE,
                payload: { status, article: data.article },
              });
            if (articles.length < settings.countArticleOnPage)
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
                payload: { article: article },
              });
              resolve({ error: false });
            } else resolve(data);
          });
      });
    }
  }
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
            let status = 7;
            deleteAndReload(
              dispatch,
              lastStatus,
              status,
              article._id,
              apiToken
            ).then(() => {
              resolve({ error: false, articleId: article._id });
            });
          } else resolve(data);
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
            let status = 3;
            deleteAndReload(
              dispatch,
              lastStatus,
              status,
              article._id,
              apiToken
            ).then(() => {
              resolve({ error: false, articleId: article._id });
            });
          } else resolve(data);
        });
    } else resolve({ error: true });
  });
};
export const onWayMyArticle = (article, apiToken, isTaking) => (dispatch) => {
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
            let status = 4;
            deleteAndReload(
              dispatch,
              lastStatus,
              status,
              article._id,
              apiToken,
              isTaking
            ).then(() => {
              resolve({ error: false, article: article });
            });
          } else resolve(data);
        });
    } else resolve({ error: true });
  });
};
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
            let status = 5;
            deleteAndReload(
              dispatch,
              lastStatus,
              status,
              article._id,
              apiToken
            ).then(() => {
              resolve({ error: false, article: article });
            });
          } else resolve(data);
        });
    } else resolve({ error: true });
  });
};
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
            let status = 6;
            deleteAndReload(
              dispatch,
              lastStatus,
              status,
              article._id,
              apiToken
            ).then(() => {
              resolve({ error: false, article: article });
            });
          } else resolve(data);
        });
    } else resolve({ error: true });
  });
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
              let status = 3;
              deleteAndReload(
                dispatch,
                lastStatus,
                status,
                data.article._id,
                store.getState().user.apiToken
              ).then(() => {
                resolve({ error: false });
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
              deleteAndReload(
                dispatch,
                lastStatus,
                2,
                article._id,
                store.getState().user.apiToken
              ).then(() => {
                resolve({});
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
          }
          resolve(data);
        });
    } else resolve({});
  });
};
export const restoreMyArticle = (article, apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let lastStatus = article.status;
    if (apiToken) {
      fetch(`${api.urlApi}/api/article/restoreArticle`, {
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
            let status = 1;
            article.status = status;
            dispatch({
              type: ARTICLE_MY_DELETE_FROM_STATUS,
              payload: { lastStatus: lastStatus, articleId: article._id },
            });
            dispatch(
              articlesMyLoad(
                lastStatus,
                store.getState().myarticles.my[lastStatus - 1].page,
                apiToken
              )
            );
            let objStatus = store.getState().myarticles.my[status - 1];
            if (objStatus.isGetted && objStatus.page === 0) {
              let articles = objStatus.articles;
              if (articles.length === settings.countArticleOnPage)
                dispatch({
                  type: ARTICLES_MY_CREATE_REPLACE,
                  payload: { status, article: article },
                });
              if (articles.length < settings.countArticleOnPage)
                dispatch({
                  type: ARTICLES_MY_CREATE,
                  payload: { status, article: article },
                });
            } else {
              dispatch({
                type: ARTICLES_MY_CREATE_COUNT,
                payload: { status, article: article },
              });
            }
            resolve({ error: false, articleId: article._id });
          } else resolve(data);
        });
    } else resolve({ error: true });
  });
};
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
            let status = 2;
            article.status = status;
            dispatch({
              type: ARTICLE_MY_DELETE_FROM_STATUS,
              payload: { lastStatus: lastStatus, articleId: article._id },
            });
            dispatch(
              articlesMyLoad(
                lastStatus,
                store.getState().myarticles.my[lastStatus - 1].page,
                apiToken
              )
            );
            let objStatus = store.getState().myarticles.my[status - 1];
            if (objStatus.isGetted && objStatus.page === 0) {
              let articles = objStatus.articles;
              if (articles.length === settings.countArticleOnPage)
                dispatch({
                  type: ARTICLES_MY_CREATE_REPLACE,
                  payload: { status, article: article },
                });
              if (articles.length < settings.countArticleOnPage)
                dispatch({
                  type: ARTICLES_MY_CREATE,
                  payload: { status, article: article },
                });
            } else {
              dispatch({
                type: ARTICLES_MY_CREATE_COUNT,
                payload: { status, article: article },
              });
            }
            resolve({ error: false, articleId: article._id });
          } else resolve(data);
        });
    } else resolve({ error: true });
  });
};
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
            let status = 1;
            article.status = status;
            dispatch({
              type: ARTICLE_MY_DELETE_FROM_STATUS,
              payload: { lastStatus: lastStatus, articleId: article._id },
            });
            dispatch(
              articlesMyLoad(
                lastStatus,
                store.getState().myarticles.my[lastStatus - 1].page,
                apiToken
              )
            );
            let objStatus = store.getState().myarticles.my[status - 1];
            if (objStatus.isGetted && objStatus.page === 0) {
              let articles = objStatus.articles;
              if (articles.length === settings.countArticleOnPage)
                dispatch({
                  type: ARTICLES_MY_CREATE_REPLACE,
                  payload: { status, article: article },
                });
              if (articles.length < settings.countArticleOnPage)
                dispatch({
                  type: ARTICLES_MY_CREATE,
                  payload: { status, article: article },
                });
            } else {
              dispatch({
                type: ARTICLES_MY_CREATE_COUNT,
                payload: { status, article: article },
              });
            }
            resolve({ error: false, articleId: article._id });
          } else resolve(data);
        });
    } else resolve({ error: true });
  });
};
export async function deleteTaking(dispatch, lastStatus, articleId, apiToken) {
  dispatch({
    type: ARTICLE_TAKING_DELETE_FROM_STATUS,
    payload: { lastStatus: lastStatus, articleId: articleId },
  });
  dispatch(
    articlesTakingLoad(
      lastStatus,
      store.getState().myarticles.taking[lastStatus - 2].page,
      apiToken
    )
  );
}
export async function deleteAndReload(
  dispatch,
  lastStatus,
  status,
  articleId,
  apiToken,
  isTaking
) {
  if (isTaking) {
    dispatch({
      type: ARTICLE_TAKING_DELETE_FROM_STATUS,
      payload: { lastStatus: lastStatus, articleId: articleId },
    });
    dispatch(
      articlesTakingLoad(
        lastStatus,
        store.getState().myarticles.taking[lastStatus - 2].page,
        apiToken
      )
    );
    dispatch({
      type: ARTICLES_TAKING_CREATE_COUNT,
      payload: { status, article: { _id: articleId } },
    });
    dispatch(
      articlesTakingLoad(
        status,
        store.getState().myarticles.taking[status - 2].page,
        apiToken
      )
    );
  } else {
    dispatch({
      type: ARTICLE_MY_DELETE_FROM_STATUS,
      payload: { lastStatus: lastStatus, articleId: articleId },
    });
    dispatch(
      articlesMyLoad(
        lastStatus,
        store.getState().myarticles.my[lastStatus - 1].page,
        apiToken
      )
    );
    dispatch({
      type: ARTICLES_MY_CREATE_COUNT,
      payload: { status, article: { _id: articleId } },
    });
    dispatch(
      articlesMyLoad(
        status,
        store.getState().myarticles.my[status - 1].page,
        apiToken
      )
    );
  }
  return Promise.resolve({ error: true });
}
//TAKING
export const articlesTakingLoad = (status, page, apiToken) => (dispatch) => {
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
        page: page,
        type: "taking",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (page !== 0 && !data.articles.length) {
          dispatch(articlesTakingLoad(status, page - 1, apiToken));
        } else {
          dispatch({
            type: ARTICLES_TAKING_GET,
            payload: {
              articles: data.articles,
              status: status,
              page: page,
            },
          });
        }
        resolve({});
      });
  });
};
export const setTakingCount = (takeCountsArticles) => (dispatch) => {
  dispatch({
    type: ARTICLES_TAKING_SET_COUNT,
    payload: { takeCountsArticles },
  });
};
export const MyAllLoadEnd = (takeCountsArticles) => (dispatch) => {
  dispatch({
    type: ARTICLES_MY_ALL_LOAD_END,
    payload: {},
  });
};
export const TakingAllLoadEnd = (takeCountsArticles) => (dispatch) => {
  dispatch({
    type: ARTICLES_TAKING_ALL_LOAD_END,
    payload: {},
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
