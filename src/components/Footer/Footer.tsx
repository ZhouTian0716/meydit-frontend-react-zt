import React from "react";
import { Link } from "react-router-dom";
import { GrFacebookOption, GrLinkedinOption } from "react-icons/gr";
import { SiInstagram, SiTwitter, SiPinterest } from "react-icons/si";
import colorLogo from "../../assets/img/logo.png";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <img src={colorLogo} alt="colorLogo" className={styles.logo} />
      <div className={styles.icons}>
        <Link to="/">
          <SiInstagram className={styles.socialIcon} />
        </Link>
        <Link to="/">
          <GrFacebookOption className={styles.socialIcon} />
        </Link>
        <Link to="/">
          <SiTwitter className={styles.socialIcon} />
        </Link>
        <Link to="/">
          <SiPinterest className={styles.socialIcon} />
        </Link>
        <Link to="/">
          <GrLinkedinOption className={styles.socialIcon} />
        </Link>
      </div>
      <p>
        <span className={`${styles.link} ${styles.borderRt}`}>About</span>
        <span className={`${styles.link} ${styles.borderRt}`}>Terms & Conditions</span>
        <span className={`${styles.link} ${styles.borderRt}`}>Privacy Policy</span>
        <span className={`${styles.link}`}>Contact</span>
      </p>
      <p>Copyright &#169; 2021 Meyd.it</p>
    </div>
  );
}

export default Footer;
