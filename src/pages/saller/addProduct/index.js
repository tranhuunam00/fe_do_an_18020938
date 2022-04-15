import styles from "./styles.module.scss";
import linkImg from "../../../assets/linkImg";
import Layout from "../../../commoms/layout";
import Banner, { BannerMini } from "../../../commoms/banner";
import Input, { InputTextArea, CardImgInput } from "../../../components/input";
import { Select } from "../../../components/select/index";
import { Filter, TypeProduct } from "../../../constants/enums";
import { checkError } from "../../../service/helper";
import { useState, useEffect } from "react";
import { handleInput } from "../../../service/helper";
import { useDispatch } from "react-redux";
import { productActions } from "../../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";

const ArrCardImgInput = (files = [], handleInput, name) => {
  const arrCard = files.map((f, index) => (
    <CardImgInput
      key={index}
      id={index}
      name={name}
      handleInput={(e) => handleInput(e)}
      img={f}
    />
  ));
  if (arrCard.length < 6) {
    arrCard.push(
      <CardImgInput
        key={files.length}
        id={files.length}
        name={name}
        handleInput={(e) => handleInput(e)}
        img={null}
      />
    );
  }

  return arrCard;
};
const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({ imgProduct: [] });
  const [error, setError] = useState({
    description: "description",
    name: "description",
    amount: "?-",
    price: "5",
    type: "5",
  });
  const handleCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (key !== "imgProduct") {
        formData.append(key, input[key]);
      }
    });
    if (input.imgProduct.length > 0)
      input.imgProduct.forEach((img) => {
        formData.append("imgProduct", img);
      });

    dispatch(
      productActions.createProduct({
        formData,
        navigate: navigate,
        typeProduct: input.type,
      })
    );
  };
  useEffect(() => {
    window.scrollTo(0, 600);
  }, []);
  return (
    <div className={styles.addP}>
      <BannerMini
        bannerImg={linkImg.bannerImg}
        title="Cửa hàng tiện ích "
        description="Với những món hàng ở đây bạn có thể thay đổi cách nhìn cuộc sống .Hãy chọn nào!"
      />
      <h3 className={styles.addP_title}>Thêm sản phẩm mới</h3>
      <div className={styles.addP_body}>
        <div className={styles.addP_body_info}>
          <div className={styles.row}>
            <Input
              lable="Tên sản phẩm"
              name="name"
              type="text"
              placeholder="Nhập tên ... "
              handleInput={(e) =>
                handleInput(e, error, setError, input, setInput)
              }
              minLength={5}
            />
            <Input
              className={styles.addP_body_info__price}
              lable="Giá"
              name="price"
              type="number"
              placeholder="Nhập giá ... "
              handleInput={(e) =>
                handleInput(e, error, setError, input, setInput)
              }
              minLength={1}
            />
          </div>
          <div className={styles.row}>
            <Select
              className={styles.addP_body_info__type}
              name="type"
              options={[
                TypeProduct.COURSE,
                TypeProduct.FERTILIZER,
                TypeProduct.KITS,
                TypeProduct.TREE_IN_DOOR,
                TypeProduct.TREE_OUT_DOOR,
              ]}
              title={"Loại"}
              defaultOption={Filter.ALL}
              handleClick={(e) =>
                handleInput(e, error, setError, input, setInput)
              }
            />{" "}
            <Input
              className={styles.addP_body_info__amount}
              lable="Số lượng"
              name="amount"
              type="number"
              placeholder="Nhập  ... "
              handleInput={(e) =>
                handleInput(e, error, setError, input, setInput)
              }
              minLength={1}
            />
          </div>

          <InputTextArea
            className={styles.addP_body_info__desc}
            name="description"
            // value={input.description}
            handleInput={(e) =>
              handleInput(e, error, setError, input, setInput)
            }
            lable="Mô tả"
            minlength={10}
          />
          <button
            disabled={!checkError(error) ? false : true}
            className={!checkError(error) ? "undisabled" : "disabled"}
            // type="submit"
            onClick={(events) =>
              !checkError(error)
                ? handleCreateProduct(events)
                : events.preventDefault()
            }
          >
            Đăng kí
          </button>
        </div>
        <div className={styles.addP_body_arrImg}>
          {ArrCardImgInput(
            input["imgProduct"],
            (e) => handleInput(e, error, setError, input, setInput),
            "imgProduct"
          )}
        </div>
      </div>
    </div>
  );
};

const Result = () => {
  return Layout({ children: <AddProduct /> });
};

export default Result;
