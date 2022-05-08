import styles from "./styles.module.scss";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { convertTextFromFilter } from "../../service/helper";
import { NameComponentModal } from "../../constants/constants";

import { modalActions } from "../../redux/features/modal/modalSlice";

const ContentCard = (props) => {
  const dispatch = useDispatch();
  const [convert, setConvert] = useState({
    typePayment: "",
    statusPayment: "",
  });
  useEffect(() => {
    const typePayment = convertTextFromFilter(props?.payment.paymentMethod);
    const statusPayment = convertTextFromFilter(props?.payment.status);
    const statusOrder = convertTextFromFilter(props?.status);
    setConvert({
      typePayment,
      statusPayment,
      statusOrder,
    });
  }, [props]);

  return (
    <div className={styles.contentCard}>
      <div className={styles.flex2}>
        <img
          className={styles.contentCard_img}
          src={props?.product.imgUrl[0]}
        ></img>
        {props?.product.name}
      </div>
      <div className={`${styles.flex1} ${styles.payment}`}>
        <div className={`${styles.flex1} ${styles.payment_type}`}>
          {convert.typePayment}
        </div>
        <div className={`${styles.flex1} ${styles.payment_status}`}>
          {convert.statusPayment}
        </div>
      </div>

      <div className={styles.flex1}>
        <div className={styles.contentCard_amount}>
          <div className={styles.contentCard_amount_text}>{props?.amount}</div>
        </div>
      </div>
      <div className={styles.flex1}>{props?.totalPrice} đ</div>
      <div className={`${styles.flex1} ${styles.statusOrder}`}>
        {convert.statusOrder}
      </div>

      <div className={styles.flex1}>
        <div
          className={`${styles.flex1} ${styles.contentCard_confirm}`}
          onClick={() => {
            dispatch(
              modalActions.changeModal({
                component: NameComponentModal.CONFIRM_ORDER,
                valueState: props,
              })
            );

            dispatch(modalActions.showModal());
          }}
        >
          Chi tiết
        </div>
      </div>
    </div>
  );
};
export default ContentCard;
