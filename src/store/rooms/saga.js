import { call, put, takeLatest } from "redux-saga/effects";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getListRooms,
} from "../../services/roomService";
import { NotificationManager } from "react-notifications";
import { roomActions } from "../actions";

function* addRoom({ payload }) {
  try {
    const res = yield call(createRoom, payload);
    NotificationManager.success(res?.data?.message, "Add room", 4000);
  } catch (error) {
    NotificationManager.error(error?.response?.data?.message, "Add room", 4000);
  }
}

function* editRoom({ id, payload }) {
  try {
    const res = yield call(updateRoom, id, payload);
    NotificationManager.success(res?.data?.message, "Update room", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Update room",
      4000
    );
  }
}

function* removeRoom({ id }) {
  try {
    const res = yield call(deleteRoom, id);
    NotificationManager.success(res?.data?.message, "Delete room", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete room",
      4000
    );
  }
}

function* fetchListRooms({ payload }) {
  try {
    const res = yield call(getListRooms, payload);
    yield put({
      type: roomActions.GET_LIST_ROOM_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Get list room",
      4000
    );
  }
}

function* RoomSaga() {
  yield takeLatest(roomActions.ADD_ROOM, addRoom);
  yield takeLatest(roomActions.UPDATE_ROOM, editRoom);
  yield takeLatest(roomActions.DELETE_ROOM, removeRoom);
  yield takeLatest(roomActions.GET_LIST_ROOM, fetchListRooms);
}

export default RoomSaga;
