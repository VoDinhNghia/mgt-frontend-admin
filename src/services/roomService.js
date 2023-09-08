import axios from "axios";
import { URL_STUDENT_SERVER } from "../constants/constant";
import { setAuthHeader } from "./authService";

export const createRoom = async (payload) => {
  const res = await axios.post(`${URL_STUDENT_SERVER}/api/rooms`, payload, {
    headers: setAuthHeader(),
  });
  return res;
};

export const updateRoom = async (id, payload) => {
  const res = await axios.put(
    `${URL_STUDENT_SERVER}/api/rooms/${id}`,
    payload,
    {
      headers: setAuthHeader(),
    }
  );
  return res;
};

export const getListRooms = async (payload) => {
  const res = await axios.get(`${URL_STUDENT_SERVER}/api/rooms`, {
    params: payload,
    headers: setAuthHeader(),
  });
  return res;
};

export const deleteRoom = async (id) => {
  const res = await axios.delete(`${URL_STUDENT_SERVER}/api/rooms/${id}`, {
    headers: setAuthHeader(),
  });
  return res;
};
