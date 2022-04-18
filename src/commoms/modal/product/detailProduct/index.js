import styles from "./styles.module.scss";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const DetailProductModal = () => {
  const dispatch = useDispatch();
  const isShowModal = useSelector(selectorShowModal);
  const modalValue = useSelector(selectorModalValue);
  const currentProduct = useSelector(selectDetailProducts);
  const [productState, setProductState] = useState(currentProduct);
  const formDetailProductModal = useRef();
  const handleCloseModal = () => {
    setTimeout(() => {
      dispatch(modalActions.hideModal());
      dispatch(modalActions.resetState());
    }, 200);
  };
  useOutside(formDetailProductModal, handleCloseModal);

  useEffect(() => {
    dispatch(
      productActions.getDetailProduct({ productId: modalValue.productId })
    );
  }, []);
  const nthImgUrl =
    currentProduct.imgUrl && currentProduct.imgUrl.length > 1
      ? [...currentProduct.imgUrl]
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
              currentProduct.imgUrl && currentProduct.imgUrl.length > 0
                ? currentProduct.imgUrl[0]
                : "http://media.doisongphapluat.com/711/2021/3/5/hot-girl-chung-khoan-ngo-huyen-thuong-dspl-5.jpg"
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
              {currentProduct.name || ""}
            </p>
            <p>Giá: {currentProduct.price}Đ</p>
          </div>

          <div className={styles.detailP_body_info__desc}>
            <h4>Mô tả</h4>
            <p>{currentProduct.description}</p>
          </div>
          <div className={styles.detailP_body_info__owner}>
            <p>
              Người bán :{currentProduct.saller?.firstName || ""}{" "}
              {currentProduct.saller?.lastName || ""}
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

          <div className={styles.detailP_body_info__buy}>
            <div className={styles.detailP_body_info__buy__add}>
              <p className={styles.detailP_body_info__buy__add_number}>5 </p>
              <button className={styles.detailP_body_info__buy__add_cart}>
                Thêm vào giỏ
              </button>
            </div>

            <button className={styles.detailP_body_info__buy_btn}>
              Mua ngay
            </button>
          </div>
          <div className={styles.detailP_body_info__update}>
            <Link
              className={styles.detailP_body_info__update_link}
              to={`/shop/product/update/${currentProduct._id}`}
              onClick={() => {
                dispatch(modalActions.hideModal());
              }}
            >
              Chỉnh sửa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailProductModal;
