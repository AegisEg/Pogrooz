import {
  REVIEWS_MY_GET,
  REVIEWS_ME_GET,
  REVIEWS_ME_LOAD,
  REVIEWS_MY_LOAD,
  REVIEWS_MY_SET_LOADING,
  REVIEWS_ME_SET_LOADING,
  ARTICLE_MY_REVIEW_UPDATE,
  REVIEWS_MY_UPDATE,
  ARTICLE_MY_REVIEW_CREATE,
  REVIEWS_MY_CREATE,
  ARTICLE_TAKING_REVIEW_UPDATE,
  REVIEWS_ME_UPDATE,
  ARTICLE_TAKING_REVIEW_CREATE,
  REVIEWS_ME_CREATE,
} from "../constants";

import api from "../../config/api";
import store from "../store";
import { toast } from "react-toastify";
import SocketController from "../../controllers/SocketController";
export const reviewsGet = (type, apiToken) => (dispatch) => {
  if (type === "me") dispatch({ type: REVIEWS_ME_SET_LOADING, payload: {} });
  if (type === "my") dispatch({ type: REVIEWS_MY_SET_LOADING, payload: {} });
  fetch(`${api.urlApi}/api/article/getMyReviews`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      type: type,
    }),
  })
    .then((response) => response.json())
    .then(({ reviews }) => {
      if (type === "me")
        dispatch({
          type: REVIEWS_ME_GET,
          payload: { reviews },
        });
      if (type === "my")
        dispatch({
          type: REVIEWS_MY_GET,
          payload: { reviews },
        });
    });
};
export const reviewsLoad = (type, apiToken) => (dispatch) => {
  let lastReviewId;

  if (type === "me") {
    lastReviewId = store.getState().reviews.reviewsMe.reviews[
      store.getState().reviews.reviewsMe.reviews.length - 1
    ]._id;
    dispatch({ type: REVIEWS_ME_SET_LOADING, payload: {} });
  }
  if (type === "my") {
    lastReviewId = store.getState().reviews.reviewsMy.reviews[
      store.getState().reviews.reviewsMy.reviews.length - 1
    ]._id;
    dispatch({ type: REVIEWS_MY_SET_LOADING, payload: {} });
  }
  fetch(`${api.urlApi}/api/article/getMyReviews`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      type: type,
      lastReviewId,
    }),
  })
    .then((response) => response.json())
    .then(({ reviews }) => {
      if (type === "me")
        dispatch({
          type: REVIEWS_ME_LOAD,
          payload: { reviews },
        });
      if (type === "my")
        dispatch({
          type: REVIEWS_MY_LOAD,
          payload: { reviews },
        });
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
            }
          }
          resolve(data);
        });
    } else resolve({});
  });
};
