import styles from "./styles.module.scss";
import AddProduct from "./children/addProduct/index";
const Modal = ({ title }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <AddProduct />
      </div>
    </div>
  );
};

export default Modal;
