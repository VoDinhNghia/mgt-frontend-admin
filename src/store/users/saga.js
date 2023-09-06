import { call, put, takeLatest } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import { userActions } from "../actions";
import {
  createUser,
  getMeInfo,
  updateInfo,
  updateProfile,
  getListUserAdmin,
  getListUsers,
  deleteUser,
} from "../../services/usersService";

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
    NotificationManager.error(
      error?.response?.data?.message,
      "Update info",
      4000
    );
  }
}

function* updateUserProfile({ id, payload }) {
  try {
    const res = yield call(updateProfile, id, payload);
    NotificationManager.success(res?.data?.message, "Update profile", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update profile",
      4000
    );
  }
}

function* fetchAdminList() {
  try {
    const res = yield call(getListUserAdmin);
    yield put({
      type: userActions.GET_LIST_USER_ADMIN_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get list admin",
      4000
    );
  }
}

function* fetchListUsers({ payload }) {
  try {
    const res = yield call(getListUsers, payload);
    yield put({
      type: userActions.GET_LIST_USER_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get list users",
      4000
    );
  }
}

function* removeUser({ id }) {
  try {
    const res = yield call(deleteUser, id);
    NotificationManager.success(res?.data?.message, "Delete user", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete user",
      4000
    );
  }
}

function* UserSaga() {
  yield takeLatest(userActions.ADD_USER, addUser);
  yield takeLatest(userActions.GET_ME, getInfoMe);
  yield takeLatest(userActions.UPDATE_USER_INFO, updateUserInfo);
  yield takeLatest(userActions.UPDATE_USER_PROFILE, updateUserProfile);
  yield takeLatest(userActions.GET_LIST_USER_ADMIN, fetchAdminList);
  yield takeLatest(userActions.GET_LIST_USER, fetchListUsers);
  yield takeLatest(userActions.DELETE_USER, removeUser);
}

export default UserSaga;
