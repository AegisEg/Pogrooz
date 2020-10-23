import { GET_SETTINGS } from "../constants";
import api from "../../config/api";

export const getSettings = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.urlApi}/api/page/getSettings`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ items, settings }) => {
        dispatch({ type: GET_SETTINGS, payload: { menu: items, settings } });
        resolve();
      });
  });
};
