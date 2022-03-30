import imgLink from "../../assets/linkImg";
import styles from "./styles.module.scss";
const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading_model}>
        <p>Vui lòng đợi</p>
        <div className={styles.loading_model_img}>
          <img src={imgLink.loadingGif}></img>
        </div>
      </div>
    </div>
  );
};
export default Loading;
