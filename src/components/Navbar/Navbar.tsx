import React from "react";
import styles from "./Navbar.module.scss";
import logo from "../../../public/img/white_logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <ul className={styles.nav__links}>
        <Link to="#">
          <li>Business</li>
        </Link>
        <Link to="#">
          <li>Explore</li>
        </Link>
        <Link to="#">
          <li>Buyers</li>
        </Link>
        <Link to="#">
          <li>Makers</li>
        </Link>
        <Link to="#">
          <li>Sign in</li>
        </Link>
        <button className={styles.nav__btn}>Join</button>
      </ul>
    </div>
  );
};

export default Navbar;
