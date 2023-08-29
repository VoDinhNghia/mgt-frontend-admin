import { combineReducers } from "redux";
import UserReducer from "./users/UserReducer";

const rootReducer = combineReducers({
  UserReducer,
});

export default rootReducer;
