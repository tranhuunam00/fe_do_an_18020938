import styles from "./styles.module.scss";
import clsx from "clsx";
import { useState, useContext } from "react";
import * as apis from "../../../api/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import linkImg from "../../../assets/linkImg";
import userProvider from "../../../context_api/user/context";
import Input from "../../../commoms/input";
import { checkError } from "../../../service/helper";
const Login = (props) => {
  const [user, dispatch] = useContext(userProvider);

  const [input, setInput] = useState({});
  const [error, setError] = useState({ email: "email", password: "password" });

  const handleInput = (value) => {
    const name = value.target.name;
    const valueInput = value.target.value;
    const valueError = value.error;
    setError({ ...error, [name]: valueError });
    setInput({ ...input, [name]: valueInput });
  };

  const handleSubmit = async (events) => {
    events.preventDefault();

    const data = await apis.login(input);
    if (data.status == 200) {
      dispatch({ type: "ADD_USER", payload: data.data.data });
    }
  };
  const handleLoginGoogle = (events) => {
    events.preventDefault();

    apis.loginGoogle();
  };
  return (
    <div className={styles.loginForm}>
      <form>
        <div className={styles.loginForm_content}>
          <div className={styles.loginForm_content__header}>
            <h1 className={styles.loginForm_content__header__text}>
              Đăng nhập
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
          <Input
            lable="Mật khẩu"
            name="password"
            type="password"
            placeholder="Mật khẩu của bạn"
            handleInput={handleInput}
            minLength={6}
          />

          <button
            disabled={!checkError(error) ? false : true}
            className={!checkError(error) ? "undisabled" : "disabled"}
            type="submit"
            onClick={(events) =>
              !checkError(error)
                ? handleSubmit(events)
                : events.preventDefault()
            }
          >
            Đăng nhập
          </button>

          <button type="submit" onClick={(events) => handleLoginGoogle(events)}>
            Login google
          </button>

          {/* <button
            disabled={!checkError(error) ? false : true}
            className={!checkError(error) ? "undisabled" : "disabled"}
            type="submit"
            onClick={(events) =>
              !checkError(error)
                ? handleSubmit(events)
                : events.preventDefault()
            }
          >
            Đăng nhập Google
          </button> */}
          <Link
            className={styles.loginModal_content__forgot}
            to="/forgot-password"
          >
            Quên mật khẩu?
          </Link>
          <p className={styles.loginForm_content__signin}>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
