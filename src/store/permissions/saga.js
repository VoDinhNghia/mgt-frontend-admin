import { call, takeLatest } from "redux-saga/effects";
import {
  createPermissions,
  deletePermission,
} from "../../services/permissionService";
import { NotificationManager } from "react-notifications";
import { permissionActions } from "../actions";

function* addPermissions({ payload }) {
  try {
    const res = yield call(createPermissions, payload);
    NotificationManager.success(res?.data?.message, "Add permission", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Add permission",
      4000
    );
  }
}

function* removePermisson({ id }) {
  try {
    const res = yield call(deletePermission, id);
    NotificationManager.success(res?.data?.message, "Delete permission", 4000);
  } catch (error) {
    NotificationManager.error(
      error?.response?.data?.message,
      "Delete permission",
      4000
    );
  }
}

function* PermissionSaga() {
  yield takeLatest(permissionActions.ADD_PERMISSION, addPermissions);
  yield takeLatest(permissionActions.DELETE_PERMISSION, removePermisson);
}

export default PermissionSaga;
