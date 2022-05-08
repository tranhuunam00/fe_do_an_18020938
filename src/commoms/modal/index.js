import styles from "./styles.module.scss";
import { selectorModalComponent } from "../../redux/features/modal/modalSlice";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useOutside } from "../../service/helper";

import { NameComponentModal } from "../../constants/constants";
import DetailProductModal from "./product/detailProduct/index";
import ConfirmOrderModal from "./saller/confirmOrder/index";

import { modalActions } from "../../redux/features/modal/modalSlice";

const Modal = ({ title }) => {
  const dispatch = useDispatch();
  const formModal = useRef();
  const handleCloseModal = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
      dispatch(modalActions.resetState());
    }, 200);
  };

  useOutside(formModal, handleCloseModal);

  const component = useSelector(selectorModalComponent);
  console.log(component);
  const children = () => {
    let child;
    switch (component) {
      case NameComponentModal.DETAIL_PRODUCT: {
        child = <DetailProductModal />;
        break;
      }
      case NameComponentModal.CONFIRM_ORDER: {
        child = <ConfirmOrderModal />;
        break;
      }
      default:
        child = <DetailProductModal />;
    }
    return child;
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content} ref={formModal}>
        {children()}
      </div>
    </div>
  );
};

export default Modal;
