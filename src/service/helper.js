const moment = require("moment");

export const validateEmail = (email) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const checkError = (error) => {
  for (let value in error) {
    if (error[value]) return true;
  }
  return false;
};

export const convertMessageFromData = (data) => {
  let res = "";
  switch (data) {
    case "SUCCESS":
      res = " thành công!";
      break;
    case "FAIL":
      res = " thất bại!";
      break;
    case "User not found":
      res = " người dùng không tồn tại!";
      break;
    default:
  }
  return res;
};

export const dateToStringLocal = (time, format) => {
  return moment(time).local().format(format);
};

export const handleInput = (value, error, setError, input, setInput) => {
  const name = value.target.name;
  let valueInput = value.target.value;
  const valueError = value.error;
  if (value.target.type == "file") {
    valueInput = input.avatar;
    if (value.target.files[0]) {
      valueInput = value.target.files[0];
    }
  }
  setError({ ...error, [name]: valueError });
  setInput({ ...input, [name]: valueInput });
};

export const getTokenFromLocal = () => {
  return localStorage.getItem("TOKEN");
};
export const getRefreshTokenFromLocal = () => {
  return localStorage.getItem("REFRESH_TOKEN");
};
export const getUserFromLocal = () => {
  return JSON.parse(localStorage.getItem("USER"));
};
export const getProductFromLocal = () => {
  return JSON.parse(localStorage.getItem("PRODUCT"));
};
