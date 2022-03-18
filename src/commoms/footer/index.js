import styles from "./styles.module.scss";
import * as constants from "../../constants/constants";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div style={styles.footer_logo}>
        <img
          className={styles.footer_logo_img}
          src={constants.LINK_LOGO_IMG}
          alt="Bonsai Empire Logo"
          width="122"
          height="31"
        ></img>
      </div>
      <div style={styles.footer_about}>
        <p>About us</p>
        <p>Select language</p>
      </div>
      <div style={styles.footer_contact}>
        <p>JOIN THE NEWSLETTER</p>
        <input></input>
      </div>
      <div style={styles.footer_social}>
        <p>JOIN THE NEWSLETTER</p>
      </div>
    </div>
  );
};
export default Footer;
