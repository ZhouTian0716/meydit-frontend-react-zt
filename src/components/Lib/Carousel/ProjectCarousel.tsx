import React, { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BsFillHouseCheckFill } from "react-icons/bs";
import styles from "./Carousel.module.scss";
import { IImage } from "../../../api/resTypes";
import { useAppSelector } from "../../../redux/hooks";
import { getAccount, getToken } from "../../../redux/reducers/authSlice";
import { imageDelete, imageUpdate } from "../../../api/images";
import LoaderV1 from "../../Loader/LoaderV1";
import { handleDelete } from "../../../utils/aws";
import ImageUpload from "../ImageUpload/ImageUpload";

interface IProps {
  clientId: number;
  images: IImage[];
}

const maxImages = 9;

function ProjectCarousel({ images, clientId }: IProps) {
  const { id: accountId } = useAppSelector(getAccount);
  const { token } = useAppSelector(getToken);
  const [loading, setLoading] = useState(false);
  // ZT-NOTE: component本地建一个state来响应图片CRUD的前端ui显示
  const [pageImages, setPageImages] = useState(images);
  const { projectId } = pageImages[0];

  const handleSetCover = async (imageId: string) => {
    setLoading(true);
    try {
      await imageUpdate(imageId, { isProjectCover: true }, token);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSelectedImgDelete = async (imageId: string, imageUrl: string, accountId: string, token: string) => {
    // console.log(imageId, imageUrl, accountId, token);
    setLoading(true);
    try {
      // Step 1: delete image from RDS
      await imageDelete(imageId, token);
      // Step 2: delete image from S3
      await handleDelete(imageUrl, accountId, token);
      // Step 3: remove the image from current page
      setPageImages((prev) => prev.filter((image) => image.id.toString() !== imageId));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {pageImages.length < maxImages && clientId === accountId && (
        <ImageUpload category="project" filesFolder={projectId.toString()} setParentStateFn={setPageImages} />
      )}
      {pageImages.map((image) => (
        <div key={image.id} className={styles.imageContainer}>
          <img src={image.url} className={styles.image} />
          {clientId === accountId && (
            <div className={styles.optionsHeader}>
              {loading ? (
                <>
                  <LoaderV1 width="1.5em" height="1.5em" />
                  <LoaderV1 width="1.5em" height="1.5em" />
                </>
              ) : (
                <>
                  <button type="button" data-image-id={image.id} onClick={() => handleSetCover(image.id.toString())} className={`${styles.btn} bg-trans`}>
                    <BsFillHouseCheckFill pointerEvents="none" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectedImgDelete(image.id.toString(), image.url, accountId.toString(), token)}
                    className={`${styles.btn} bg-trans`}
                  >
                    <RiDeleteBin2Fill color="red" pointerEvents="none" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectCarousel;
