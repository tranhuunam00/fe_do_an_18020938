import styles from "./styles.module.scss";
import linkImg from "../../assets/linkImg";
import { useState } from "react";
import { convertTextFromFilter } from "../../service/helper";
const option = (name, options, handleClick, setSelect) => {
  return options.map((option) => (
    <p
      name={name}
      key={option}
      value={option}
      onClick={(event) => {
        event.target.value = option;
        event.target.name = name;
        setSelect(convertTextFromFilter(option));
        handleClick(event);
      }}
    >
      {convertTextFromFilter(option)}
    </p>
  ));
};
export const Select = ({ options, handleClick, className, ...props }) => {
  const [select, setSelect] = useState(
    convertTextFromFilter(props.defaultOption)
  );
  return (
    <div className={`${styles.filter} ${className}`}>
      <div className={styles.filter_head}>
        <span className={styles.filter_head_title}>{props.title}</span>
        <div className={styles.filter_head_body}>
          <p>{select}</p>
          <img src={props.imgUrl || linkImg.iconArrowDowm}></img>
        </div>
      </div>

      <div className={styles.filter_option}>
        {option(props.name, options, handleClick, setSelect)}
      </div>
    </div>
  );
};
