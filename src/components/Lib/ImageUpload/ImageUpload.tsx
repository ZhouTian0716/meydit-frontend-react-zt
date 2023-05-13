import React, { useState } from "react";
import styles from "./ImageUpload.module.scss";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { ThreeCircles } from "react-loader-spinner";
import { s3SecureUrlForDelete, s3SecureUrlForUpload } from "../../../api/aws";
import { IS3UploadPermissionRes, handleDelete } from "../../../utils/aws";
import axios from "axios";
import { toast } from "react-toastify";
import { toastErrorMessages } from "../../../data/constants";
import { profilesUpdate } from "../../../api/profiles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getAccount,
  getToken,
  updateProfile,
} from "../../../redux/reducers/authSlice";

interface IProps {
  defaultSrc: string;
  category: string;
}

const ImageUpload = (props: IProps) => {
  const { defaultSrc, category } = props;

  // Redux
  const { token } = useAppSelector(getToken);
  const { id: accountId, profile } = useAppSelector(getAccount);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { avatar } = profile;
  let currentSrc = image
    ? URL.createObjectURL(image)
    : avatar
    ? avatar
    : defaultSrc;

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleConfirm = async () => {
    if (!image) return;
    setLoading(true);
    if (avatar) handleDelete(avatar, accountId.toString(), token);
    confirmUpload(image, accountId.toString(), category);
  };
  const confirmUpload = async (
    file: File | null,
    filesFolder: string,
    category: string
  ) => {
    if (!file) return;
    try {
      // Step 1: get s3 presigned url for upload
      const fileType = encodeURIComponent(file.name).split(".")[1];
      const res: IS3UploadPermissionRes = await s3SecureUrlForUpload(
        fileType,
        filesFolder,
        category,
        accountId.toString(),
        token
      );
      const { urlOnS3 } = res;
      // Step 2: upload file to s3
      const { statusText } = await axios.put(res.uploadUrl, file);
      if (statusText !== "OK") {
        toast.error(toastErrorMessages.uploadIssue);
      } else {
        // Step 3: update user profile with new avatar url
        await profilesUpdate(accountId, { avatar: urlOnS3 }, token);
        // Step 4: update user profile avatar in redux state
        dispatch(updateProfile({ ...profile, avatar: urlOnS3 }));
      }
    } catch (err) {
      toast.error("Avatar update fail due to unknown error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.avatarContainer}>
      {loading ? (
        <ThreeCircles
          height="100%"
          width="100%"
          ariaLabel="three-circles-rotating"
          outerCircleColor="#9b71fe"
          innerCircleColor="#8460c3"
          middleCircleColor="#9b71fe"
        />
      ) : (
        <>
          <img className={styles.image} src={currentSrc} alt="myAvatar" />
          <label htmlFor="setAvatar" className={styles.editBtn}>
            <AiOutlineEdit color="blue" />
          </label>
          <input
            type="file"
            id="setAvatar"
            className={styles.fileInputEl}
            onChange={handleSetImage}
            accept="image/*"
          />
          <AiOutlineCloudUpload
            color="blue"
            className={styles.uploadBtn}
            onClick={handleConfirm}
          />
        </>
      )}
    </div>
  );
};

export default ImageUpload;

ImageUpload.defaultProps = {};
