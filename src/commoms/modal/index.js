import styles from "./styles.module.scss";
import { selectorModalComponent } from "../../redux/features/modal/modalSlice";
import { useSelector } from "react-redux";
import { NameComponentModal } from "../../constants/constants";
import DetailProductModal from "./product/detailProduct/index";
const Modal = ({ title }) => {
  const component = useSelector(selectorModalComponent);

  const children = () => {
    let child;
    switch (component) {
      case NameComponentModal.DETAIL_PRODUCT: {
        child = <DetailProductModal />;
        break;
      }
      default:
        child = <DetailProductModal />;
    }
    return child;
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>{children()}</div>
    </div>
  );
};

export default Modal;
