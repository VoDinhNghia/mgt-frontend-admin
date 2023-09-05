import { combineReducers } from "redux";
import UserReducer from "./users/reducer";
import PermissionReducer from "./permissions/reducer";

const rootReducer = combineReducers({
  UserReducer,
  PermissionReducer,
});

export default rootReducer;
