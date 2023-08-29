import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga";

function* rootSaga() {
  yield all([fork(UserSaga)]);
}

export default rootSaga;
