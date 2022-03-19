import axiosService from "../service/axiosService";
import { API_ENDPOINT } from "../constants/constants";

export const login = async (data) => {
  return await axiosService.post(`${API_ENDPOINT}/users/login`, data);
};
