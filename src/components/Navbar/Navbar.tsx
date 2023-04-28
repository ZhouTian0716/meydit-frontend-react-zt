import { useState, useEffect } from "react";
import { HiMenuAlt1, HiOutlineX } from "react-icons/hi";
import styles from "./Navbar.module.scss";
import logo from "../../../src/assets/img/white_logo.png";
import { Link, useLocation } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isShowBottomNav, toggleBottomNav } from "../../redux/reducers/uiSlice";
import NavLinks from "../NavLinks/NavLinks";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();

  // Redux
  const bottomNav = useAppSelector(isShowBottomNav);
  const dispatch = useAppDispatch();

  const navClass =
    active || pathname !== "/" ? `${styles.nav} ${styles.active}` : styles.nav;

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <div className={navClass}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <NavLinks />
      {bottomNav ? (
        <HiOutlineX
          className={styles.menuBtn}
          onClick={() => dispatch(toggleBottomNav())}
        />
      ) : (
        <HiMenuAlt1
          className={styles.menuBtn}
          onClick={() => dispatch(toggleBottomNav())}
        />
      )}
    </div>
  );
};

export default Navbar;
