import Layout from "../../../commoms/layout";
import Banner from "../../../commoms/banner";
import styles from "./styles.module.scss";
import linkImg from "../../../assets/linkImg";
import { useState, useContext, useEffect } from "react";
import Input from "../../../commoms/input";
import UserContext from "../../../context_api/user/context";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({ firstName: "", lastName: "" });
  const [userState, dispatch] = useContext(UserContext);
  const [error, setError] = useState({ lastName: "" });
  useEffect(() => {
    setInput(userState.user);
  }, []);
  const handleInput = (value) => {
    const name = value.target.name;
    const valueInput = value.target.value;
    const valueError = value.error;
    setError({ ...error, [name]: valueError });
    setInput({ ...input, [name]: valueInput });
  };

  console.log(edit);
  return (
    <div className={styles.profile}>
      <img className={styles.profile_img} src={linkImg.seaImg}></img>
      <div className={styles.profile_content}>
        <div className={styles.profile_content_info}>
          <div className={styles.profile_content_info_name}>
            {edit ? (
              <h3>{`${userState.user.lastName} ${userState.user.firstName}`}</h3>
            ) : (
              <div className={styles.profile_content_info_input__name}>
                <Input
                  name="lastName"
                  type="text"
                  lable="Họ"
                  placeholder="Họ của bạn"
                  value={input.lastName}
                  handleInput={handleInput}
                  minLength={4}
                />
                <Input
                  lable="Tên"
                  type="text"
                  placeholder="Họ của bạn"
                  name="firstName"
                  value={input.firstName}
                  handleInput={handleInput}
                  minLength={4}
                />
              </div>
            )}
            <h4>{userState.user.email}</h4>
            <h4>{userState.user.dob}</h4>
          </div>
          <div className={styles.profile_content_info_description}>
            <p>
              hôm nay là 1 ngày đặc biệt với chúng tối đây là 1 ý tuoỬNG TỐTT
            </p>
          </div>
          <div className={styles.profile_content_info_social}>
            <a>FB</a>
            <a>ZALO</a>
          </div>
          <div>
            <img
              className={styles.profile_content_info_avatar}
              src={
                "https://anhdep123.com/wp-content/uploads/2020/05/hinh-anh-dep-tay-bac-sapa-1024x637.jpg"
              }
            ></img>
            <img
              className={styles.profile_content_info_camera}
              src={linkImg.cameraSvg}
              onClick={() => {
                console.log("tthay ảnh");
              }}
            ></img>
            <img
              className={styles.profile_content_info_edit}
              src={linkImg.penSvg}
              onClick={() => {
                console.log("hihi");
                setEdit(!edit);
              }}
            ></img>
          </div>
        </div>
        <div className={styles.profile_content_photo}>
          <div className={styles.profile_content_photo_category}>
            <p>Ảnh cá nhân</p>
            <p>Ảnh sản phẩm</p>
            <p>Nhóm</p>
          </div>
          <div className={styles.profile_content_photo_img}>
            <img
              src={
                "https://meta.vn/Data/image/2021/04/26/hinh-anh-bien-dep-9.jpg"
              }
            ></img>
            <img
              src={
                "https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-bien-dep-nhat-1.jpg"
              }
            ></img>
            <img
              src={
                "http://tranhphongcanhdep.com.vn/wp-content/uploads/2019/01/tranh-thien-nhienruong-bac-thang-vung-cao-tay-bac-iStock_882116284.jpg"
              }
            ></img>
            <img src={linkImg.seaImg}></img>
            <img src={linkImg.seaImg}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
const Result = () => {
  return Layout({ children: <Profile /> });
};
export default Result;
