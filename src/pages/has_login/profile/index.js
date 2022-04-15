import Layout from "../../../commoms/layout";
import Banner from "../../../commoms/banner";
import styles from "./styles.module.scss";
import linkImg from "../../../assets/linkImg";
import { useState, useContext, useEffect, forwardRef } from "react";
import Input, { InputDate, InputTextArea } from "../../../components/input";
import UserContext from "../../../context_api/user/context";
import * as helper from "../../../service/helper";
import { updateUser } from "../../../api/auth";
import { getProfileCustomer } from "../../../api/customer";
import { getProfileSaller } from "../../../api/saller";
import { BsPencilSquare, BsFillCameraFill } from "react-icons/bs";
const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({ firstName: "", lastName: "" });
  const [userState, dispatch] = useContext(UserContext);
  const [error, setError] = useState({ lastName: "" });
  const tokenLocal = helper.getTokenFromLocal();

  useEffect(async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      let detailUser = {};

      switch (userState.user.role) {
        case "CUSTOMER":
          detailUser = await getProfileCustomer(tokenLocal);
          break;
        case "SALLER":
          detailUser = await getProfileSaller(tokenLocal);
          break;
      }

      dispatch({ type: "HIDE_LOADING" });

      if (detailUser.status == 200) {
        const data = detailUser.data.data;
        userState.user.lastName = data.lastName;
        userState.user.firstName = data.firstName;
        userState.user.avatarUrl = data.avatarUrl;
        userState.user.coverUrl = data.coverUrl;
        userState.user.dob = data.dob;
        userState.user.description = data.description;
        userState.user.customerId =
          userState.user.role == "CUSTOMER" ? data._id : null;
        userState.user.sallerId =
          userState.user.role == "SALLER" ? data._id : null;
        userState.user.gender = data.gender;
        userState.user.email = data.user.email;

        dispatch({ type: "CHANGE_USER", payload: userState });
      }
    } catch (err) {
      dispatch({ type: "HIDE_LOADING" });
    }
  }, []);

  useEffect(() => {
    setInput(userState.user);
  }, [userState.user]);

  const handleInput = (value) => {
    helper.handleInput(value, error, setError, input, setInput);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const form = new FormData();
      Object.keys(input).forEach((key) => {
        form.append(key, input[key]);
      });
      dispatch({ type: "SHOW_LOADING" });
      const res = await updateUser(form, tokenLocal);
      dispatch({ type: "HIDE_LOADING" });
      if (res.status == 200) {
        const { avatar, ...user } = input;
        user.avatarUrl = res.data.data.avatarUrl;
        dispatch({ type: "CHANGE_USER", payload: { user: user } });
      }
      dispatch({ type: "HIDE_LOADING" });
    } catch (err) {
      dispatch({ type: "HIDE_LOADING" });

      return err;
    }
  };
  return (
    <div className={styles.profile}>
      <div className={styles.profile_cover}>
        <img
          className={styles.profile_cover_img}
          src={
            edit && input.cover
              ? URL.createObjectURL(input.cover)
              : input.coverUrl
          }
        ></img>
        {edit ? (
          <BsFillCameraFill className={styles.profile_cover_camera} />
        ) : (
          <p></p>
        )}

        {edit ? (
          <input
            className={styles.profile_cover_input}
            type="file"
            name="cover"
            title=" "
            accept="image/png, image/jpeg"
            onChange={(event) => handleInput(event)}
          ></input>
        ) : (
          <p></p>
        )}
      </div>

      <div className={styles.profile_content}>
        <div className={styles.profile_content_info}>
          <div className={styles.profile_content_info_name}>
            {!edit ? (
              <h3>{`${userState.user.lastName} ${userState.user.firstName}`}</h3>
            ) : (
              <div className={styles.profile_content_info_input__name}>
                <Input
                  name="lastName"
                  type="text"
                  lable="Họ"
                  placeholder="Họ của bạn"
                  value={edit ? input.lastName : userState.user.lastName}
                  handleInput={handleInput}
                  minLength={4}
                />
                <Input
                  style={{ textAlign: "end" }}
                  lable="Tên"
                  type="text"
                  placeholder="Họ của bạn"
                  name="firstName"
                  value={edit ? input.firstName : userState.user.firstName}
                  handleInput={handleInput}
                  minLength={4}
                />
              </div>
            )}
            <h4>{userState.user.email}</h4>
            {!edit ? (
              <div>
                <h4>{edit ? input.dob : userState.user.dob}</h4>
                <h4>{edit ? input.gender : userState.user.gender}</h4>
              </div>
            ) : (
              <div className={styles.row}>
                <InputDate
                  lable="Ngày sinh"
                  date={input.dob ? new Date(input.dob) : null}
                  handleInput={handleInput}
                  name="dob"
                  type="text"
                  dateFormat="yyyy-MM-dd"
                  placeholder="Ngày sinh của bạn"
                  maxTime={new Date()}
                  require={true}
                ></InputDate>
                <div className={styles.profile_content_info_gender}>
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={input.gender == "MALE"}
                    onClick={(event) => {
                      handleInput(event);
                    }}
                    onChange={(event) => {}}
                  ></input>
                  <p>Nam</p>
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={input.gender == "FEMALE"}
                    onClick={(event) => {
                      handleInput(event);
                    }}
                    onChange={(event) => {}}
                  ></input>{" "}
                  <p>Nữ</p>
                </div>
              </div>
            )}
          </div>
          <div className={styles.profile_content_info_description}>
            {!edit ? (
              <p>{edit ? input.description : userState.user.description}</p>
            ) : (
              <InputTextArea
                name="description"
                value={input.description}
                handleInput={handleInput}
                lable="Mô tả"
                minlength={10}
              />
            )}
          </div>
          <div className={styles.profile_content_info_social}>
            <div>
              <a>FB</a>
              <a>ZALO</a>
            </div>

            {edit ? (
              <button
                className="undisabled"
                onClick={(event) => {
                  handleSubmit(event);
                }}
              >
                Xác nhận
              </button>
            ) : (
              <p></p>
            )}
          </div>

          <div>
            <img
              className={styles.profile_content_info_avatar}
              src={
                edit && input.avatar
                  ? URL.createObjectURL(input.avatar)
                  : input.avatarUrl
              }
            ></img>
            {edit ? (
              <BsFillCameraFill
                className={styles.profile_content_info_camera}
              />
            ) : (
              <p></p>
            )}

            {edit ? (
              <input
                className={styles.profile_content_info_avatar_input}
                type="file"
                name="avatar"
                title=" "
                accept="image/png, image/jpeg"
                onChange={(event) => handleInput(event)}
              ></input>
            ) : (
              <p></p>
            )}

            <BsPencilSquare
              className={styles.profile_content_info_edit}
              onClick={() => {
                setEdit(!edit);
              }}
              style={edit ? { color: "blue" } : {}}
            />
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
