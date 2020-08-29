import { combineReducers } from "redux";

import user from "./user";
import dialogs from "./dialogs";
import myarticles from "./myarticles";
export default combineReducers({
  user,
  dialogs,
  myarticles,
});
