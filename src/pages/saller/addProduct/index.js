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
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import {
  selectDetailProducts,
  productActions,
} from "../../../redux/features/product/productSlice";

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

  const handleCreateProduct = () => {
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (key !== "imgProduct") {
        formData.append(key, input[key]);
      }
    });
    if (input.imgProduct.length > 0)
      input.imgProduct.forEach((img) => {
        if (typeof input.imgProduct !== "string") {
          formData.append("imgProduct", img);
        }
      });

    dispatch(
      productActions.createProduct({
        formData,
        navigate: navigate,
        typeProduct: input.type,
      })
    );
  };

  //chỉnh sửa
  const { _productId } = useParams();
  const currentProduct = useSelector(selectDetailProducts);

  useEffect(() => {
    if (_productId && currentProduct) {
      const pro = { ...currentProduct };
      if (!pro.imgUrl) {
        pro.imgUrl = [];
      }
      input.imgProduct = [];
      pro.imgProduct = input.imgProduct.concat(pro.imgUrl || []);
      setError({
        description: null,
        name: null,
        amount: null,
        price: null,
        type: null,
      });
      setInput(pro);
    }
  }, [currentProduct]);

  const handleUpdateProduct = () => {
    const data = { ...input };

    delete data.imgProduct;
    delete data.imgUrl;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, input[key]);
    });

    data.imgUrl = "";

    input.imgProduct.forEach((img, index) => {
      if (typeof img !== "string") {
        formData.append("imgProduct", img);
        if (data.imgUrl.length == 0) {
          data.imgUrl = "false";
        } else {
          data.imgUrl = data.imgUrl.concat(",false");
        }
      } else {
        if (data.imgUrl.length == 0) {
          data.imgUrl = img;
        } else {
          data.imgUrl = data.imgUrl.concat(",", img);
        }
      }
    });

    formData.append("imgUrl", data.imgUrl);
    console.log(...formData);
    dispatch(
      productActions.updateProduct({
        productId: _productId,
        data: formData,
        navigate: navigate(`/shop/${currentProduct.type}`),
        filter: { _textSearch: input.name },
      })
    );
  };
  //
  useEffect(() => {
    window.scrollTo(0, 600);
    if (_productId) {
      dispatch(productActions.getDetailProduct({ productId: _productId }));
    }
  }, []);

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

  return (
    <div className={styles.addP}>
      <BannerMini
        bannerImg={linkImg.bannerImg}
        title="Cửa hàng tiện ích "
        description="Với những món hàng ở đây bạn có thể thay đổi cách nhìn cuộc sống .Hãy chọn nào!"
      />
      <h3 className={styles.addP_title}>
        {_productId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
      </h3>
      <div className={styles.addP_body}>
        <div className={styles.addP_body_info}>
          <div className={styles.row}>
            <Input
              lable="Tên sản phẩm"
              name="name"
              type="text"
              placeholder="Nhập tên ... "
              value={input.name ? input.name : ""}
              handleInput={(e) =>
                handleInput(e, error, setError, input, setInput)
              }
              minLength={5}
            />
            <Input
              className={styles.addP_body_info__price}
              lable="Giá"
              name="price"
              value={input.price ? input.price : ""}
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
              defaultOption={input.type || Filter.ALL}
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
              value={input.amount ? input.amount : ""}
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
            value={input.description ? input.description : ""}
            lable="Mô tả"
            minlength={10}
          />
          <button
            disabled={!checkError(error) ? false : true}
            className={!checkError(error) ? "undisabled" : "disabled"}
            // type="submit"
            onClick={(events) => {
              if (!checkError(error) && _productId) {
                return handleUpdateProduct();
              }
              if (!checkError(error)) {
                return handleCreateProduct();
              }
              return null;
            }}
          >
            {_productId ? "Lưu" : "Thêm mới"}
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
