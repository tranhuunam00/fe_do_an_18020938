import Layout from "../../../commoms/layout";
import Banner from "../../../commoms/banner";
import bannerImg from "../../../assets/img/banner4.jpg";
import styles from "./styles.module.scss";
const Store = () => {
  return (
    <div className={styles.store}>
      <Banner
        bannerImg={bannerImg}
        title="Cửa hàng tiện ích "
        description="Với những món hàng ở đây bạn có thể thay đổi cách nhìn cuộc sống .Hãy chọn nào!"
      />
    </div>
  );
};
const Result = () => {
  return Layout({ children: <Store /> });
};
export default Result;
