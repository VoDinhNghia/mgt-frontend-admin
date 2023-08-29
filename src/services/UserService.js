import axios from "axios";
import { URL_STUDENT_SERVER } from "../constants/constant";
import AuthenService from "./AuthenService";

class UserService {
  authenService = new AuthenService();

  createUser(payload) {
    axios.post(`${URL_STUDENT_SERVER}/api/users`, payload, {
      headers: this.authenService.setAuthHeader(),
    });
  }

  updateUserInfo(id, payload) {
    axios.put(`${URL_STUDENT_SERVER}/api/users/${id}`, payload, {
      headers: this.authenService.setAuthHeader(),
    });
  }
}

export default UserService;
