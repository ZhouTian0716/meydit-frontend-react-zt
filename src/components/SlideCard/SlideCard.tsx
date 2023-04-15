import React from "react";
import { Link } from "react-router-dom";
import styles from "./SlideCard.module.scss";
import { ITopMaker } from "../../types";

interface ISlideCardProps {
  item: ITopMaker;
}

const SlideCard = ({ item }: ISlideCardProps) => {
  return (
    <Link to={`maker-design/${item.id}`}>
      <div className={styles.makerCard}>
        <img src={item.avatar} alt={item.id} className={styles.makerImg} />
        <div className={styles.makerInfo}>
          <p className={styles.makerName}>{item.name}</p>
          <p className={styles.makerBio}>{item.bio}</p>
        </div>
      </div>
    </Link>
  );
};

export default SlideCard;
