import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga";
import PermissionSaga from "./permissions/saga";

function* rootSaga() {
  yield all([fork(UserSaga), fork(PermissionSaga)]);
}

export default rootSaga;
