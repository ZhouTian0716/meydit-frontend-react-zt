import { useState } from "react";
import styles from "./NavLinks.module.scss";
import avatar from "../../../src/assets/img/avatar.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// API call
import { logoutApi } from "../../api/auth";
// Redux
import {
  logUserOut,
  getAccount,
  getToken,
} from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
interface IProps {
  showOnMobile?: boolean;
}

const NavLinks = (props: IProps) => {
  const { showOnMobile } = props;
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Redux
  const loginUser = useAppSelector(getAccount);
  const { token } = useAppSelector(getToken);
  const dispatch = useAppDispatch();

  const optionsClass = open
    ? `${styles.options} ${styles.active}`
    : styles.options;

  const linksClass = showOnMobile
    ? `${styles.nav__links} ${styles.nav__links__res}`
    : styles.nav__links;

  const onLogout = async () => {
    const res = await logoutApi(token);
    dispatch(logUserOut());
    toast.success(res.message);
    navigate("/auth");
  };

  return (
    <div className={linksClass}>
      <Link to="#" className={styles.nav__link}>
        Business
      </Link>
      <Link to="https://meyd.it" className={styles.nav__link}>
        Explore
      </Link>
      {loginUser?.role === "maker" && (
        <Link to="#" className={styles.nav__link}>
          Buyers
        </Link>
      )}
      {loginUser?.role === "client" && (
        <Link to="#" className={styles.nav__link}>
          Makers
        </Link>
      )}
      {!loginUser?.role && (
        <button
          className={styles.nav__btn}
          type="button"
          onClick={() => navigate("/auth")}
        >
          Join
        </button>
      )}
      {loginUser.role && (
        <div className={styles.account} onClick={() => setOpen(!open)}>
          <div className={styles.accountBtn}>
            <img src={avatar} alt="avatar" className={styles.avatar} />
            <span className={styles.accountName}>
              {loginUser.firstName || loginUser.email?.split("@")[0]}
            </span>
          </div>

          <div className={optionsClass}>
            {loginUser?.role === "client" && (
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
  );
};

export default NavLinks;

NavLinks.defaultProps = {
  showOnMobile: false,
};
