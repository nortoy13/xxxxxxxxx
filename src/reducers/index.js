import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";
import users from "./users";
import lan from "./language";
import err from "./errors";
export default combineReducers({
  posts,
  auth,
  users,
  lan,
  err,
});
