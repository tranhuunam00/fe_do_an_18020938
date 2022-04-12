import styles from "./styles.module.scss";
import clsx from "clsx";
import { useState, useContext } from "react";
import * as apis from "../../../api/auth";
import { useDispatch } from "react-redux";
import linkImg from "../../../assets/linkImg";
import Input from "../../../components/input";
import { checkError } from "../../../service/helper";
import userProvider from "../../../context_api/user/context";
import queryString from "query-string";
import { Link, useNavigate } from "react-router-dom";
import * as constants from "../../../constants/constants";
import toastService from "../../../service/toast";

const ForgotPassword = (props) => {
  const [user, dispatch] = useContext(userProvider);
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [error, setError] = useState({
    email: "email",
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
      const data = await apis.forgotPasword(input);
      dispatch({ type: "HIDE_LOADING" });
      toastService(data);
      if (data.status === constants.STATUS_CODE_OK) {
        const query = queryString.stringify({
          title: "Xác nhận tài khoản",
          message: "Vui lòng vào mail đẻ xác nhận tài khoản",
          textButton: "Xác nhận",
          link: "/",
        });
        return navigate(`/notify?${query}`);
      }
    } catch (e) {
      toastService(e.response);
      dispatch({ type: "HIDE_LOADING" });
    }
  };
  return (
    <div className={`${styles.forgotPasswordForm}`}>
      <form>
        <div className={styles.forgotPasswordForm_content}>
          <div className={styles.forgotPasswordForm_content__header}>
            <h1 className={styles.forgotPasswordForm_content__header__text}>
              Quên mật khẩu
            </h1>
            <img src={linkImg.logoImg}></img>
          </div>

          <Input
            lable="Email"
            name="email"
            type="email"
            placeholder="Email của bạn"
            handleInput={handleInput}
            minLength={6}
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
            Gửi mail
          </button>
          <p className={styles.forgotPasswordForm_content__help}>
            Bạn hãy check mail của mình . Hoặc có thể ấn gửi lại .
            <br /> Nếu có lỗi gì hay liên hệ với ADMIN
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
