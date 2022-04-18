import styles from "./styles.module.scss";
import { useState, useContext, useEffect } from "react";
import * as apis from "../../../api/auth";
import { Link } from "react-router-dom";
import linkImg from "../../../assets/linkImg";
import userProvider from "../../../context_api/user/context";
import Input from "../../../components/input";
import { checkError } from "../../../service/helper";
import { GoogleLogin } from "react-google-login";
import toastService from "../../../service/toast";
import Footer from "../../../commoms/footer/index";
import { useParams } from "react-router-dom";
const Login = (props) => {
  const [user, dispatch] = useContext(userProvider);
  const [input, setInput] = useState({});
  const [error, setError] = useState({ email: "email", password: "password" });
  const { status } = useParams();
  useEffect(() => {
    if (status) {
      toastService({ status: 200, data: { message: "CONFIRM_SUCCESS" } });
    }
  }, [status]);
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

      const data = await apis.login(input);

      if (data.status == 200) {
        dispatch({ type: "ADD_USER", payload: data.data.data });
        localStorage.setItem("TOKEN", data.data.data.token);
        localStorage.setItem("REFRESH_TOKEN", data.data.data.refreshToken);
      }

      dispatch({ type: "HIDE_LOADING" });
      toastService(data);
    } catch (err) {
      toastService(err.response);
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  const responseGoogle = (response) => {};
  return (
    <div className={styles.loginForm}>
      <form method="get" action={`http://localhost:5000/api/auths/google`}>
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
            className={!checkError(error) ? "undisabled" : "disabled"}
            type="submit"
            onClick={(events) => {
              !checkError(error)
                ? handleSubmit(events)
                : events.preventDefault();
            }}
          >
            Đăng nhập
          </button>
          <GoogleLogin
            clientId="538083935372-25hfb8q8gute01d17orr12d0139hk159.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />

          {/* <button type="submit">login chay</button> */}

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
      <Footer />
    </div>
  );
};

export default Login;
