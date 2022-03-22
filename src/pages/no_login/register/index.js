import styles from "./styles.module.scss";
import clsx from "clsx";
import { useState, useContext } from "react";
import * as apis from "../../../api/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import linkImg from "../../../assets/linkImg";
import { checkError } from "../../../service/helper";
import Input from "../../../commoms/input";
const Register = (props) => {
  const display = clsx({});

  const [input, setInput] = useState({});
  const [error, setError] = useState({
    email: "email",
    password: "password",
    rePassword: "repassword",
    firstName: "firstName",
    lastName: "lastName",
  });

  const handleInput = (value) => {
    const name = value.target.name;
    const valueInput = value.target.value;
    const valueError = value.error;
    setError({ ...error, [name]: valueError });
    setInput({ ...input, [name]: valueInput });
  };

  const handleSubmit = async (events) => {
    events.preventDefault();
  };
  return (
    <div className={`${styles.registerForm} ${display}`}>
      <form>
        <div className={styles.registerForm_content}>
          <div className={styles.registerForm_content__header}>
            <h1 className={styles.registerForm_content__header__text}>
              Đăng ký tài khoản
            </h1>
            <img src={linkImg.logoImg}></img>
          </div>
          <div className={styles.registerForm_content__name}>
            <Input
              lable="Họ"
              name="firstName"
              type="text"
              placeholder="Họ của bạn"
              handleInput={handleInput}
              minLength={3}
            />
            <div className={styles.registerForm_content__name__center}></div>
            <Input
              lable="Tên"
              name="lastName"
              type="text"
              placeholder="Tên của bạn"
              handleInput={handleInput}
              minLength={3}
            />
          </div>
          <Input
            lable="Email"
            name="email"
            type="email"
            placeholder="Email của bạn"
            handleInput={handleInput}
          />
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
            disabled={!checkError(error) ? false : true}
            className={!checkError(error) ? "undisabled" : "disabled"}
            type="submit"
            onClick={(events) =>
              !checkError(error)
                ? handleSubmit(events)
                : events.preventDefault()
            }
          >
            Đăng kí
          </button>

          <p className={styles.registerForm_content__signin}>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
