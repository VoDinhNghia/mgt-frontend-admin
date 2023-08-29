import { call, takeLatest } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import { userActions } from "../actions";
import UserService from "../../services/UserService";
const userService = new UserService();

function* addUser(payload) {
    try {
        const res = yield call(userService.createUser(payload));
        NotificationManager.success(res?.data?.message, "Add user", 4000);
    } catch (error) {
        NotificationManager.error(error?.response?.data?.message, "Add user", 4000);
    }
}

function* UserSaga() {
    yield takeLatest(userActions.ADD_USER, addUser);
}

export default UserSaga;