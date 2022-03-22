import axiosService from "../service/axiosService";
import {
  API_ENDPOINT,
  API_ENDPOINT_GOOGLE_LOGIN,
} from "../constants/constants";

export const login = async (data) => {
  return await axiosService.post(`${API_ENDPOINT}/users/login`, data);
};

export const loginGoogle = () => {
  return axiosService.get(`${API_ENDPOINT_GOOGLE_LOGIN}`);
};
