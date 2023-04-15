import React from "react";
import styles from "./Landing.module.scss";
import searchIcon from "../../../src/assets/img/search.png";
import phoneImg from "../../../src/assets/img/top-img.png";
import demoVideo from "../../../src/assets/video/video-light-meydit.mp4";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.intro}>
        <h1>Fashion made especially for you.</h1>
        <p>
          Authentic, sustainable and stylish outfits require awesome creatives.
          Meyd.it helps source and manage slow fashion, that is made to measure
          and on demand.
        </p>
        <h2>Find the best maker with the skills you need</h2>
        <form className={styles.searchBar}>
          <img src={searchIcon} alt="searchIcon" />
          <input
            type="text"
            placeholder="Search Trends"
            className={styles.searchInput}
          />
          <button type="submit">Search</button>
        </form>
        <div className={styles.searchTabs}>
          <span>Popular:</span>
          <button className={styles.tab}>Classic</button>
          <button className={styles.tab}>Streetwear</button>
          <button className={styles.tab}>Retro</button>
          <button className={styles.tab}>Chic</button>
          <button className={styles.tab}>Preppy</button>
        </div>
      </div>
      <div className={styles.demo}>
        <img src={phoneImg} alt="phoneImg" className={styles.phoneImg} />
        <video
          src={demoVideo}
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          controls
        />
      </div>
    </div>
  );
};

export default Landing;
