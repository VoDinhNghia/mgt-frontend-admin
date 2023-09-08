import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga";
import PermissionSaga from "./permissions/saga";
import RoomSaga from "./rooms/saga";

function* rootSaga() {
  yield all([fork(UserSaga), fork(PermissionSaga)], fork(RoomSaga));
}

export default rootSaga;
