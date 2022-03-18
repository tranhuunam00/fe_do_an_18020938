import clsx from "clsx";
import styles from "./styles.module.scss";

const Header = () => {
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
        <button className={styles.auth_login}>login</button>
        <button className={styles.auth_signin}>sign-in</button>
      </div>
    </div>
  );
};
export default Header;
