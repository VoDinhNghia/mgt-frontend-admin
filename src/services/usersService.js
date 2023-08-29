import axios from "axios";
import { URL_STUDENT_SERVER } from "../constants/constant";
import { setAuthHeader } from "./authService";

export const createUser = (payload) =>
  axios.post(`${URL_STUDENT_SERVER}/api/users`, payload, {
    headers: setAuthHeader(),
  });

export const getMeInfo = () =>
  axios.get(`${URL_STUDENT_SERVER}/api/auth/me`, {
    headers: setAuthHeader(),
  });
