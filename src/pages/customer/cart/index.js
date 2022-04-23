import Layout from "../../../commoms/layout";
import Banner, { BannerMini } from "../../../commoms/banner";
import bannerImg from "../../../assets/img/banner4.jpg";
import styles from "./styles.module.scss";
import HeaderCart from "./header/index";
import ContentCard from "./content";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  cartActions,
  selectCurrentCarts,
} from "../../../redux/features/cart/cartSlice";
//
//

const Cart = () => {
  const dispatch = useDispatch();
  const currentCart = useSelector(selectCurrentCarts);

  const listContentCard = (currentCart) => {
    const listCard = currentCart.map((cart) => {
      return (
        <ContentCard
          key={cart._id}
          _idCart={cart._id}
          name={cart.name}
          totalPrice={cart.totalPrice}
          price={cart.price}
          imgUrl={cart?.imgUrl[0]}
          amount={cart.amount}
          productId={cart.productId}
        />
      );
    });
    return listCard;
  };

  useEffect(() => {
    dispatch(cartActions.getCart());
  }, []);

  return (
    <div className={styles.cart}>
      <BannerMini
        bannerImg={bannerImg}
        title="Cửa hàng tiện ích "
        description="Với những món hàng ở đây bạn có thể thay đổi cách nhìn cuộc sống .Hãy chọn nào!"
      />
      <div className={styles.cart_body}>
        <div className={styles.cart_body_head}>
          <HeaderCart />
        </div>
        <div className={styles.cart_body_content}></div>
        <div className={styles.body_footer}>
          {listContentCard(currentCart || [])}
        </div>
      </div>
    </div>
  );
};
const Result = () => {
  return Layout({ children: <Cart /> });
};

export default Result;
