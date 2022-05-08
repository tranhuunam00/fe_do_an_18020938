import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { validateEmail } from "../../service/helper";
import DatePicker from "react-datepicker";
import * as helper from "../../service/helper";
import linkImg from "../../assets/linkImg";
import { BiAddToQueue } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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
  className,
  ...props
}) => {
  const [error, setError] = useState(null);
  useEffect(() => {
    if (name == "rePassword" && value != props.password)
      setError(`Mật khẩu nhập lại không chính xác !`);
  }, [props.password]);
  console.log(props.minNumber);
  return (
    <div className={`${styles.input} ${className}`} style={props.style}>
      <div className={styles.input__lable}>{lable}</div>
      <input
        value={value}
        name={name}
        className={styles.input__input}
        type={type}
        placeholder={placeholder}
        onChange={(value) => {
          let e = null;
          if (type === "number" && value.target.value < +props.minNumber) {
            e = `${lable} phải lớn hơn ${props.minNumber}`;
          }
          if (type == "email" && !validateEmail(value.target.value)) {
            e = "Trường này phải là email";
          }
          if (name == "rePassword" && value.target.value != props.password)
            e = `Mật khẩu nhập lại không chính xác !`;

          if (props.minLength && value.target.value.length < props.minLength)
            e = `Bạn phải nhập ${lable} nhiều hơn ${props.minLength} kí tự !`;
          if (
            type == "number" &&
            name == "phoneReceiver" &&
            !helper.validatePhoneNumber(value.target.value)
          )
            e = `Bạn đã nhập sai ${lable} !`;
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
          placeholder={props.placeholder}
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

            if (props.required && value.target.value.length < 1) {
              e = `Bạn chưa nhập ${props.lable} `;
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

export const InputImg = ({ handleInput, name }) => {
  const [input, setInput] = useState({});

  return (
    <div className={styles.avatar}>
      <input
        type="file"
        name={name}
        title=" "
        accept="image/png, image/jpeg"
        onChange={(event) => {
          if (event.target.files[0]) {
            setInput({ [name]: event.target.files[0] });
            handleInput(event);
          }
        }}
      ></input>

      <img className={styles.avatar_camera} src={linkImg.cameraSvg}></img>
      <img
        className={styles.avatar_show}
        src={
          input[name] ? URL.createObjectURL(input[name]) : linkImg.hotGirlVnu
        }
      ></img>
    </div>
  );
};

export const CardImgInput = ({ name, handleInput, img, id }) => {
  return (
    <div className={styles.cardImg}>
      <input
        id={id}
        type="file"
        name={name}
        title=" "
        accept="image/png, image/jpeg"
        onChange={(event) => {
          if (event.target.files[0]) {
            handleInput(event);
          }
        }}
      ></input>
      <div className={styles.cardImg_camera}>
        <BiAddToQueue />
      </div>
      {img && (
        <img
          className={styles.cardImg_show}
          src={typeof img !== "string" && img ? URL.createObjectURL(img) : img}
        ></img>
      )}

      {img && (
        <AiFillDelete
          onClick={() => handleInput({ type: "DELETE", id, name })}
          className={styles.cardImg_delete}
        />
      )}
    </div>
  );
};

export default Input;
