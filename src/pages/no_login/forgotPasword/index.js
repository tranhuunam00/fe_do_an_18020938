import styles from "./styles.module.scss";
import clsx from "clsx";
import { useState, useContext } from "react";
import * as apis from "../../../api/auth";
import { useDispatch } from "react-redux";
import linkImg from "../../../assets/linkImg";

const ForgotPassword = (props) => {
  const display = clsx({});

  const [input, setInput] = useState({});

  const handleInput = (value) => {};

  const handleSubmit = async (events) => {};
  return (
    <div className={`${styles.forgotPasswordForm} ${display}`}>
      <form>
        <div className={styles.forgotPasswordForm_content}>
          <div className={styles.forgotPasswordForm_content__header}>
            <h1 className={styles.forgotPasswordForm_content__header__text}>
              Quên mật khẩu
            </h1>
            <img src={linkImg.logoImg}></img>
          </div>

          <p className={styles.forgotPasswordForm_content__lable}>Email </p>
          <input
            name="email"
            className={styles.forgotPasswordForm_content__input}
            type="email"
            placeholder="Tên đăng nhập"
            onChange={(value) => {
              handleInput(value);
            }}
          ></input>

          <button type="submit" onClick={(events) => handleSubmit(events)}>
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
