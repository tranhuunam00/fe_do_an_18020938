import axiosService from "../service/axiosService";
import { API_ENDPOINT_GOOGLE_LOGIN } from "../constants/constants";

export const login = async (data) => {
  return await axiosService.post(`/users/login`, data);
};

export const loginGoogle = async () => {
  return await axiosService.get(`${API_ENDPOINT_GOOGLE_LOGIN}`);
};

export const register = async (data) => {
  return await axiosService.postFormData(`/users/register`, data);
};

export const forgotPasword = async (data) => {
  return await axiosService.post(`/users/forgot-password`, data);
};

export const resetPassword = async (data) => {
  return await axiosService.post(`/users/reset-password`, data);
};

export const getAllCustomers = (token) => {
  return axiosService.get(`/customers`, token);
};

export const updateUser = async (data, token) => {
  return await axiosService.putFormData(`/users/profile`, data, token);
};

export const logout = async (data) => {
  return await axiosService.deleteApi(`/users/logout`, data);
};
