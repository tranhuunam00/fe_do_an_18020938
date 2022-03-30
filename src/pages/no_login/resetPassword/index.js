import styles from "./styles.module.scss";
import clsx from "clsx";
import { useState, useContext } from "react";
import * as apis from "../../../api/auth";
import { useDispatch } from "react-redux";
import linkImg from "../../../assets/linkImg";
import Input from "../../../commoms/input";
import { checkError } from "../../../service/helper";
import userProvider from "../../../context_api/user/context";
import queryString from "query-string";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as constants from "../../../constants/constants";
import { toast } from "react-toastify";

const ResetPassword = (props) => {
  const [user, dispatch] = useContext(userProvider);
  const [query, searchQuery] = useSearchParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [error, setError] = useState({
    password: "",
    rePassword: "",
  });

  const handleInput = (value) => {
    const name = value.target.name;
    const valueInput = value.target.value;
    const valueError = value.error;
    setError({ ...error, [name]: valueError });
    setInput({ ...input, [name]: valueInput });
  };

  const handleSubmit = async (events) => {
    try {
      events.preventDefault();
      dispatch({ type: "SHOW_LOADING" });
      const data = await apis.resetPassword({
        token: query.get("token"),
        newPassword: input.password,
      });
      toast.success(data.data.message);

      dispatch({ type: "HIDE_LOADING" });
      if (data.status === constants.STATUS_CODE_OK) {
        return navigate(`/login`);
      }
      toast.error(data.data.message);
    } catch (e) {
      toast.error(e.message);
      dispatch({ type: "HIDE_LOADING" });
    }
  };
  return (
    <div className={`${styles.resetPasswordForm}`}>
      <form>
        <div className={styles.resetPasswordForm_content}>
          <div className={styles.resetPasswordForm_content__header}>
            <h1 className={styles.resetPasswordForm_content__header__text}>
              Thay đổi mật khẩu
            </h1>
            <img src={linkImg.logoImg}></img>
          </div>

          <Input
            lable="Mật khẩu"
            name="password"
            type="password"
            placeholder="Mật khẩu của bạn"
            handleInput={handleInput}
            minLength={6}
          />
          <Input
            lable="Nhập lại mật khẩu"
            name="rePassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            handleInput={handleInput}
            minLength={6}
            password={input.password}
          />

          <button
            disabled={checkError(error)}
            className={!checkError(error) ? "undisabled" : "disabled"}
            type="submit"
            onClick={(events) => {
              !checkError(error)
                ? handleSubmit(events)
                : events.preventDefault();
            }}
          >
            Xác nhận
          </button>
          <p className={styles.resetPasswordForm_content__help}>
            Bạn hãy check mail của mình . Hoặc có thể ấn gửi lại .
            <br /> Nếu có lỗi gì hay liên hệ với ADMIN
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
