import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { validateEmail } from "../../service/helper";
import DatePicker from "react-datepicker";
import * as helper from "../../service/helper";

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
  useEffect(() => {
    if (name == "rePassword" && value != props.password)
      setError(`Mật khẩu nhập lại không chính xác !`);
  }, [props.password]);
  return (
    <div className={styles.input} style={props.style}>
      <p className={styles.input__lable}>{lable}</p>
      <input
        value={value}
        name={name}
        className={styles.input__input}
        type={type}
        placeholder={placeholder}
        onChange={(value) => {
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
  dateFormat,
  value,
  ...props
}) => {
  const [error, setError] = useState(null);
  return (
    <div className={styles.input}>
      <div className={styles.input_date}>
        <p className={styles.input_date__lable}>{lable}</p>
        <DatePicker
          value={value}
          type={type}
          name={name}
          selected={date}
          dateFormat={dateFormat}
          className={styles.input_date__input}
          // type={type}
          // placeholder={placeholder}
          onChange={(value) => {
            let e = null;

            if (props.maxTime && value > props.maxTime) {
              e = `Bạn chọn ${lable} không hợp lệ !`;
            }

            // if (props.require && !value) e = `Bạn phải chọn ${lable} !`;
            value.error = e;
            value.target = {
              name: name,
              value: helper.dateToStringLocal(value, dateFormat.toUpperCase()),
            };

            setError(e);
            handleInput(value);
          }}
        ></DatePicker>
      </div>

      <ErrorText textError={error} />

      <div></div>
    </div>
  );
};

export const InputTextArea = (props) => {
  const [error, setError] = useState(null);
  return (
    <div className={styles.input}>
      <div className={styles.input_area}>
        <p className={styles.input_area__lable}>{props.lable}</p>
        <textarea
          name={props.name}
          value={props.value}
          onChange={(value) => {
            let e = null;

            if (
              props.minlength &&
              value.target.value.length < +props.minlength
            ) {
              e = `${props.lable} phải dài hơn ${+props.minlength}`;
            }
            setError(e);
            value.error = e;
            props.handleInput(value);
          }}
          rows="4"
        ></textarea>
      </div>
      <ErrorText textError={error} />
      <div></div>
    </div>
  );
};
export default Input;
