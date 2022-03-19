import clsx from "clsx";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectorModal, modalActions } from "../../features/modal/modalSlice";
const Header = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectorModal);
  const handleShow = () => {
    dispatch(modalActions.showModal());
    dispatch(modalActions.changeComponent("login"));
  };
  return (
    <div className={`${styles.header} `}>
      <div className={`${styles.header_navbar}`}>
        <img
          className={styles.navbar_logo}
          alt="Logo"
          width="170"
          height="50"
          src="https://www.bonsaiempire.com/images/logo-bonsaiempire.jpg"
        ></img>
        <a href="#">Công nghệ</a>
        <a href="#">Cây đặc biệt</a>
        <a href="#">Cảm hứng</a>
        <a href="#">Diễn đàn</a>
        <a href="#">Cửa hàng</a>
        <a href="#">Khóa học</a>
      </div>
      <div className={`${styles.header_auth}`}>
        <button
          className={styles.auth_login}
          onClick={() => {
            console.log(show);
            handleShow();
          }}
        >
          login
        </button>
        <button className={styles.auth_signin}>sign-in</button>
      </div>
    </div>
  );
};
export default Header;
