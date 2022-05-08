import styles from "./styles.module.scss";
import linkImg from "../../../assets/linkImg";
import Layout from "../../../commoms/layout";
import { BannerMini } from "../../../commoms/banner";
import HeaderCard from "../../../components/headerCardRow/index";
import ContentConfirmCard from "../../../components/contentConfirmCard";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Select } from "../../../components/select/index";

import { Filter, StatusOrder } from "../../../constants/enums";
import PaginatedItems from "../../../components/pagination/index";

import {
  orderActions,
  selectCurrentOrders,
  selectPaginationOrders,
} from "../../../redux/features/order/orderSlice";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrders = useSelector(selectCurrentOrders);
  const pagination = useSelector(selectPaginationOrders);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    dispatch(orderActions.getAllOrder());
  }, []);

  const listCard = (currentOrders) => {
    const com = currentOrders.map((c) => {
      return <ContentConfirmCard {...c} key={c._id} />;
    });
    return com;
  };

  const handleClick = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    const newFilter = { ...filter, [name]: value };
    setFilter(newFilter);

    dispatchGetFilter(newFilter);
  };

  const dispatchGetFilter = (filter) => {
    dispatch(orderActions.getAllOrder(filter));
  };
  return (
    <div className={styles.confirmOrder}>
      <BannerMini
        bannerImg={linkImg.bannerImg}
        title="Chấp nhận các đơn hàng "
        description="!"
      />
      <div className={styles.content}>
        <div className={styles.content_filter}>
          <Select
            name="statusPayment"
            options={[
              Filter.PAID,
              Filter.AWAIT_MOMO,
              Filter.UNPAID,
              Filter.SUCCESS,
              Filter.ALL,
            ]}
            title={"Thanh toán"}
            defaultOption={Filter.ALL}
            handleClick={handleClick}
          />
          <Select
            name="statusOrder"
            options={[
              Filter.ALL,
              StatusOrder.CANCEL,
              StatusOrder.CONFIRM,
              StatusOrder.DELIVERY_SHIP,
              StatusOrder.SHIP,
              StatusOrder.NOT_CONFIRMED,
              StatusOrder.REVEICE,
              StatusOrder.PREPARE,
            ]}
            title={"Trạng thái"}
            defaultOption={Filter.ALL}
            handleClick={handleClick}
          />{" "}
        </div>
        <div className={styles.content_header}>
          <HeaderCard confirm={true} />
        </div>
        <div className={styles.content_header}>
          {listCard(currentOrders || [])}
        </div>
        <div className={styles.content_pagination}>
          <PaginatedItems
            handleClick={(e) => {
              handleClick(e, filter);
            }}
            name="_page"
            limit={pagination._limit}
            total={pagination._total}
          />
        </div>
      </div>
    </div>
  );
};

const Result = () => {
  return Layout({ children: <AddProduct /> });
};

export default Result;
