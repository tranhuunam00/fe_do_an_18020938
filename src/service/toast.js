import { toast } from "react-toastify";

const convertMessageRegister = (status) => {
  let message;
  switch (status.toUpperCase()) {
    case "User already exists":
      return (message = "Tài khoản đã tồn tại trong hệ thống!");
    case "SUCCESS":
      return (message = "Thành công!");
    case "PASSWORD_NOT_MATCH":
      return (message = "Mật khẩu sai!");
    case "USER_NOT_FOUND":
      return (message = "Người dùng không tồn tại");
    case "USER_ALREADY_EXIST":
      return (message = "Người dùng đã tồn tại");
    default:
      message = "lỗi";
  }
  return message;
};

const toastService = (data) => {
  const message = convertMessageRegister(data.data.message);

  if (data.status == 200 || data.status == 201 || data.status == 203) {
    return toast.success(message);
  }
  return toast.error(message);
};
export default toastService;
