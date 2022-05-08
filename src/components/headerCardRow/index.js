import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
const HeaderCart = ({ handleSelectAll, check, hideInput, ...props }) => {
  const [select, setSelect] = useState(false);
  useEffect(() => {
    setSelect(check);
  }, [check]);
  return (
    <div className={styles.headerCard}>
      <div className={styles.flex2}>
        {!hideInput && (
          <input
            type="checkbox"
            className={styles.headerCard_all}
            checked={select || false}
            onChange={() => {}}
            onClick={() => {
              setSelect(!select);
              handleSelectAll({ select: !select });
            }}
          ></input>
        )}
        Sản phẩm
      </div>
      <div className={styles.flex1}>
        {props.confirm ? "Thanh toán" : "Đơn giá"}
      </div>

      <div className={styles.flex1}>Số lượng</div>
      <div className={styles.flex1}>Số tiền</div>
      {props.confirm && <div className={styles.flex1}> Trạng thái</div>}
      <div className={styles.flex1}>Thao tác</div>
    </div>
  );
};
export default HeaderCart;
