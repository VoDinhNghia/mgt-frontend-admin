import { combineReducers } from "redux";
import UserReducer from "./users/reducer";
import PermissionReducer from "./permissions/reducer";
import RoomReducer from "./rooms/reducer";

const rootReducer = combineReducers({
  UserReducer,
  PermissionReducer,
  RoomReducer,
});

export default rootReducer;
