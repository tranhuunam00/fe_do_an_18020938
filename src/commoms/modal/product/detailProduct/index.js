import styles from "./styles.module.scss";
import { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  modalActions,
  selectorShowModal,
  selectorModalValue,
} from "../../../../redux/features/modal/modalSlice";
import { useOutside } from "../../../../service/helper";
import {
  productActions,
  selectDetailProducts,
} from "../../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import UserContext from "../../../../context_api/user/context";
import { cartActions } from "../../../../redux/features/cart/cartSlice";

import linkImg from "../../../../assets/linkImg";

const DetailProductModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isShowModal = useSelector(selectorShowModal);
  const modalValue = useSelector(selectorModalValue);
  const currentProduct = useSelector(selectDetailProducts);
  const [productState, setProductState] = useState(currentProduct);
  const formDetailProductModal = useRef();
  const [User] = useContext(UserContext);

  const handleCloseModal = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
      dispatch(modalActions.resetState());
    }, 200);
  };

  const handleCreateCart = () => {
    dispatch(
      cartActions.createCart({
        product: currentProduct._id,
        amount: 1,
        navigate: navigate,
      })
    );
  };

  useOutside(formDetailProductModal, handleCloseModal);

  useEffect(() => {
    dispatch(
      productActions.getDetailProduct({ productId: modalValue.productId })
    );
  }, []);
  const nthImgUrl =
    currentProduct?.imgUrl && currentProduct?.imgUrl.length > 1
      ? [...currentProduct?.imgUrl]
      : [];
  if (nthImgUrl.length > 0) {
    nthImgUrl.shift();
  }

  return (
    <div className={styles.detailP} ref={formDetailProductModal}>
      <h3 className={styles.detailP_title}>Chi tiết sản phẩm</h3>
      <div className={styles.detailP_body}>
        <div className={styles.detailP_body_arrImg}>
          <img
            className={styles.detailP_body_arrImg__1st}
            src={
              currentProduct?.imgUrl && currentProduct?.imgUrl.length > 0
                ? currentProduct.imgUrl[0]
                : linkImg.defaultImg
            }
          ></img>
          <div className={styles.detailP_body_arrImg__nth}>
            {nthImgUrl.length > 0 ? (
              nthImgUrl.map((img, index) => {
                return <img key={img} src={img}></img>;
              })
            ) : (
              <p></p>
            )}
            {/* {/* <img src="http://media.doisongphapluat.com/711/2021/3/5/hot-girl-chung-khoan-ngo-huyen-thuong-dspl-5.jpg"></img>
            <img src="http://media.doisongphapluat.com/711/2021/3/5/hot-girl-chung-khoan-ngo-huyen-thuong-dspl-5.jpg"></img> */}
          </div>
        </div>
        <div className={styles.detailP_body_info}>
          <div className={styles.detailP_body_info__head}>
            <p className={styles.detailP_body_info__head_name}>
              {currentProduct?.name || ""}
            </p>
            <p>Giá: {currentProduct?.price || 0}Đ</p>
          </div>

          <div className={styles.detailP_body_info__desc}>
            <h4>Mô tả</h4>
            <p>{currentProduct?.description}</p>
          </div>
          <div className={styles.detailP_body_info__owner}>
            <p>
              Người bán :{currentProduct?.saller?.firstName || ""}{" "}
              {currentProduct?.saller?.lastName || ""}
            </p>
            <p>4 năm</p>
          </div>
          <div className={styles.detailP_body_info__dateBuy}>
            <p>Ngày bán: 20-12-2022</p>
            <p>Đã bán :4</p>
          </div>
          <div className={styles.detailP_body_info__review}>
            <p>Đánh giá : 5*</p>{" "}
            <p className={styles.detailP_body_info__review_all}>
              Xem tất cả đánh giá (40)
            </p>
          </div>

          {User.user?.sallerId === currentProduct?.saller?._id ? (
            <div className={styles.detailP_body_info__amount}>
              <p>Số lượng: {currentProduct?.amount}</p>
            </div>
          ) : (
            <div className={styles.detailP_body_info__buy}>
              <div className={styles.detailP_body_info__buy__add}>
                <p className={styles.detailP_body_info__buy__add_number}>
                  {currentProduct?.amount}{" "}
                </p>
                <button
                  className={styles.detailP_body_info__buy__add_cart}
                  onClick={() => {
                    handleCreateCart();
                  }}
                >
                  Thêm vào giỏ
                </button>
              </div>

              <button className={styles.detailP_body_info__buy_btn}>
                Mua ngay
              </button>
            </div>
          )}
          {User.user?.sallerId === currentProduct?.saller?._id ? (
            <div className={styles.detailP_body_info__update}>
              <Link
                className={styles.detailP_body_info__update_link}
                to={`/shop/product/update/${currentProduct?._id}`}
                onClick={() => {
                  dispatch(modalActions.hideModal());
                }}
              >
                Chỉnh sửa
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DetailProductModal;
