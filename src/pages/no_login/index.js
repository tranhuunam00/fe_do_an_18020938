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
function HomeNoLogin() {
  const classes = clsx(styles.btn);
  return (
    <div style={{ height: "1500px" }}>
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
          <div className={styles.body_info__card}>
            <h2>Công nghệ</h2>
            <p>
              Những công nghệ tiên tiến như <br /> Tưới nước tự động, Kiểm soát
              độ ẩm
            </p>
            <button className={styles.button}>Tìm hiểu</button>
          </div>
          <div className={styles.body_info__card}>
            <h2>Cây đặc biệt</h2>
            <p>Hướng dẫn chăm sóc các loài cây Bonsai phổ biến nhất</p>
            <button className={styles.button}>Tìm hiểu</button>
          </div>

          <div className={styles.body_info__card}>
            <h2>Khóa học Online</h2>
            <p>
              Học hỏi từ các bậc thầy về Bonsai trong các khóa học trực tuyến
              cao cấp của chúng tôi
            </p>
            <button className={styles.button}>Tìm hiểu</button>
          </div>
        </div>

        <div className={styles.body_content}>
          <div className={styles.body_content_card}>
            <div
              className={styles.body_content_card_img}
              style={{
                backgroundImage: `url(${bodyContent1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div>
            <div className={styles.body_content_card_text}>
              <h2>Chăm sóc cây cảnh</h2>
              <p>
                Giữ cho một cây Bonsai sống sót không phải là một nhiệm vụ khó
                khăn, nhưng có một số điều bạn cần lưu ý. Cây bonsai được trồng
                trong các chậu nhỏ với không gian tối thiểu để dự trữ nước và
                chất dinh dưỡng.Điều đó có nghĩa là bạn cần phải tưới nước và
                bón phân cho cây thường xuyên. Đảm bảo Bonsai của bạn có nhiều
                ánh sáng, nước và bón phân khi cần thiết và cây của bạn chắc
                chắn sẽ phát triển mạnh!
              </p>
              <button className={styles.button}>Quan tâm</button>
            </div>
          </div>
          {/*  */}
          <div className={styles.body_content_card}>
            <div
              className={styles.body_content_card_img}
              style={{
                backgroundImage: `url(${bodyContent2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div>
            <div className={styles.body_content_card_text}>
              <h2>Chăm sóc cây cảnh</h2>
              <p>
                Giữ cho một cây Bonsai sống sót không phải là một nhiệm vụ khó
                khăn, nhưng có một số điều bạn cần lưu ý. Cây bonsai được trồng
                trong các chậu nhỏ với không gian tối thiểu để dự trữ nước và
                chất dinh dưỡng.Điều đó có nghĩa là bạn cần phải tưới nước và
                bón phân cho cây thường xuyên. Đảm bảo Bonsai của bạn có nhiều
                ánh sáng, nước và bón phân khi cần thiết và cây của bạn chắc
                chắn sẽ phát triển mạnh!
              </p>
              <button className={styles.button}>Quan tâm</button>
            </div>
          </div>
          {/*  */}
          <div className={styles.body_content_card}>
            <div
              className={styles.body_content_card_img}
              style={{
                backgroundImage: `url(${bodyContent3})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div>
            <div className={styles.body_content_card_text}>
              <h2>Chăm sóc cây cảnh</h2>
              <p>
                Giữ cho một cây Bonsai sống sót không phải là một nhiệm vụ khó
                khăn, nhưng có một số điều bạn cần lưu ý. Cây bonsai được trồng
                trong các chậu nhỏ với không gian tối thiểu để dự trữ nước và
                chất dinh dưỡng.Điều đó có nghĩa là bạn cần phải tưới nước và
                bón phân cho cây thường xuyên. Đảm bảo Bonsai của bạn có nhiều
                ánh sáng, nước và bón phân khi cần thiết và cây của bạn chắc
                chắn sẽ phát triển mạnh!
              </p>
              <button className={styles.button}>Quan tâm</button>
            </div>
          </div>
        </div>

        {/*  */}
        <div className={`${styles.body_info} ${styles.body_question}`}>
          <div className={styles.body_info__card}>
            <h2>Công nghệ</h2>
            <p>
              Những công nghệ tiên tiến như <br /> Tưới nước tự động, Kiểm soát
              độ ẩm
            </p>
            <button className={styles.button}>Tìm hiểu</button>
          </div>
          <div className={styles.body_info__card}>
            <h2>Cây đặc biệt</h2>
            <p>Hướng dẫn chăm sóc các loài cây Bonsai phổ biến nhất</p>
            <button className={styles.button}>Tìm hiểu</button>
          </div>

          <div className={styles.body_info__card}>
            <h2>Khóa học Online</h2>
            <p>
              Học hỏi từ các bậc thầy về Bonsai trong các khóa học trực tuyến
              cao cấp của chúng tôi
            </p>
            <button className={styles.button}>Tìm hiểu</button>
          </div>
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
    </div>
  );
}

export default HomeNoLogin;
