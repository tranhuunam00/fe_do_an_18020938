import clsx from "clsx";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectorModal, modalActions } from "../../features/modal/modalSlice";
import { Link } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();

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
      <div className={styles.header_auth}>
        <Link className={styles.header_auth_login} to="/login">
          Login
        </Link>
        <Link to="/register" className={styles.header_auth_register}>
          Đăng ký
        </Link>
      </div>
    </div>
  );
};
export default Header;
