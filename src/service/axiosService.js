import axios from "axios";
const apiEndPoint = process.env.REACT_APP_API_ENDPOIND
  ? process.env.REACT_APP_API_ENDPOIND + "/api"
  : "https://tranhuunam18020938-do-an.herokuapp.com" + "/api";

const instance = axios.create({
  baseURL: apiEndPoint,
  timeout: 40000,
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
  return Promise.reject(error);
};

instance.interceptors.response.use(handleSuccess, handleError);

instance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    if (err && err.config) {
      const originalConfig = err.config;
      if (originalConfig.url !== "/users/login") {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await instance.post("/users/refresh-token", {
              refreshToken: localStorage.getItem("REFRESH_TOKEN"),
              token: localStorage.getItem("TOKEN"),
              userId: JSON.parse(localStorage.getItem("USER"))._id,
            });

            if (rs.status == 200) {
              const { refreshToken, token } = rs.data.data;
              localStorage.setItem("TOKEN", token);
              localStorage.setItem("REFRESH_TOKEN", refreshToken);

              originalConfig.headers.Authorization = `Bearer ${token}`;
            }
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(err);
          }
        }
      }
    }
    return Promise.reject(err);
  }
);
const get = (url, token) => {
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const post = (url, body, token) => {
  return instance.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const postFormData = (url, body, token) => {
  return instance.post(url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const put = (url, body, token) => {
  return instance.put(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const putFormData = (url, body, token) => {
  return instance.put(url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteApi = (url, body, token) => {
  return instance.delete(
    url,
    { data: body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export default {
  handleSuccess,
  handleError,
  get,
  put,
  post,
  postFormData,
  putFormData,
  deleteApi,
};
