import Layout from "../../../commoms/layout";
import Banner, { BannerMini } from "../../../commoms/banner";
import bannerImg from "../../../assets/img/banner4.jpg";
import styles from "./styles.module.scss";
import HeaderCart from "../../../components/headerCardRow/index";
import ContentCard from "../../../components/contentCardRow";
import Input, { InputTextArea } from "../../../components/input";
import { handleInput, checkError } from "../../../service/helper";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoLocation } from "react-icons/go";
import { MdEditLocationAlt } from "react-icons/md";
import {
  cartActions,
  selectCurrentCarts,
  selectBuyCarts,
} from "../../../redux/features/cart/cartSlice";
//
//

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const currentCart = useSelector(selectCurrentCarts);
  const selectBuyCart = useSelector(selectBuyCarts);

  const buyCarts = currentCart.filter((c) => {
    return selectBuyCart.includes(c._id);
  });

  //state
  const [changeAddress, setChangeAddress] = useState(true);

  const [input, setInput] = useState({});
  const [error, setError] = useState({ phoneNumber: "12", address: "2" });

  //state

  const listContentCard = (currentCart) => {
    const listCard = currentCart.map((cart) => {
      return (
        <ContentCard
          //   check={selectCart.includes(cart._id)}
          key={cart._id}
          _idCart={cart._id}
          name={cart.name}
          totalPrice={cart.totalPrice}
          price={cart.price}
          imgUrl={cart?.imgUrl[0]}
          amount={cart.amount}
          productId={cart.productId}
          hideInput={true}
          //   handleSelectCart={handleSelectCart}
        />
      );
    });
    return listCard;
  };

  return (
    <div className={styles.payment}>
      <BannerMini bannerImg={bannerImg} title="Thanh toán" description="" />
      <div className={styles.payment_body}>
        <div className={styles.payment_body_head}>
          <HeaderCart
            hideInput={true}
            // check={selectCart.length === currentCart.length}
          />
        </div>
        <div className={styles.payment_body_content}>
          {listContentCard(buyCarts || [])}
        </div>
        <div className={styles.payment_footer}>
          <div className={styles.payment_footer_address}>
            <div className={styles.payment_footer_address_title}>
              <GoLocation className={styles.payment_footer_address_title_img} />
              Địa chỉ nhận hàng
            </div>
            <div className={styles.payment_footer_address_content}>
              {changeAddress ? (
                <div className={styles.payment_footer_address_input}>
                  <Input
                    type="number"
                    lable="Số điện thoại"
                    placeholder="Nhập số điên thoại ..."
                    className={styles.payment_footer_address_input_phone}
                    handleInput={(e) =>
                      handleInput(e, error, setError, input, setInput)
                    }
                    name="phoneNumber"
                  />
                  <InputTextArea
                    lable="Địa chỉ"
                    placeholder="Nhập địa chỉ ..."
                    handleInput={(e) =>
                      handleInput(e, error, setError, input, setInput)
                    }
                    required
                    name="address"
                  />
                </div>
              ) : (
                <div>
                  Trần hữu nam (+84) 961766816 Xóm 6 Đức yên, Xã Chân Lý, Huyện
                  Lý Nhân, Hà Nam
                </div>
              )}
              <div className={styles.payment_footer_address_btn}>
                <MdEditLocationAlt
                  className={`${styles.payment_footer_address_btn_change}`}
                  style={changeAddress && { color: "black" }}
                  onClick={
                    changeAddress
                      ? () => {
                          setChangeAddress(false);
                        }
                      : () => {
                          setChangeAddress(true);
                        }
                  }
                />
                {changeAddress && (
                  <button
                    className={
                      !checkError(error) && changeAddress
                        ? "undisabled"
                        : "disabled"
                    }
                  >
                    {changeAddress ? "Lưu" : "Thay đổi"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.paymentMethod}>
            <div className={styles.paymentMethod_header}>
              <div className={styles.paymentMethod_header_title}>
                Phương thức thanh toán
              </div>
              <div className={styles.paymentMethod_header_momo}>Momo</div>
              <div className={styles.paymentMethod_header_direct}>
                Thanh toán trực tiếp
              </div>
            </div>
            <div className={styles.paymentMethod_body}>
              {/* <div className={styles.paymentMethod_body_momo}>Momo</div> */}
              <div className={styles.paymentMethod_body_direct}>
                Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận
                chuyển (nếu có) áp dụng cả với phí thu hộ.
              </div>
            </div>
          </div>
          <div className={styles.total}>
            <div className={styles.total_body}>
              <div>Tổng tiền hàng : 1000000 đ</div>
              <div>Phí vận chuyển : 43000 đ</div>
              <div className={styles.total_body_all}>
                Tổng thanh toán:1430000 đ
              </div>
              <button className="undisabled">Đặt hàng </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Result = () => {
  return Layout({ children: <PaymentScreen /> });
};

export default Result;
