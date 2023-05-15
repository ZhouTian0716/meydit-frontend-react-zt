import React from "react";
import styles from "./Carousel.module.scss";
import { IImage } from "../../../api/resTypes";

interface IProps {
  images: IImage[];
}
const ProjectCarousel = ({ images }: IProps) => {
  return (
    <div className={styles.container}>
      {images.map((image) => (
        <div key={image.id} className={styles.imageContainer}>
          <img  src={image.url} className={styles.image} />
        </div>
      ))}
    </div>
  );
};

export default ProjectCarousel;
