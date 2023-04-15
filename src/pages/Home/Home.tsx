import React from "react";
import styles from "./Home.module.scss";
import Landing from "../../components/Landing/Landing";

const Home = () => {
  return (
    <div className={styles.add}>
      <Landing />
    </div>
  );
};

export default Home;
