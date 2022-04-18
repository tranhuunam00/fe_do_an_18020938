import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalActions } from "../../redux/features/modal/modalSlice";
import * as constants from "../../constants/constants";
const Card = (product) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.card}
      onClick={() => {
        dispatch(
          modalActions.changeModal({
            component: constants.NameComponentModal.DETAIL_PRODUCT,
            valueState: { productId: product._id },
          })
        );
        dispatch(modalActions.showModal());
        product.handleClick && product.handleClick();
      }}
    >
      <img src={product.imgUrl}></img>
      <div className={`${styles.row} ${styles.p1r}`}>
        <p className={styles.card_name}>{product.name}</p>
        <p className={styles.card_price}>{product.price}</p>
      </div>
      <div
        className={styles.card_hover}
        style={{
          backgroundImage: `url(${product.imgUrl})`,
        }}
      >
        <div className={styles.card_hover_background}></div>
        <div className={styles.card_hover_content}>
          <p className={styles.card_hover_content_name}>{product.name}</p>
          <p className={styles.card_hover_content_price}>{product.price}</p>
          <p className={styles.card_hover_content_description}>
            {product.description}
          </p>
          <div className={styles.card_hover_content_add}>
            <p className={styles.card_hover_content_add_number}>
              {product.amount}
            </p>
            <button className={styles.card_hover_content_add_cart}>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      {/* 
      <button className={styles.card_view}>Xem chi tiết</button>
       */}
    </div>
  );
};
export default Card;
