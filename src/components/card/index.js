import styles from "./styles.module.scss";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <img src={props.imgUrl}></img>
      <div className={`${styles.row} ${styles.p1r}`}>
        <p className={styles.card_name}>{props.name}</p>
        <p className={styles.card_price}>{props.price}</p>
      </div>
      <div
        className={styles.card_hover}
        style={{
          backgroundImage: `url(${props.imgUrl})`,
        }}
      >
        <div className={styles.card_hover_background}></div>
        <div className={styles.card_hover_content}>
          <p className={styles.card_hover_content_name}>{props.name}</p>
          <p className={styles.card_hover_content_price}>{props.price}</p>
          <p className={styles.card_hover_content_description}>
            {props.description}
          </p>
          <div className={styles.card_hover_content_add}>
            <p className={styles.card_hover_content_add_number}>
              {props.number}
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
