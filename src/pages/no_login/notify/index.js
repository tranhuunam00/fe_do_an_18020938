import styles from "./styles.module.scss";
import Footer from "../../../commoms/footer/index";
import { Link, useParams, useSearchParams } from "react-router-dom";
import linkImg from "../../../assets/linkImg";
const Notify = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const titleMes = searchParams.get("title");
  const message = searchParams.get("message");
  const textButton = searchParams.get("textButton");
  const link = searchParams.get("link");

  return (
    <div className={`${styles.successForm}`}>
      <form>
        <div className={styles.successForm_content}>
          <div className={styles.successForm_content__header}>
            <h1 className={styles.successForm_content__header__text}>
              {titleMes}
            </h1>
            <img src={linkImg.logoImg}></img>
          </div>

          <div className={styles.successForm_content__link}>
            <p>{message}</p>
            <div className={styles.successForm_content__link__to}>
              <Link to={`${link}` || `/`}>{textButton}</Link>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Notify;
