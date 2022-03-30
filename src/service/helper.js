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
