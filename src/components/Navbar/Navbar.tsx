import { useState, useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import styles from "./Navbar.module.scss";
import logo from "../../../src/assets/img/white_logo.png";
import avatar from "../../../src/assets/img/avatar.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Redux
import {
  logout,
  getLoginAccount,
  getTokenObj,
  resetAuth,
  getAuthError,
} from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Redux
  const currentUser = useAppSelector(getLoginAccount);
  const { token } = useAppSelector(getTokenObj);
  const dispatch = useAppDispatch();

  const navClass =
    active || pathname !== "/" ? `${styles.nav} ${styles.active}` : styles.nav;
  const optionsClass = open
    ? `${styles.options} ${styles.active}`
    : styles.options;

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const onLogout = () => {
    dispatch(logout(token));
    dispatch(resetAuth());
    console.log("logout");
  };

  return (
    <div className={navClass}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.nav__links}>
        <Link to="#" className={styles.nav__link}>
          Business
        </Link>
        <Link to="https://meyd.it" className={styles.nav__link}>
          Explore
        </Link>
        {currentUser?.role === "maker" && (
          <Link to="#" className={styles.nav__link}>
            Buyers
          </Link>
        )}
        {currentUser?.role === "client" && (
          <Link to="#" className={styles.nav__link}>
            Makers
          </Link>
        )}
        {!currentUser?.role && (
          <button
            className={styles.nav__btn}
            type="button"
            onClick={() => navigate("/auth")}
          >
            Join
          </button>
        )}
        {currentUser.role && (
          <div className={styles.account} onClick={() => setOpen(!open)}>
            <div className={styles.accountBtn}>
              <img src={avatar} alt="avatar" className={styles.avatar} />
              <span>
                {currentUser.first_name || currentUser.email?.split("@")[0]}
              </span>
            </div>

            <div className={optionsClass}>
              {currentUser?.role === "client" && (
                <>
                  <Link to="/buyer-designs" className={styles.option}>
                    My Designs
                  </Link>
                  <Link to="/buyer-designs/42323" className={styles.option}>
                    New Design
                  </Link>
                </>
              )}
              <Link to="/messages" className={styles.option}>
                Messages
              </Link>
              <Link to="/account" className={styles.option}>
                Settings
              </Link>
              <button className={styles.option} onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <HiMenuAlt1 className={styles.menuBtn} />
    </div>
  );
};

export default Navbar;
