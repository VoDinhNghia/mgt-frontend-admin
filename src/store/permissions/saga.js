import { call, takeLatest } from "redux-saga/effects";
import { createPermissions } from "../../services/permissionService";
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

function* PermissionSaga() {
  yield takeLatest(permissionActions.ADD_PERMISSION, addPermissions);
}

export default PermissionSaga;
