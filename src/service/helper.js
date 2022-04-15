const moment = require("moment");
const { Filter, TypeProduct } = require("../constants/enums");

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

export const handleInput = (event, error, setError, input, setInput) => {
  if (event.type === "DELETE") {
    const name = event.name;
    const arr = [...input[name]];

    const newArr = arr.filter((a, index) => {
      return index !== event.id;
    });

    setInput({ ...input, [name]: newArr });
    return;
  }
  const name = event.target.name;
  let valueInput = event.target.value;
  const valueError = event.error;
  if (event.target.type == "file") {
    switch (name) {
      case "avatar":
        valueInput = input.avatar;
        if (event.target.files[0]) {
          valueInput = event.target.files[0];
        }
        break;
      case "cover":
        valueInput = input.avatar;
        if (event.target.files[0]) {
          valueInput = event.target.files[0];
        }
        break;
      case "imgProduct":
        const id = event.target.id;
        const arrImg = [...input[name]];
        arrImg[id] = event.target.files[0];
        valueInput = arrImg;
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

export const convertTextFromFilter = (filter) => {
  switch (filter) {
    case Filter.ALL:
      return "Tất cả";
    case Filter.OLD_TIME:
      return "Cũ nhất";
    case Filter.NEW_TIME:
      return "Mới nhất";
    case Filter.LESS_MONEY:
      return "Rẻ nhất";
    case Filter.MORE_MONEY:
      return "Đắt nhất";
    case TypeProduct.COURSE:
      return "Khóa học";
    case TypeProduct.FERTILIZER:
      return "Phân bón";
    case TypeProduct.TREE_IN_DOOR:
      return "Cây trong nhà";
    case TypeProduct.TREE_OUT_DOOR:
      return "Cây ngoài trời";
    case TypeProduct.KITS:
      return "Dụng cụ";
  }
};
