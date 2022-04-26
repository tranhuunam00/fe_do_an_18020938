import axiosService from "../service/axiosService";
import queryString from "query-string";

export const createOrder = async (data) => {
  const token = localStorage.getItem("TOKEN");
  return await axiosService.post("/customers/order", data, token);
};
