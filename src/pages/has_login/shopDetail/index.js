import Layout from "../../../commoms/layout";
import Banner, { BannerMini } from "../../../commoms/banner";
import bannerImg from "../../../assets/img/banner4.jpg";
import styles from "./styles.module.scss";
import Card from "../../../components/card/index";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as helper from "../../../service/helper";
import UserContext from "../../../context_api/user/context";
import * as enums from "../../../constants/enums";
import { useParams } from "react-router-dom";
import { useState } from "react";
import linkImg from "../../../assets/linkImg";
import {
  selectCurrentProducts,
  selectFilterProduct,
  productActions,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import { Select } from "../../../components/select/index";
import { Filter } from "../../../constants/enums";
import PaginatedItems from "../../../components/pagination/index";
//
//
const listCard = (products, type) => {
  const list =
    products && products[type] ? (
      products[type].products.map((product) => (
        <Card
          sallerId={product.saller}
          _id={product._id}
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
  const products = useSelector(selectCurrentProducts);
  const filterRedux = useSelector(selectFilterProduct);
  const { type } = useParams();
  const dispatch = useDispatch();
  const token = helper.getTokenFromLocal();
  const [userState] = useContext(UserContext);
  const [filter, setFilter] = useState({ _minMoney: 0, _maxMoney: 100000000 });
  const handleClick = (event, filterCurrent) => {
    const name = event.target.name;
    let value = event.target.value;
    switch (value) {
      case Filter.OLD_TIME:
        value = 1;
        break;
      case Filter.NEW_TIME:
        value = -1;
        break;
      case Filter.LESS_MONEY:
        value = +1;
        break;
      case Filter.MORE_MONEY:
        value = -1;
        break;
    }

    setFilter({ ...filter, [name]: value });
    if (name === "_page") {
      const newFilter = { ...filterCurrent, [name]: value };

      dispatchGetFilter(newFilter);
    }
  };
  const dispatchGetFilter = (filter) => {
    dispatch(
      productActions.getAllProduct({
        sallerId: userState.user.sallerId,
        token: token,
        query: {
          _typeProduct: type,
          _limit: 20,

          ...filter,
        },
      })
    );
  };
  useEffect(() => {
    return function cleanup() {
      dispatch(productActions.updateFilterProduct({}));
    };
  }, []);

  const handleFind = () => {
    dispatchGetFilter(filter);
  };

  useEffect(() => {
    if (Object.keys(filterRedux).length > 0) {
      dispatchGetFilter(filterRedux);
      setFilter(filterRedux);
    } else {
      dispatchGetFilter(filter);
    }
  }, [filterRedux]);

  return (
    <div className={styles.shopDetail}>
      <BannerMini
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
            <input
              className={styles.shopDetail_content_header_filter_inputName}
              placeholder="Tìm theo tên..."
              name="_textSearch"
              value={filter._textSearch || ""}
              onChange={(e) => handleClick(e)}
            ></input>
            <img
              className={styles.shopDetail_content_header_filter_search}
              src={linkImg.searchIcon}
              onClick={() => {
                handleFind();
              }}
            ></img>
          </div>
          <div className={styles.shopDetail_content_header_filter}>
            <div className={styles.shopDetail_content_header_filter_money}>
              <p>Giá</p>
              <input
                name="_minMoney"
                onChange={(e) => handleClick(e)}
                type="number"
                value={filter._minMoney || 0}
                className={styles.shopDetail_content_header_filter_money_min}
              ></input>
              <p>-</p>
              <input
                name="_maxMoney"
                onChange={(e) => handleClick(e)}
                type="number"
                value={filter._maxMoney || 100000000}
                className={styles.shopDetail_content_header_filter_money_max}
              ></input>
            </div>

            <Select
              name="_sortMoney"
              options={[Filter.ALL, Filter.LESS_MONEY, Filter.MORE_MONEY]}
              title={"Giá"}
              defaultOption={Filter.ALL}
              handleClick={handleClick}
            />
            <Select
              name="_sortTime"
              options={[Filter.NEW_TIME, Filter.OLD_TIME]}
              title={"Thời gian"}
              defaultOption={Filter.OLD_TIME}
              handleClick={handleClick}
            />
          </div>
          <div className={styles.shopDetail_content_card}>
            {listCard(products, type)}
          </div>
        </div>
      </div>
      <div className={styles.shopDetail_footer_pagination}>
        <PaginatedItems
          handleClick={(e) => {
            handleClick(e, filter);
          }}
          name="_page"
          limit={
            products[type] &&
            products[type].pagination &&
            products[type].pagination._limit
              ? products[type].pagination._limit
              : 1
          }
          total={
            products[type] &&
            products[type].pagination &&
            products[type].pagination._total
              ? products[type].pagination._total
              : 1
          }
        />
      </div>
    </div>
  );
};
const Result = () => {
  return Layout({ children: <ShopDetail /> });
};

export default Result;
