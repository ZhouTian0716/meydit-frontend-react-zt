import React, { useState } from "react";
import styles from "./Carousel.module.scss";
import { IImage } from "../../../api/resTypes";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { useAppSelector } from "../../../redux/hooks";
import { getToken } from "../../../redux/reducers/authSlice";
import { imageUpdate } from "../../../api/images";
import LoaderV1 from "../../Loader/LoaderV1";

interface IProps {
  images: IImage[];
}
const ProjectCarousel = ({ images }: IProps) => {
  const { token } = useAppSelector(getToken);
  const [isChanging, setIsChanging] = useState(false);
  const handleSetCover = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    const selectedId = target.dataset.imageId;
    if (!selectedId) return;
    setIsChanging(true);
    try {
      await imageUpdate(selectedId, { isProjectCover: true }, token);
    } catch (err) {
      console.log(err);
    } finally {
      setIsChanging(false);
    }
  };
  const handleDelete = () => {};
  return (
    <div className={styles.container}>
      {images.map((image) => (
        <div key={image.id} className={styles.imageContainer}>
          <img src={image.url} className={styles.image} />
          <div className={styles.optionsHeader}>
            {isChanging ? (
              <>
                <LoaderV1 width={"1.5em"} height={"1.5em"} />
                <LoaderV1 width={"1.5em"} height={"1.5em"} />
              </>
            ) : (
              <>
                <button
                  type="button"
                  data-image-id={image.id}
                  onClick={handleSetCover}
                  className={`${styles.btn} bg-trans`}
                >
                  <BsFillHouseCheckFill pointerEvents="none" />
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className={`${styles.btn} bg-trans`}
                >
                  <RiDeleteBin2Fill color="red" pointerEvents="none" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCarousel;
