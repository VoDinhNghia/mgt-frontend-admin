import axios from "axios";
import { sessionFields, URL_STUDENT_SERVER } from "../constants/constant";

class AuthenService {
  setUser(user) {
    sessionStorage.setItem(sessionFields.user, JSON.stringify(user));
  }

  getCurrentUser() {
    const currentUser = sessionStorage.getItem(sessionFields.user);
    const user = currentUser ? JSON.parse(currentUser) : {};
    return user;
  }

  setAuthHeader() {
    const currentUser = this.getCurrentUser();
    const headers = {
      Authorization: `Bearer ${currentUser?.accessToken}`,
      "Content-Type": "application/json",
    };
    return headers;
  }

  setMultipartHeader() {
    const currentUser = this.getCurrentUser();
    const headers = {
      Authorization: `Bearer ${currentUser?.accessToken}`,
      "Content-Type": "multipart/form-data",
    };
    return headers;
  }

  async login(payload) {
    try {
      const res = await axios.post(
        `${URL_STUDENT_SERVER}/api/auth/login`,
        payload
      );
      this.setUser(res?.data?.data);
      return res?.data;
    } catch (error) {
      return {
        message: error?.response?.data?.message || error?.message,
      };
    }
  }
}

export default AuthenService;
