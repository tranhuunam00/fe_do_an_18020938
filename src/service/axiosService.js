import axios from "axios";

const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const handleSuccess = (response) => {
  return response;
};
const handleError = (error) => {
  return Promise.reject(error);
};

instance.interceptors.response.use(handleSuccess, handleError);

const get = (url) => {
  return instance.get(url);
};
const post = (url, body) => {
  return instance.post(url, body);
};

export default { handleSuccess, handleError, get, post };
