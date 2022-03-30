import Header from "../header";
import Footer from "../footer";

const Layout = ({ children }) => {
  console.log(children);
  console.log("huhi");
  return (
    <div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
