import styles from "./styles.module.scss";
import { useState } from "react";
import { validateEmail } from "../../service/helper";
import DatePicker from "react-datepicker";

const ErrorText = ({ textError }) => {
  return textError ? (
    <p className={styles.input__error}>{textError}</p>
  ) : (
    <p></p>
  );
};

const Input = ({
  lable,
  name,
  type = "text",
  placeholder,
  handleInput,
  value,
  ...props
}) => {
  const [error, setError] = useState(null);
  return (
    <div className={styles.input}>
      <p className={styles.input__lable}>{lable}</p>
      <input
        value={value}
        name={name}
        className={styles.input__input}
        type={type}
        placeholder={placeholder}
        onChange={(value) => {
          console.log(props.password);
          let e = null;
          if (type == "email" && !validateEmail(value.target.value)) {
            e = "Trường này phải là email";
          }
          if (name == "rePassword" && value.target.value != props.password)
            e = `Mật khẩu nhập lại không chính xác !`;

          if (props.minLength && value.target.value.length < props.minLength)
            e = `Bạn phải nhập ${lable} nhiều hơn ${props.minLength} kí tự !`;

          value.error = e;
          setError(e);
          handleInput(value);
        }}
      ></input>
      <ErrorText textError={error} />

      <div></div>
    </div>
  );
};

export const InputDate = ({
  lable,
  name,
  date,
  type = "date",
  placeholder,
  handleInput,
  value,
  ...props
}) => {
  const [error, setError] = useState(null);
  console.log(handleInput);
  return (
    <div className={styles.input}>
      <p className={styles.input__lable}>{lable}</p>
      <DatePicker
        value={value}
        type={type}
        name={name}
        selected={date}
        dateFormat="yyyy-MM-dd"
        className={styles.input__input}
        // type={type}
        // placeholder={placeholder}
        onChange={(value) => {
          console.log(value);
          let e = null;
          if (type == "email" && !validateEmail(value.target.value)) {
            e = "Trường này phải là email";
          }
          if (name == "rePassword" && value.target.value != props.password)
            e = `Mật khẩu nhập lại không chính xác !`;

          if (props.minLength && value.target.value.length < props.minLength)
            e = `Bạn phải nhập ${lable} nhiều hơn ${props.minLength} kí tự !`;

          value.error = e;
          value.target = { name: name, value: value };
          console.log(value);
          setError(e);
          handleInput(value);
        }}
      ></DatePicker>
      <ErrorText textError={error} />

      <div></div>
    </div>
  );
};

export default Input;
