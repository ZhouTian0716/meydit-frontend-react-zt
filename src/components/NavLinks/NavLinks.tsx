import { useState } from "react";
import styles from "./NavLinks.module.scss";
import defaultUser from "../../../src/assets/img/defaultUser.png";
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
  const { id, role, profile } = loginUser;
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
                src={profile?.avatar ? profile.avatar : defaultUser}
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
                <Link to={`/account/${id}/projects`} className={styles.option}>
                  My Projects
                </Link>
                <Link to="/dashboard/clients" className={styles.option}>
                  Create Project
                </Link>
              </>
            )}
            {role.name === "Maker" && (
              <>
                <Link to="/projects" className={styles.option}>
                  My page
                </Link>
                <Link to="/dashboard/makers" className={styles.option}>
                  Bid a Project
                </Link>
              </>
            )}
            <Link to="/messages" className={styles.option}>
              Messages
            </Link>
            <Link to={`/account/${id}`} className={styles.option}>
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
