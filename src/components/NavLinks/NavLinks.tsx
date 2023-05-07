import { useState } from "react";
import styles from "./NavLinks.module.scss";
import defaultAvatar from "../../../src/assets/img/defaultAvatar.png";
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
  const { role, profile } = loginUser;
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
      {role.name === "Maker" && (
        <Link to="#" className={styles.nav__link}>
          Buyers
        </Link>
      )}
      {role.name === "Client" && (
        <Link to="#" className={styles.nav__link}>
          Makers
        </Link>
      )}

      {token ? (
        <div className={styles.account} onClick={() => setOpen(!open)}>
          <div className={styles.accountBtn}>
            <div className={styles.avatarContainer}>
              <img
                src={profile.avatar ? profile.avatar : defaultAvatar}
                alt="UserIcon"
                className={styles.avatar}
              />
            </div>

            <span className={styles.accountName}>
              {loginUser.firstName || loginUser.email?.split("@")[0]}
            </span>
          </div>

          <div className={optionsClass}>
            {role.name === "Client" && (
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
      ) : (
        <button
          className={styles.nav__btn}
          type="button"
          onClick={() => navigate("/auth")}
        >
          Join
        </button>
      )}
    </div>
  );
};

export default NavLinks;

NavLinks.defaultProps = {
  showOnMobile: false,
};
