import axiosService from "../service/axiosService";
import queryString from "query-string";

export const createOrder = async (data) => {
  const token = localStorage.getItem("TOKEN");
  return await axiosService.post("/customers/order", data, token);
};

export const getAllOrder = async (query) => {
  const token = localStorage.getItem("TOKEN");

  let queryUrl = "";

  if (query) {
    queryUrl = queryString.stringify(query);
  }

  return await axiosService.get(`/orders?${queryUrl}`, token);
};

export const updateOrder = async ({ orderId, data }) => {
  const token = localStorage.getItem("TOKEN");
  return await axiosService.put(`/orders/${orderId}`, data, token);
};
