import axios from "axios";
import { URL_STUDENT_SERVER } from "../constants/constant";
import { setAuthHeader } from "./authService";

export const createPermissions = async (payload) => {
  const res = await axios.post(
    `${URL_STUDENT_SERVER}/api/permissions`,
    payload,
    {
      headers: setAuthHeader(),
    }
  );
  return res;
};

export const deletePermission = async (id) => {
  const res = await axios.delete(
    `${URL_STUDENT_SERVER}/api/permissions/${id}`,
    {
      headers: setAuthHeader(),
    }
  );
  return res;
};
