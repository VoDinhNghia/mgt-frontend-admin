import { combineReducers } from "redux";
import UserReducer from "./users/userReducer";

const rootReducer = combineReducers({
  UserReducer,
});

export default rootReducer;
