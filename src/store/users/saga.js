import { call, put, takeLatest } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import { userActions } from "../actions";
import { createUser, getMeInfo, updateInfo, updateProfile } from "../../services/usersService";

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
    const res = yield call(getMeInfo);
    yield put({
      type: userActions.GET_ME_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, "Get Me", 4000);
  }
}

function* updateUserInfo({ id, payload }) {
  try {
    const res = yield call(updateInfo, id, payload);
    NotificationManager.success(res?.data?.message, "Update info", 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, "Update info", 4000);
  }
}

function* updateUserProfile({ id, payload }) {
  try {
    const res = yield call(updateProfile, id, payload);
    NotificationManager.success(res?.data?.message, "Update profile", 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, "Update profile", 4000);
  }
}

function* UserSaga() {
  yield takeLatest(userActions.ADD_USER, addUser);
  yield takeLatest(userActions.GET_ME, getInfoMe);
  yield takeLatest(userActions.UPDATE_USER_INFO, updateUserInfo);
  yield takeLatest(userActions.UPDATE_USER_PROFILE, updateUserProfile);
}

export default UserSaga;
