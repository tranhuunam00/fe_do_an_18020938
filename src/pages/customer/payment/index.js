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
import { useNavigate } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { MdEditLocationAlt } from "react-icons/md";

import {
  cartActions,
  selectCurrentCarts,
  selectBuyCarts,
} from "../../../redux/features/cart/cartSlice";
import { orderActions } from "../../../redux/features/order/orderSlice";
//
//

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCart = useSelector(selectCurrentCarts);
  const selectBuyCart = useSelector(selectBuyCarts);

  const buyCarts = currentCart.filter((c) => {
    return selectBuyCart.includes(c._id);
  });

  //state
  const [changeAddress, setChangeAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("MOMO");
  const [input, setInput] = useState({});
  const [error, setError] = useState({
    phoneReceiver: "12",
    addressReceiver: "2",
    nameReceiver: "2",
    // notifyReceiver: "2",
  });

  //state
  const handleCreateOrder = (e) => {
    e.preventDefault();
    dispatch(
      orderActions.createOrder({
        navigate: navigate,
        addressReceiver: input.addressReceiver,
        nameReceiver: input.nameReceiver,
        phoneReceiver: input.phoneReceiver,
        notifyReceiver: input.notifyReceiver,
        paymentMethod: paymentMethod,
        buyProducts: buyCarts.map((c) => {
          return { _id: c.productId, amount: c.amount, _idCard: c._id };
        }),
      })
    );
  };

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
          <form onSubmit={handleCreateOrder}>
            <div className={styles.payment_footer_address}>
              <div className={styles.payment_footer_address_title}>
                <GoLocation
                  className={styles.payment_footer_address_title_img}
                />
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
                      name="phoneReceiver"
                      value={input.phoneReceiver || 0}
                    />
                    <Input
                      type="text"
                      lable="Tên người nhận"
                      placeholder="Nhập tên ..."
                      className={styles.payment_footer_address_input_phone}
                      handleInput={(e) =>
                        handleInput(e, error, setError, input, setInput)
                      }
                      name="nameReceiver"
                      value={input.nameReceiver || ""}
                    />

                    <InputTextArea
                      lable="Địa chỉ"
                      placeholder="Nhập địa chỉ ..."
                      handleInput={(e) =>
                        handleInput(e, error, setError, input, setInput)
                      }
                      required
                      name="addressReceiver"
                      value={input.addressReceiver || ""}
                    />

                    <InputTextArea
                      lable="Lưu ý cho người bán "
                      placeholder="Nhập ..."
                      handleInput={(e) =>
                        handleInput(e, error, setError, input, setInput)
                      }
                      name="notifyReceiver"
                      value={input.notifyReceiver || ""}
                    />
                  </div>
                ) : (
                  <div className={styles.addressSave}>
                    <div>
                      <span>Tên:</span>
                      <p>{input.nameReceiver}</p>
                    </div>
                    <div>
                      <span>Địa chỉ:</span> <p>{input.addressReceiver}</p>{" "}
                    </div>

                    <div>
                      <span>Số điện thoại:</span> <p>{input.phoneReceiver}</p>{" "}
                    </div>
                    <div>
                      <span>Lưu ý:</span> <p>{input.notifyReceiver}</p>{" "}
                    </div>
                  </div>
                )}
                <div className={styles.payment_footer_address_btn}>
                  {!changeAddress && (
                    <MdEditLocationAlt
                      className={`${styles.payment_footer_address_btn_change}`}
                      style={changeAddress && { color: "black" }}
                      onClick={() => {
                        setChangeAddress(true);
                      }}
                    />
                  )}

                  {changeAddress && (
                    <button
                      className={
                        !checkError(error) && changeAddress
                          ? "undisabled"
                          : "disabled"
                      }
                      onClick={
                        !checkError(error)
                          ? (e) => {
                              e.preventDefault();
                              setChangeAddress(false);
                            }
                          : (e) => {
                              e.preventDefault();
                            }
                      }
                    >
                      Lưu
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
                <div
                  className={styles.paymentMethod_header_momo}
                  style={paymentMethod === "MOMO" ? { opacity: 0.5 } : {}}
                  onClick={() => {
                    setPaymentMethod("MOMO");
                  }}
                >
                  Momo
                </div>
                <div
                  className={styles.paymentMethod_header_direct}
                  style={paymentMethod !== "MOMO" ? { opacity: 0.5 } : {}}
                  onClick={() => {
                    setPaymentMethod("DIRECT");
                  }}
                >
                  Thanh toán trực tiếp
                </div>
              </div>
              <div className={styles.paymentMethod_body}>
                {paymentMethod === "MOMO" ? (
                  <div className={styles.paymentMethod_body_momo}>
                    {" "}
                    Thanh toán trực tiếp qua ví điện tử Momo . kèm theo rất
                    nhiều ưu đãi !
                  </div>
                ) : (
                  <div className={styles.paymentMethod_body_direct}>
                    Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí
                    vận chuyển (nếu có) áp dụng cả với phí thu hộ.
                  </div>
                )}
              </div>
            </div>
            <div className={styles.total}>
              <div className={styles.total_body}>
                <div>Tổng tiền hàng : 1000000 đ</div>
                <div>Phí vận chuyển : 43000 đ</div>
                <div className={styles.total_body_all}>
                  Tổng thanh toán:1430000 đ
                </div>
                <button
                  className={!checkError(error) ? "undisabled" : "disabled"}
                  type="submit"
                  onClick={
                    !checkError(error)
                      ? (events) => {
                          {
                          }
                        }
                      : (events) => {
                          events.preventDefault();
                        }
                  }
                >
                  Đặt hàng{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const Result = () => {
  return Layout({ children: <PaymentScreen /> });
};

export default Result;
