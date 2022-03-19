import styles from "./styles.module.scss";
import clsx from "clsx";
import { useState, useContext } from "react";
import * as apis from "../../../api/auth";
import userProvider from "../../../context_api/user/context";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../features/modal/modalSlice";
const LoginModal = (props) => {
  const dispatchRedux = useDispatch();
  const display = clsx({
    [styles.undisplay]: props.undisplay,
  });

  const [user, dispatch] = useContext(userProvider);

  const [input, setInput] = useState({});

  const handleInput = (value) => {
    const name = value.target.name;
    const valueInput = value.target.value;
    setInput({ ...input, [name]: valueInput });
  };

  const handleSubmit = async (events) => {
    events.preventDefault();

    const data = await apis.login(input);
    if (data.status == 200) {
      dispatch({ type: "ADD_USER", payload: data.data.data });
    }
    console.log(user);
  };
  return (
    <div className={`${styles.loginModal} ${display}`}>
      <p
        className={styles.outSide}
        onClick={() => {
          dispatchRedux(modalActions.changeComponent(""));
          dispatchRedux(modalActions.hideModal(""));
        }}
      ></p>
      <form>
        <div className={styles.loginModal_content}>
          <h1 className={styles.loginModal_content__header}>Login</h1>
          <p className={styles.loginModal_content__lable}>Email </p>
          <input
            name="email"
            className={styles.loginModal_content__input}
            type="email"
            placeholder="Tên đăng nhập"
            onChange={(value) => {
              handleInput(value);
            }}
          ></input>
          <p className={styles.loginModal_content__lable}>Mật khẩu</p>
          <input
            name="password"
            className={styles.loginModal_content__input}
            type="password"
            placeholder="Mật khẩu"
            onChange={(value) => {
              handleInput(value);
            }}
          ></input>
          <button type="submit" onClick={(events) => handleSubmit(events)}>
            Login
          </button>
          <a className={styles.loginModal_content__forgot} href="#">
            Quên mật khẩu?
          </a>
          <p className={styles.loginModal_content__signin}>
            Bạn chưa có tài khoản? <a href="#">Đăng kí</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
