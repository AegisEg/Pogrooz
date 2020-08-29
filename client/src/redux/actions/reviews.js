import {
  REVIEWS_MY_GET,
  REVIEWS_ME_GET,
  REVIEWS_ME_LOAD,
  REVIEWS_MY_LOAD,
  REVIEWS_MY_SET_LOADING,
  REVIEWS_ME_SET_LOADING,
} from "../constants";

import api from "../../config/api";
import store from "../store";

export const reviewsGet = (type, apiToken) => (dispatch) => {
  if (type === "me") dispatch({ type: REVIEWS_ME_SET_LOADING, payload: {} });
  if (type === "my") dispatch({ type: REVIEWS_MY_SET_LOADING, payload: {} });
  fetch(`${api.urlApi}/api/article/getUserReviews`, {
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
  let lastDialogId;

  if (type === "me") {
    lastDialogId = store.getState().reviews.reviewsMe.reviews[
      store.getState().reviews.reviewsMe.reviews.length - 1
    ]._id;
    dispatch({ type: REVIEWS_ME_SET_LOADING, payload: {} });
  }
  if (type === "my") {
    lastDialogId = store.getState().reviews.reviewsMy.reviews[
      store.getState().reviews.reviewsMy.reviews.length - 1
    ]._id;
    dispatch({ type: REVIEWS_MY_SET_LOADING, payload: {} });
  }
  fetch(`${api.urlApi}/api/article/getUserReviews`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      type: type,
      lastDialogId,
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
