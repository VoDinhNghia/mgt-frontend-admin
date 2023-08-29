import axios from "axios";
import { URL_STUDENT_SERVER } from "../constants/constant";
import { setAuthHeader } from "./authService";

export const createUser = async (payload) => {
  const res = await axios.post(`${URL_STUDENT_SERVER}/api/users`, payload, {
    headers: setAuthHeader(),
  });
  return res;
};

export const getMeInfo = async () => {
  const res = await axios.get(`${URL_STUDENT_SERVER}/api/auth/me`, {
    headers: setAuthHeader(),
  });
  return res;
};
