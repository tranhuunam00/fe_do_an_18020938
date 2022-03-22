import clsx from "clsx";
import styles from "./styles.module.scss";
import Header from "../../commoms/header";
import bannerImg from "../../assets/img/banner4.jpg";
import bodyContent1 from "../../assets/img/nologin_body_content_1.jpg";
import bodyContent2 from "../../assets/img/nologin_body_content_2.jpg";
import bodyContent3 from "../../assets/img/nologin_body_content_3.jpg";
import bodyContent4 from "../../assets/img/nologin_body_content_4.jpg";
import bodyPost1 from "../../assets/img/nologin_body_post1.jpg";
import Footer from "../../commoms/footer/index";
import LoginModal from "../../commoms/auth/loginModal/index";
import { useSelector } from "react-redux";
import { selectorModal } from "../../features/modal/modalSlice";

function HomeNoLogin() {
  const show = useSelector(selectorModal);

  const CardStyle = ({ lable, info, buttonText }) => {
    return (
      <div className={styles.body_info__card}>
        <h2>{lable}</h2>
        <p>{info}</p>
        <button className={styles.button}>{buttonText}</button>
      </div>
    );
  };
  //
  const CardStyleImg = ({ img, lable, info, buttonText }) => {
    return (
      <div className={styles.body_content_card}>
        <div
          className={styles.body_content_card_img}
          style={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <div className={styles.body_content_card_text}>
          <h2>{lable}</h2>
          <p>{info}</p>
          <button className={styles.button}>{buttonText}</button>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <div className={styles.banner_content}>
          <h1>The living</h1>
          <h1>art of Bonsai</h1>
          <div className={styles.banner_description}>
            <p>Thú chơi tao nhã cho người thảnh thơi!</p>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.body_info}>
          <CardStyle
            lable="Công nghệ"
            info="Những công nghệ tiên tiến như <br /> Tưới nước tự động, Kiểm soát
              độ ẩm"
            buttonText="Tìm hiểu"
          />
          <CardStyle
            lable="Cây đặc biệt"
            info="Hướng dẫn chăm sóc các loài cây Bonsai phổ biến nhất"
            buttonText="Tìm hiểu"
          />
          <CardStyle
            lable="Khóa học Online"
            info=" Học hỏi từ các bậc thầy về Bonsai trong các khóa học trực tuyến
            cao cấp của chúng tôi"
            buttonText="Tìm hiểu"
          />
        </div>

        <div className={styles.body_content}>
          <CardStyleImg
            img={bodyContent1}
            lable="Chăm sóc cây cảnh"
            info="Giữ cho một cây Bonsai sống sót không phải là một nhiệm vụ khó
                khăn, nhưng có một số điều bạn cần lưu ý. Cây bonsai được trồng
                trong các chậu nhỏ với không gian tối thiểu để dự trữ nước và
                chất dinh dưỡng.Điều đó có nghĩa là bạn cần phải tưới nước và
                bón phân cho cây thường xuyên. Đảm bảo Bonsai của bạn có nhiều
                ánh sáng, nước và bón phân khi cần thiết và cây của bạn chắc
                chắn sẽ phát triển mạnh!"
            buttonText="Quan tâm"
          />
          {/*  */}
          <CardStyleImg
            img={bodyContent2}
            lable="Chăm sóc cây cảnh"
            info="Giữ cho một cây Bonsai sống sót không phải là một nhiệm vụ khó
                khăn, nhưng có một số điều bạn cần lưu ý. Cây bonsai được trồng
                trong các chậu nhỏ với không gian tối thiểu để dự trữ nước và
                chất dinh dưỡng.Điều đó có nghĩa là bạn cần phải tưới nước và
                bón phân cho cây thường xuyên. Đảm bảo Bonsai của bạn có nhiều
                ánh sáng, nước và bón phân khi cần thiết và cây của bạn chắc
                chắn sẽ phát triển mạnh!"
            buttonText="Quan tâm"
          />
          {/*  */}
          <CardStyleImg
            img={bodyContent3}
            lable="Chăm sóc cây cảnh"
            info="Giữ cho một cây Bonsai sống sót không phải là một nhiệm vụ khó
                khăn, nhưng có một số điều bạn cần lưu ý. Cây bonsai được trồng
                trong các chậu nhỏ với không gian tối thiểu để dự trữ nước và
                chất dinh dưỡng.Điều đó có nghĩa là bạn cần phải tưới nước và
                bón phân cho cây thường xuyên. Đảm bảo Bonsai của bạn có nhiều
                ánh sáng, nước và bón phân khi cần thiết và cây của bạn chắc
                chắn sẽ phát triển mạnh!"
            buttonText="Quan tâm"
          />

          <CardStyleImg
            img={bodyContent4}
            lable="Chăm sóc cây cảnh"
            info="Giữ cho một cây Bonsai sống sót không phải là một nhiệm vụ khó
                khăn, nhưng có một số điều bạn cần lưu ý. Cây bonsai được trồng
                trong các chậu nhỏ với không gian tối thiểu để dự trữ nước và
                chất dinh dưỡng.Điều đó có nghĩa là bạn cần phải tưới nước và
                bón phân cho cây thường xuyên. Đảm bảo Bonsai của bạn có nhiều
                ánh sáng, nước và bón phân khi cần thiết và cây của bạn chắc
                chắn sẽ phát triển mạnh!"
            buttonText="Quan tâm"
          />
        </div>

        {/*  */}
        <div className={`${styles.body_info} ${styles.body_question}`}>
          <CardStyle
            lable="Công nghệ"
            info="Những công nghệ tiên tiến như <br /> Tưới nước tự động, Kiểm soát
              độ ẩm"
            buttonText="Tìm hiểu"
          />
          <CardStyle
            lable="Cây đặc biệt"
            info="Hướng dẫn chăm sóc các loài cây Bonsai phổ biến nhất"
            buttonText="Tìm hiểu"
          />
          <CardStyle
            lable="Khóa học Online"
            info=" Học hỏi từ các bậc thầy về Bonsai trong các khóa học trực tuyến
            cao cấp của chúng tôi"
            buttonText="Tìm hiểu"
          />
        </div>
        {/*  */}

        {/*  */}
        <div className={styles.body_blog}>
          <div className={styles.body_blog_title}>
            <h3>Recent posts</h3>
            <p>Blog</p>
          </div>

          <div className={styles.body_blog_posts}>
            <div className={styles.body_blog_posts__card}>
              <img src={bodyPost1}></img>
              <h3>Cây dừa mimi</h3>
              <p>23-02-2022</p>
            </div>
            <div className={styles.body_blog_posts__card}>
              <img src={bodyPost1}></img>
              <h3>Cây dừa mimi</h3>
              <p>23-02-2022</p>
            </div>
            <div className={styles.body_blog_posts__card}>
              <img src={bodyPost1}></img>
              <h3>Cây dừa mimi</h3>
              <p>23-02-2022</p>
            </div>
            <div className={styles.body_blog_posts__card}>
              <img src={bodyPost1}></img>
              <h3>Cây dừa mimi</h3>
              <p>23-02-2022</p>
            </div>
          </div>
        </div>
      </div>

      <Header />
      <Footer />
      <LoginModal undisplay={show.component === "login" ? !show.show : true} />
    </div>
  );
}

export default HomeNoLogin;
