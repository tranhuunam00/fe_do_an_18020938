const moment = require("moment");
const { useEffect, useState } = require("react");
const { useSelector } = require("react-redux");
const {
  selectorShowDialog,
  selectorDialogShowModal,
} = require("./../redux/features/dialog/dialogSlice");

const {
  Filter,
  TypeProduct,
  StatusPayment,
  StatusOrder,
  TypePayment,
} = require("../constants/enums");

export const validateEmail = (email) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePhoneNumber = (phoneNumber) => {
  var re = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  return re.test(phoneNumber);
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
    case StatusOrder.PREPARE:
      return "Chuẩn bị";
    case StatusPayment.AWAIT_MOMO:
      return "Đợi thanh toán Momo";
    case StatusPayment.SUCCESS:
      return "Hoàn thành";
    case StatusPayment.UNPAID:
      return "Chưa thanh toán";
    case StatusPayment.PAID:
      return "Đã thanh toán";
    case TypePayment.MOMO:
      return "Momo";
    case TypePayment.DIRECT:
      return "Trực tiếp";
    case StatusOrder.CANCEL:
      return "Hủy";
    case StatusOrder.PREPARE:
      return "Chuẩn bị";
    case StatusOrder.CONFIRM:
      return "Đã chấp nhận";
    case StatusOrder.DELIVERY_SHIP:
      return "Giao cho ship";
    case StatusOrder.SHIP:
      return "Đang ship";
    case StatusOrder.REVEICE:
      return "Đã nhận";
    case StatusOrder.SUCCESS:
      return "Hoàn thành";
    case StatusOrder.NOT_CONFIRMED:
      return "Không chấp nhận";
    default:
      return "OK";
  }
};

export function useOutside(ref, setOpen, cl) {
  const showModal = useSelector(selectorDialogShowModal);
  const [showModelState, setShowModalState] = useState(showModal);
  console.log("render");
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (showModelState) {
      return;
    }
    console.log("qua");
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (showModal) {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    } else {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showModal, ref, setOpen]);
}
