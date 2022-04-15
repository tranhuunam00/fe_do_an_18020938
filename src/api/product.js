import axiosService from "../service/axiosService";
import queryString from "query-string";

export const getAllProduct = async (filter) => {
  const query = queryString.stringify(filter.query);
  return await axiosService.get(
    `/products/${filter.sallerId}?${query}`,
    filter.token
  );
};

export const getAllProductByType = async (filter) => {
  const query = queryString.stringify(filter.query);
  return await axiosService.get(
    `/products/${filter.sallerId}?${query}`,
    filter.token
  );
};

export const createProduct = async (data) => {
  const token = localStorage.getItem("TOKEN");
  return await axiosService.postFormData(`/products`, data, token);
};
