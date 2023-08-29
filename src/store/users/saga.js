import { call, put, takeLatest } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import { userActions } from "../actions";
import { createUser, getMeInfo } from "../../services/usersService";

function* addUser(payload) {
  try {
    const res = yield call(createUser, payload);
    NotificationManager.success(res?.data?.message, "Add user", 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, "Add user", 4000);
  }
}

function* getInfoMe() {
  try {
    console.log("sjsdhhhhhhhhh")
    const res = yield call(getMeInfo);
    console.log("jskhhssssscccccc", res);
    yield put({
      type: userActions.GET_ME_SUCCESS,
      payload: res?.data?.data,
    });
    NotificationManager.success(res?.data?.message, "Get Me", 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, "Get Me", 4000);
  }
}

function* UserSaga() {
  yield takeLatest(userActions.ADD_USER, addUser);
  yield takeLatest(userActions.GET_ME, getInfoMe);
}

export default UserSaga;
