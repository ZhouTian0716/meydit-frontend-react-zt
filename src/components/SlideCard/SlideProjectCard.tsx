import React from "react";
import styles from "./SlideCard.module.scss";
import { IImage } from "../../api/resTypes";

interface IProps {
  projectImage: IImage;
}

const SlideProjectCard = ({ projectImage }: IProps) => {
  const { url } = projectImage;
  return (
    <div className={styles.makerCard}>
      <img src={url} alt={"user"} className={styles.makerImg} />
    </div>
  );
};

export default SlideProjectCard;
