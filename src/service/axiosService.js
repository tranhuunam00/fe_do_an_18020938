import axios from "axios";
const apiEndPoint =
  process.env.REACT_APP_API_ENDPOIND || "http://localhost:5003";
console.log(process.env.REACT_APP_API_ENDPOIND);
const instance = axios.create({
  baseURL: apiEndPoint,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
instance.defaults.timeout = 10000;
const handleSuccess = (response) => {
  return response;
};
const handleError = (error) => {
  return error.response;
};

instance.interceptors.response.use(handleSuccess, handleError);

const get = (url) => {
  return instance.get(url);
};
const post = (url, body) => {
  return instance.post(url, body);
};

export default { handleSuccess, handleError, get, post };
