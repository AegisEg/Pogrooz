import { combineReducers } from "redux";

import user from "./user";
import dialogs from "./dialogs";
import myarticles from "./myarticles";
import notifications from "./notification";
import reviews from "./reviews";
import geoarticles from "./geoarticle";
import settings from "./settings";
export default combineReducers({
  user,
  dialogs,
  myarticles,
  notifications,
  reviews,
  geoarticles,
  settings,
});
