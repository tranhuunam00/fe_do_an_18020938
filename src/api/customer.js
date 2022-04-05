import axiosService from "../service/axiosService";

export const getDetailCustomer = async (_id) => {
  return await axiosService.get(`/customers/${_id}`);
};

export const getProfileCustomer = async (token) => {
  return await axiosService.get(`/customers/profile`, token);
};
