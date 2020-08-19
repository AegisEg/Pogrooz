import { ARTICLESLOAD } from "../constants";
import store from "../store";
import api from "../../config/api";

export const articlesLoad = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getMyArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ userId: store.getState().user._id }),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: ARTICLESLOAD,
          payload: { my: response.my, taking: response.taking },
        });
        resolve({});
      });
  });
};
