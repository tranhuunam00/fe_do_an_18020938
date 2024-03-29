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
import {
  selectCurrentProducts,
  selectIsLoading,
  productActions,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

import { BiMessageSquareAdd } from "react-icons/bi";

//
//

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectCurrentProducts);
  const token = helper.getTokenFromLocal();
  const [userState] = useContext(UserContext);

  const listCard = (products, type) => {
    const list =
      products && products[type] ? (
        products[type].products.map((product) => (
          <Card
            _id={product._id}
            key={product._id}
            sallerId={product.saller}
            name={product.name}
            description={product.description}
            imgUrl={product.imgUrl[0] ? product.imgUrl[0] : null}
            amount={product.amount}
            price={product.price}
            handleClick={() => {}}
          />
        ))
      ) : (
        <p></p>
      );
    return list;
  };
  useEffect(() => {
    if (userState.user.sallerId) {
      dispatch(
        productActions.getAllProduct({
          sallerId: userState.user.sallerId,
          token: token,
          query: {
            _typeProduct: "ALL",
          },
        })
      );
    } else {
      dispatch(
        productActions.getAllProduct({
          sallerId: userState.user.sallerId,
          token: token,
          query: {
            _typeProduct: "ALL",
          },
        })
      );
    }
  }, []);

  return (
    <div className={styles.shop}>
      <BannerMini
        bannerImg={bannerImg}
        title="Cửa hàng tiện ích "
        description="Với những món hàng ở đây bạn có thể thay đổi cách nhìn cuộc sống .Hãy chọn nào!"
      />
      {/* 
      
      */}
      <div className={styles.shop_category}>
        <div className={styles.row}>
          <p className={styles.shop_category_name}>Cây cối và dụng cụ</p>
          {userState.user.role === enums.RoleUser.SALLER && (
            <Link to="add-product">
              <BiMessageSquareAdd className={styles.shop_category_add} />
            </Link>
          )}
        </div>
        <div className={styles.shop_category_content}>
          <div className={styles.shop_category_content_title}>
            <Link to={enums.TypeProduct.TREE_IN_DOOR}>Trong nhà</Link>
            {products[enums.TypeProduct.TREE_IN_DOOR] ? (
              <p>({products[enums.TypeProduct.TREE_IN_DOOR].total})</p>
            ) : (
              <></>
            )}
          </div>

          <div className={styles.shop_category_content_card}>
            {listCard(products, enums.TypeProduct.TREE_IN_DOOR)}
          </div>
        </div>
        <div className={styles.shop_category_content}>
          <Link
            className={styles.shop_category_content_title}
            to={enums.TypeProduct.TREE_OUT_DOOR}
          >
            Ngoài trời
          </Link>
          <div className={styles.shop_category_content_card}>
            {listCard(products, enums.TypeProduct.TREE_OUT_DOOR)}
          </div>
        </div>
      </div>
      {/* 
      
      */}
      <div className={styles.shop_category}>
        <p className={styles.shop_category_name}>Cây cối và dụng cụ</p>
        <div className={styles.shop_category_content}>
          <h3 className={styles.shop_category_content_title}>Trong nhà</h3>
          <div className={styles.shop_category_content_card}>
            <Card />
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
  return Layout({ children: <Shop /> });
};

export default Result;
