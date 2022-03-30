import styles from "./styles.module.scss";
import { useState, useContext } from "react";
import * as apis from "../../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import linkImg from "../../../assets/linkImg";
import { checkError } from "../../../service/helper";
import Input, { InputDate } from "../../../commoms/input";
import userProvider from "../../../context_api/user/context";
import Footer from "../../../commoms/footer/index";
import "react-toastify/dist/ReactToastify.css";
import queryString from "query-string";
import * as constants from "../../../constants/constants";
import toastService from "../../../service/toast";
import "react-datepicker/dist/react-datepicker.css";
const Register = (props) => {
  const navigate = useNavigate();

  const [user, dispatch] = useContext(userProvider);
  const [startDate, setStartDate] = useState(new Date());
  const [input, setInput] = useState({ dob: new Date() });
  const [error, setError] = useState({
    email: "email",
    password: "password",
    rePassword: "repassword",
    firstName: "firstName",
    lastName: "lastName",
  });

  const handleInput = (value) => {
    console.log(value.target);
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
      const data = await apis.register(input);

      dispatch({ type: "HIDE_LOADING" });
      if (data.status === constants.STATUS_CODE_CREATED) {
        const query = queryString.stringify({
          title: "Xác nhận tài khoản",
          message: "Vui lòng vào mail đẻ xác nhận tài khoản",
          textButton: "Xác nhận",
          link: "/",
        });
        return navigate(`/notify/?${query}`);
      }

      toastService(data);
    } catch (e) {
      dispatch({ type: "HIDE_LOADING" });
    }
  };
  return (
    <div className={`${styles.registerForm}`}>
      <form>
        <div className={styles.registerForm_content}>
          <div className={styles.registerForm_content__header}>
            <h1 className={styles.registerForm_content__header__text}>
              Đăng ký tài khoản
            </h1>
            <img src={linkImg.logoImg}></img>
          </div>
          <InputDate
            lable="Ngày sinh"
            date={input.dob}
            handleInput={handleInput}
            name="dob"
            type="text"
            placeholder="Ngày sinh của bạn"
          ></InputDate>
          <div>
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
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
