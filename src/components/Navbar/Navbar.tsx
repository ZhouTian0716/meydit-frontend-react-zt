import { useState, useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import styles from "./Navbar.module.scss";
import logo from "../../../src/assets/img/white_logo.png";
import avatar from "../../../src/assets/img/avatar.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  // role: buyer, maker, null
  const currentUser = { id: 1, username: "Joe", role: "null" };

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
        {currentUser?.role === "buyer" && (
          <Link to="#" className={styles.nav__link}>
            Makers
          </Link>
        )}
        {currentUser?.role === "null" && (
          <button
            className={styles.nav__btn}
            type="button"
            onClick={() => navigate("/auth")}
          >
            Join
          </button>
        )}
        {currentUser?.role !== "null" && (
          <div className={styles.account} onClick={() => setOpen(!open)}>
            <div className={styles.accountBtn}>
              <img src={avatar} alt="avatar" className={styles.avatar} />
              <span>{currentUser.username}</span>
            </div>

            <div className={optionsClass}>
              {currentUser?.role === "buyer" && (
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
              <Link to="/logout" className={styles.option}>
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
      <HiMenuAlt1 className={styles.menuBtn} />
    </div>
  );
};

export default Navbar;
