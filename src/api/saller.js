import axiosService from "../service/axiosService";

export const getProfileSaller = async (token) => {
  return await axiosService.get(`/sallers/profile`, token);
};
