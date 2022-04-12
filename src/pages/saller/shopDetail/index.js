import Layout from "../../../commoms/layout";
import Banner from "../../../commoms/banner";
import bannerImg from "../../../assets/img/banner4.jpg";
import styles from "./styles.module.scss";
import Card from "../../../components/card/index";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as helper from "../../../service/helper";
import UserContext from "../../../context_api/user/context";
import * as enums from "../../../constants/enums";
import { useParams } from "react-router-dom";
import linkImg from "../../../assets/linkImg";
import { useState } from "react";

import {
  selectCurrentProducts,
  selectIsLoading,
  productActions,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import { Select } from "../../../components/select/index";
import { Filter } from "../../../constants/enums";

//
//
const listCard = (products, type) => {
  const list =
    products && products[type] ? (
      products[type].data.map((product) => (
        <Card
          key={product._id}
          name={product.name}
          description={product.description}
          imgUrl={product.imgUrl[0] ? product.imgUrl[0] : null}
          amount={product.amount}
          price={product.price}
        />
      ))
    ) : (
      <p></p>
    );
  return list;
};

const ShopDetail = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const token = helper.getTokenFromLocal();
  const [userState] = useContext(UserContext);
  const [filter, setFilter] = useState({ min: 0, max: 1000000 });
  const handleClick = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    switch (value) {
      case Filter.MORE_MONEY:
        value = -1;
        break;
      case Filter.OLD_TIME:
        value = -1;
        break;
      case Filter.NEW_TIME:
        value = 1;
        break;
      case Filter.LESS_MONEY:
        value = 1;
        break;
    }
    setFilter({ ...filter, [name]: +value });
  };
  console.log(filter);

  useEffect(() => {
    // dispatch(
    //   productActions.getAllProduct({
    //     sallerId: userState.user.sallerId,
    //     token: token,
    //     query: {
    //       _typeProduct: type,
    //       _page: 1,
    //       _limit: 20,
    //     },
    //   })
    // );
  }, []);
  return (
    <div className={styles.shopDetail}>
      <Banner
        bannerImg={bannerImg}
        title="Cửa hàng tiện ích "
        description="Với những món hàng ở đây bạn có thể thay đổi cách nhìn cuộc sống .Hãy chọn nào!"
      />
      {/* 
      
      */}

      <div className={styles.shopDetail_content}>
        <div className={styles.shopDetail_content_header}>
          <h3 className={styles.shopDetail_content_header_title}>
            Những vật phẩm của bạn đã đưa ra bán! Tồn kho còn lại
          </h3>{" "}
          <div className={styles.shopDetail_content_header_filter}>
            <div className={styles.shopDetail_content_header_filter_money}>
              <p>Giá</p>
              <input
                name="min"
                onChange={(e) => handleClick(e)}
                type="number"
                value={filter.min}
                className={styles.shopDetail_content_header_filter_money_min}
              ></input>
              <p>-</p>
              <input
                name="max"
                onChange={(e) => handleClick(e)}
                type="number"
                value={filter.max}
                className={styles.shopDetail_content_header_filter_money_max}
              ></input>
            </div>
            <Select
              name="sortMoney"
              options={[Filter.LESS_MONEY, Filter.MORE_MONEY]}
              title={"Giá"}
              defaultOption={Filter.LESS_MONEY}
              handleClick={handleClick}
            />
            <Select
              name="sortTime"
              options={[Filter.NEW_TIME, Filter.OLD_TIME]}
              title={"Thời gian"}
              defaultOption={Filter.NEW_TIME}
              handleClick={handleClick}
            />
          </div>
          <div className={styles.shopDetail_content_card}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};
const Result = () => {
  return Layout({ children: <ShopDetail /> });
};

export default Result;
