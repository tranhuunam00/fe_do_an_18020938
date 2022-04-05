import Layout from "../../../commoms/layout";
import Banner from "../../../commoms/banner";
import bannerImg from "../../../assets/img/banner4.jpg";
import styles from "./styles.module.scss";
import Card from "../../../components/card/index";
const Store = () => {
  return (
    <div className={styles.store}>
      <Banner
        bannerImg={bannerImg}
        title="Cửa hàng tiện ích "
        description="Với những món hàng ở đây bạn có thể thay đổi cách nhìn cuộc sống .Hãy chọn nào!"
      />
      {/* 
      
      */}
      <div className={styles.store_category}>
        <p className={styles.store_category_name}>Cây cối và dụng cụ</p>
        <div className={styles.store_category_content}>
          <h3 className={styles.store_category_content_title}>Trong nhà</h3>
          <div className={styles.store_category_content_card}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className={styles.store_category_content}>
          <h3 className={styles.store_category_content_title}>Trong nhà</h3>
          <div className={styles.store_category_content_card}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
      {/* 
      
      */}
      <div className={styles.store_category}>
        <p className={styles.store_category_name}>Cây cối và dụng cụ</p>
        <div className={styles.store_category_content}>
          <h3 className={styles.store_category_content_title}>Trong nhà</h3>
          <div className={styles.store_category_content_card}>
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
  return Layout({ children: <Store /> });
};
export default Result;
