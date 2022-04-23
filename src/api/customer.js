import axiosService from "../service/axiosService";

export const getDetailCustomer = async (_id) => {
  return await axiosService.get(`/customers/${_id}`);
};

export const getProfileCustomer = async (token) => {
  return await axiosService.get(`/customers/profile`, token);
};

export const createCart = async (body) => {
  const tokenLocal = localStorage.getItem("TOKEN");
  return await axiosService.post(`/customers/cart`, body, tokenLocal);
};

export const getCart = async () => {
  const tokenLocal = localStorage.getItem("TOKEN");
  return await axiosService.get(`/customers/cart`, tokenLocal);
};

export const updateCart = async (body) => {
  const tokenLocal = localStorage.getItem("TOKEN");
  return await axiosService.put(`/customers/cart`, body, tokenLocal);
};

export const deleteCart = async (body) => {
  const tokenLocal = localStorage.getItem("TOKEN");
  return await axiosService.deleteApi(`/customers/cart`, body, tokenLocal);
};
