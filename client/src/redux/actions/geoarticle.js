import { GEOARTICLES_GET } from "../constants";
import store from "../store";
import api from "../../config/api";

export const geoArticlesGet = (apiToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/article/getGeoArticles`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((response) => response.json())
      .then(({ articles }) => {
        if (articles)
          dispatch({ type: GEOARTICLES_GET, payload: { articles } });
        resolve();
      });
  });
};
