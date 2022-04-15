import styles from "./styles.module.scss";
import clsx from "clsx";
const Banner = ({ bannerImg, title, description }) => {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.banner_content}>
        <div className={styles.banner_content_text}>
          <h1>{title}</h1>
        </div>

        <div className={styles.banner_description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export const BannerMini = ({ bannerImg, title, description }) => {
  return (
    <div
      className={styles.bannerMini}
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.bannerMini_content}>
        <div className={styles.bannerMini_content_text}>
          <h1>{title}</h1>
        </div>

        <div className={styles.bannerMini_description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
