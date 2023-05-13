import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import NavLinks from "../NavLinks/NavLinks";
import { useAppSelector } from "../../redux/hooks";
import { isShowBottomNav } from "../../redux/reducers/uiSlice";

const Layout = () => {
  const bottomNav = useAppSelector(isShowBottomNav);
  return (
    <div className="layoutContainer">
      <Navbar />
      <Outlet />
      <Footer />
      {bottomNav && <NavLinks showOnMobile={true} />}
    </div>
  );
};

export default Layout;
