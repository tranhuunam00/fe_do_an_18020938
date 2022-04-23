import styles from "./styles.module.scss";
import {
  cartActions,
  selectCurrentCarts,
} from "../../../../redux/features/cart/cartSlice";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ContentCard = (props) => {
  const dispatch = useDispatch();
  const currentProduct = useSelector(selectCurrentCarts);

  const amount = props?.amount;
  const handleUpdateCart = (_idCart, productId, amount) => {
    let i;
    let carts = [...currentProduct];
    carts.forEach((c, index) => {
      console.log(c);
      if (c._id === _idCart) {
        i = index;
      }
    });
    carts[i] = { ...carts[i] };
    carts[i].amount = amount;
    carts[i].totalPrice = +amount * carts[i].price;
    dispatch(
      cartActions.updateCart({
        _idCart,
        product: productId,
        amount,
        newCurrentCarts: carts,
      })
    );
  };

  const handleDeleteCart = (_idCart) => {
    let carts = [...currentProduct];
    carts = carts.filter((c) => c._id !== _idCart);
    dispatch(
      cartActions.deleteCart({
        _idCart,
        newCurrentCarts: carts,
      })
    );
  };
  return (
    <div className={styles.contentCard}>
      <div className={styles.flex2}>
        <img className={styles.contentCard_img} src={props?.imgUrl}></img>
        {props?.name}
      </div>
      <div className={styles.flex1}>{props?.price} đ</div>
      <div className={styles.flex1}>
        <div className={styles.contentCard_amount}>
          <div
            className={styles.contentCard_amount_decrease}
            onClick={
              props
                ? () =>
                    handleUpdateCart(
                      props?._idCart,
                      props?.productId,
                      props?.amount - 1
                    )
                : null
            }
          >
            -
          </div>
          <div className={styles.contentCard_amount_text}>{props?.amount}</div>
          <div
            className={styles.contentCard_amount_increase}
            onClick={
              props
                ? () =>
                    handleUpdateCart(
                      props?._idCart,
                      props?.productId,
                      props?.amount + 1
                    )
                : null
            }
          >
            +
          </div>
        </div>
      </div>
      <div className={styles.flex1}>{props?.totalPrice} đ</div>
      <div
        className={`${styles.flex1} ${styles.contentCard_delete}`}
        onClick={() => handleDeleteCart(props?._idCart)}
      >
        Xóa
      </div>
    </div>
  );
};
export default ContentCard;
