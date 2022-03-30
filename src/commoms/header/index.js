import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import UserContext from "../../context_api/user/context";
import { useContext } from "react";
import linkImg from "../../assets/linkImg";
import { Link, useNavigate } from "react-router-dom";
// import toastService from "../../../service/toast";

const Header = () => {
  const [userState, dispatch] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    // event.preventDefault();
    console.log("hihi");
    localStorage.clear();
    delete userState.user.token;
    dispatch({ type: "REMOVE_USER" });

    return navigate(`/`);
  };
  return (
    <div className={`${styles.header} `}>
      <div className={`${styles.header_navbar}`}>
        <img
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className={styles.header_navbar_logo}
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
      {!userState.user.token ? (
        <div className={styles.header_auth}>
          <Link className={styles.header_auth_login} to="/login">
            Login
          </Link>
          <Link to="/register" className={styles.header_auth_register}>
            Đăng ký
          </Link>
        </div>
      ) : (
        <div className={styles.header_auth}>
          <button className={styles.header_auth_button}>
            Hi {userState.user.lastName}!
          </button>
          <div className={styles.header_auth_list}>
            <Link to="cart">
              <img src={linkImg.cartSvg}></img>
            </Link>
            <Link to="/profile">Trang cá nhân</Link>
            <Link to="/cart">Khóa học</Link>
            <button
              onClick={() => {
                console.log("gg");
                handleLogout();
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
