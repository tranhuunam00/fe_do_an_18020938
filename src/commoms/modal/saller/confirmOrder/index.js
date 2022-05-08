import styles from "./styles.module.scss";
import { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import linkImg from "../../../../assets/linkImg";
import UserContext from "../../../../context_api/user/context";
import * as enums from "../../../../constants/enums";
import * as constants from "../../../../constants/constants";
import * as helper from "../../../../service/helper";

import {
  modalActions,
  selectorShowModal,
  selectorModalValue,
} from "../../../../redux/features/modal/modalSlice";
import { dialogActions } from "../../../../redux/features/dialog/dialogSlice";
import {
  orderActions,
  selectCurrentOrders,
} from "../../../../redux/features/order/orderSlice";

const ConfirmOrderModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [User] = useContext(UserContext);
  const valueModel = useSelector(selectorModalValue);
  const currentOrders = useSelector(selectCurrentOrders);
  console.log(valueModel);
  const handleCancelOrder = () => {
    const newCurrentOrders = [...currentOrders];
    const index = newCurrentOrders.findIndex((order) => {
      return order._id === valueModel._id;
    });
    const newOrder = { ...newCurrentOrders[index] };
    newOrder.status = enums.StatusOrder.CANCEL;
    newCurrentOrders[index] = newOrder;

    dispatch(
      dialogActions.changeDialog({
        component: constants.NameDialogModal.CHOOSE_DIALOG,
        title: "Hủy đơn hàng này",
        functionHandle: () => {
          dispatch(
            orderActions.updateOrder({
              orderId: valueModel._id,
              data: { statusOrder: enums.StatusOrder.CANCEL },
              newCurrentOrders: newCurrentOrders,
              newOrder: newOrder,
            })
          );
        },
      })
    );

    dispatch(dialogActions.showDialog());
  };
  return (
    <div className={styles.confirm}>
      <h3 className={styles.confirm_header}>Chi tiết đơn hàng</h3>
      <div className={styles.confirm_body}>
        <div className={styles.confirm_body_product}>
          <div>
            <span> Tên sản phẩm</span> : <p>{valueModel.product.name}</p>
          </div>
          <div>
            <span>Số lượng còn lại : </span> <p>{valueModel.product.amount} </p>
          </div>
          <div>
            <span>Số lượng mua : </span> <p>{valueModel.amount} </p>
          </div>
          <div>
            <span> Trạng thái đơn hàng :</span>{" "}
            <p>{helper.convertTextFromFilter(valueModel.status)}</p>
          </div>
          <div>
            <span> Kiểu thanh toán : </span>{" "}
            <p>
              {helper.convertTextFromFilter(valueModel.payment.paymentMethod)}
            </p>
          </div>
          <div>
            <span>Trạng thái thanh toán :</span>{" "}
            <p>{helper.convertTextFromFilter(valueModel.payment.status)}</p>
          </div>
          <div>
            <span>Mã thanh toán :</span>{" "}
            <p>{valueModel.payment.transactionId}</p>
          </div>
          <div>
            <span>Id đơn hàng :</span> <p>{valueModel._id}</p>
          </div>
        </div>
        <div className={styles.confirm_body_customer}>
          <div>
            <span> Tên người nhận:</span> <p>{valueModel.nameReceiver}</p>
          </div>
          <div>
            <span>Số điện thoại:</span> <p>{valueModel.phoneReceiver}</p>
          </div>
          <div>
            <span> Địa chỉ:</span> <p>{valueModel.addressReceiver}</p>
          </div>
          <div>
            <span> Lưu ý:</span>
            <p>{valueModel.notifyReceiver}</p>
          </div>
        </div>
      </div>

      <div className={styles.confirm_footer}>
        {User.user.sallerId &&
          valueModel.status === enums.StatusOrder.PREPARE && (
            <button className={`undisabled ${styles.confirm_footer_confirm}`}>
              Chấp nhận
            </button>
          )}
        {((User.user.sallerId &&
          valueModel.status === enums.StatusOrder.PREPARE) ||
          (User.user.customerId &&
            valueModel.status === enums.StatusOrder.PREPARE)) && (
          <button
            className={`undisabled ${styles.confirm_footer_delete}`}
            onClick={() => handleCancelOrder()}
          >
            Hủy đơn
          </button>
        )}{" "}
      </div>
    </div>
  );
};
export default ConfirmOrderModal;
