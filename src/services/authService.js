import axios from "axios";
import { sessionFields, URL_STUDENT_SERVER } from "../constants/constant";

export const setUser = (user) => {
  sessionStorage.setItem(sessionFields.user, JSON.stringify(user));
}

export const getCurrentUser = () => {
  const currentUser = sessionStorage.getItem(sessionFields.user);
  const user = currentUser ? JSON.parse(currentUser) : {};
  return user;
}

export const setAuthHeader = () => {
  const currentUser = getCurrentUser();
  const headers = {
    Authorization: `Bearer ${currentUser?.accessToken}`,
    "Content-Type": "application/json",
  };
  return headers;
}

export const setMultipartHeader = () => {
  const currentUser = getCurrentUser();
  const headers = {
    Authorization: `Bearer ${currentUser?.accessToken}`,
    "Content-Type": "multipart/form-data",
  };
  return headers;
}

export const login = async(payload) => {
  try {
    const res = await axios.post(
      `${URL_STUDENT_SERVER}/api/auth/login`,
      payload
    );
    setUser(res?.data?.data);
    return res?.data;
  } catch (error) {
    return {
      message: error?.response?.data?.message || error?.message,
    };
  }
}
