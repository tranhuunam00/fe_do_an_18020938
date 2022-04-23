import styles from "./styles.module.scss";

const HeaderCart = () => {
  return (
    <div className={styles.headerCard}>
      <div className={styles.flex2}>
        <input type="checkbox" className={styles.headerCard_all}></input>
        Sản phẩm
      </div>
      <div className={styles.flex1}>Đơn giá</div>
      <div className={styles.flex1}>Số lượng</div>
      <div className={styles.flex1}>Số tiền</div>
      <div className={styles.flex1}>Thao tác</div>
    </div>
  );
};
export default HeaderCart;
