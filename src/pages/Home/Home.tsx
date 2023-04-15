import React from "react";
import styles from "./Home.module.scss";
import Landing from "../../components/Landing/Landing";
import Slide from "../../components/Slide/Slide";
import {topMakers} from "../../data/topMakers";

const Home = () => {
  return (
    <div className={styles.home}>
      <Landing />
      <Slide topMakers={topMakers}/>
    </div>
  );
};

export default Home;
