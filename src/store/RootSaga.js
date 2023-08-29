import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/UserSaga";

function* rootSaga() {
  yield all([fork(UserSaga)]);
}

export default rootSaga;
