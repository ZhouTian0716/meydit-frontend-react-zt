import React, { useState } from "react";
import styles from "./ImageUpload.module.scss";
import addFile from "../../../assets/img/addFile.png";
import { ThreeCircles } from "react-loader-spinner";
import { useAppSelector } from "../../../redux/hooks";
import { getAccount, getToken } from "../../../redux/reducers/authSlice";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { IS3UploadPermissionRes } from "../../../utils/aws";
import { s3SecureUrlForUpload } from "../../../api/aws";
import axios from "axios";
import { toast } from "react-toastify";
import { imagesStore } from "../../../api/images";
import { IImage } from "../../../api/resTypes";

interface IProps {
  category: string;
  filesFolder: string;
  customStyles?: {
    width: string;
    aspectRatio: number;
  };
  setParentStateFn: React.Dispatch<React.SetStateAction<IImage[]>>;
}

const ImageUpload = (props: IProps) => {
  const { filesFolder, category, customStyles, setParentStateFn } = props;
  // Redux
  const { token } = useAppSelector(getToken);
  const { id: accountId } = useAppSelector(getAccount);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  let currentSrc = image ? URL.createObjectURL(image) : addFile;

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const confirmUpload = async (
    file: File | null,
    filesFolder: string,
    category: string
  ) => {
    if (!file) return;
    setLoading(true);
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
      // Step 2: upload file to s3
      await axios.put(res.uploadUrl, file);
      // Step 3: save new image data to database
      const imagePayload = {
        url: res.urlOnS3,
        fileName: res.fileName,
        projectId: parseInt(filesFolder),
      };
      const newImgRes = await imagesStore(imagePayload);
      // Step 4: 修改父组件imageArray的state
      // 有待调整优化，改后端
      const newImageData = {
        id: newImgRes.id,
        url: res.urlOnS3,
        fileName: res.fileName,
        isProjectCover: false,
      };
      setParentStateFn((prev: IImage[]) => [...prev, newImageData]);
    } catch (err) {
      toast.error("Upload fail due to unknown error.");
    } finally {
      setLoading(false);
      setImage(null);
    }
  };

  return (
    <div className={styles.avatarContainer} style={customStyles}>
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
            className="display-none"
            onChange={handleSetImage}
            accept="image/*"
          />
          <AiOutlineCloudUpload
            color="blue"
            className={styles.uploadBtn}
            onClick={() => confirmUpload(image, filesFolder, category)}
          />
        </>
      )}
    </div>
  );
};

export default ImageUpload;

ImageUpload.defaultProps = {
  customStyles: {
    width: "300px",
    aspectRatio: 0.8,
  },
};
