import axiosService from "../service/axiosService";
import {
  API_ENDPOINT,
  API_ENDPOINT_GOOGLE_LOGIN,
} from "../constants/constants";

export const login = async (data) => {
  return await axiosService.post(`/users/login`, data);
};

export const loginGoogle = () => {
  return axiosService.get(`${API_ENDPOINT_GOOGLE_LOGIN}`);
};

export const register = (data) => {
  return axiosService.post(`/users/register`, data);
};

export const forgotPasword = (data) => {
  return axiosService.post(`/users/forgot-password`, data);
};

export const resetPassword = (data) => {
  return axiosService.post(`/users/reset-password`, data);
};
