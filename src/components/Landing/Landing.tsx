import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.scss";
import searchIcon from "../../assets/img/search.png";
import phoneImg from "../../assets/img/top-img.png";
import demoVideo from "../../assets/video/video-light-meydit.mp4";
import { IAccount } from "../../api/resTypes";

interface IProps {
  accounts: IAccount[];
}

function Landing({ accounts }: IProps) {
  const clientNum = accounts.filter((account: IAccount) => account.role.name === "Client").length;
  const makerNum = accounts.filter((account: IAccount) => account.role.name === "Maker").length;

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO: search projects feature
  };

  return (
    <div className={styles.landing}>
      <div className={styles.intro}>
        <p>Registed Users: {accounts.length}</p>
        <p>
          <span className="fz-9 mr-1">Clients: {clientNum}</span>
          <span className="fz-9 mr-1">Makers: {makerNum}</span>
        </p>
        <h1>Fashion made especially for you.</h1>
        <p>
          Authentic, sustainable and stylish outfits require awesome creatives. Meyd.it helps source and manage slow fashion, that is made to measure and on
          demand.
        </p>
        <div>
          <Link to="/projects" className="navBtn">
            Projects
          </Link>
          <Link to="/makers" className="navBtn">
            Makers
          </Link>
        </div>
        <form className={styles.searchBar}>
          <img src={searchIcon} alt="searchIcon" />
          <input type="text" placeholder="Search Trends" className={styles.searchInput} />
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
        </form>
        <div className={styles.searchTabs}>
          <span>Popular:</span>
          <button type="button" className={styles.tab}>
            Classic
          </button>
          <button type="button" className={styles.tab}>
            Streetwear
          </button>
          <button type="button" className={styles.tab}>
            Retro
          </button>
          <button type="button" className={styles.tab}>
            Chic
          </button>
          <button type="button" className={styles.tab}>
            Preppy
          </button>
        </div>
      </div>
      <div className={styles.demo}>
        <img src={phoneImg} alt="phoneImg" className={styles.phoneImg} />
        <video src={demoVideo} className={styles.video} autoPlay loop muted playsInline controls />
      </div>
    </div>
  );
}

export default Landing;
