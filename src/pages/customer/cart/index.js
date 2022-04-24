import Layout from "../../../commoms/layout";
import Banner, { BannerMini } from "../../../commoms/banner";
import bannerImg from "../../../assets/img/banner4.jpg";
import styles from "./styles.module.scss";
import HeaderCart from "../../../components/headerCardRow/index";
import ContentCard from "../../../components/contentCardRow";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  cartActions,
  selectCurrentCarts,
  selectDeleteCart,
} from "../../../redux/features/cart/cartSlice";
//
//

const Cart = () => {
  const dispatch = useDispatch();
  const currentCart = useSelector(selectCurrentCarts);
  const deleteCart = useSelector(selectDeleteCart);

  const [selectCart, setSelectCart] = useState([]);

  const calculatePrice = () => {
    let total = 0;

    if (selectCart.length == 0) {
      return 0;
    }
    currentCart.forEach((c) => {
      if (selectCart.includes(c._id)) {
        total += c.amount * c.price;
      }
    });
    return total;
  };

  const handleSelectCart = (event) => {
    if (event.select) {
      setSelectCart([...selectCart, event.product?._idCart]);
    } else {
      let newSelectCart = [...selectCart];
      newSelectCart = newSelectCart.filter((c) => {
        return c != event.product._idCart;
      });
      setSelectCart(newSelectCart);
    }
  };

  const handleSelectAll = (event) => {
    if (event.select) {
      setSelectCart(currentCart.map((c) => c._id));
    } else {
      setSelectCart([]);
    }
  };

  const listContentCard = (currentCart) => {
    const listCard = currentCart.map((cart) => {
      return (
        <ContentCard
          check={selectCart.includes(cart._id)}
          key={cart._id}
          _idCart={cart._id}
          name={cart.name}
          totalPrice={cart.totalPrice}
          price={cart.price}
          imgUrl={cart?.imgUrl[0]}
          amount={cart.amount}
          productId={cart.productId}
          handleSelectCart={handleSelectCart}
        />
      );
    });
    return listCard;
  };

  useEffect(() => {
    dispatch(cartActions.getCart());
  }, []);

  useEffect(() => {
    setSelectCart(selectCart.filter((se) => se != deleteCart));
  }, [deleteCart]);

  return (
    <div className={styles.cart}>
      <BannerMini
        bannerImg={bannerImg}
        title="Cửa hàng tiện ích "
        description="Với những món hàng ở đây bạn có thể thay đổi cách nhìn cuộc sống .Hãy chọn nào!"
      />
      <div className={styles.cart_body}>
        <div className={styles.cart_body_head}>
          <HeaderCart
            handleSelectAll={handleSelectAll}
            check={selectCart.length === currentCart.length}
          />
        </div>
        <div className={styles.cart_body_content}>
          {listContentCard(currentCart || [])}
        </div>
        <div className={styles.body_footer}></div>
      </div>
      {selectCart.length > 0 && (
        <div className={styles.cart_select}>
          <div>Tổng số lượng đã chọn : {selectCart.length}</div>
          <div>Tổng tiền : {calculatePrice()} đ </div>
          <Link
            to="/payment"
            className={`${styles.cart_select_buy} undisabled`}
            onClick={() => {
              dispatch(cartActions.updateBuyCart(selectCart));
            }}
          >
            Mua ngay
          </Link>
        </div>
      )}
    </div>
  );
};
const Result = () => {
  return Layout({ children: <Cart /> });
};

export default Result;
