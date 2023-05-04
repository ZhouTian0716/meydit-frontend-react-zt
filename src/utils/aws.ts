import axios from "axios";
import { toastErrorMessages } from "../data/constants";
import { s3SecureUrlForDelete, s3SecureUrlForUpload } from "../api/aws";
import { toast } from "react-toastify";


interface IS3UploadPermissionRes {
  uploadUrl: string;
  urlOnS3: string;
  fileName: string;
}

export const uploadToS3 = async (filesArray: File[]) => {
  if (!filesArray.length) return;
  let resArray: IS3UploadPermissionRes[] = [];

  await Promise.all(
    filesArray.map(async (file) => {
      // @ts-ignore
      const fileType = encodeURIComponent(file.name).split(".")[1];
      const res: IS3UploadPermissionRes = await s3SecureUrlForUpload(fileType);
      // ZT-NOTE:👻这里拿到for upload的presigned url之后，axios的返回结果为空，但是图片已经上传到s3了
      const { statusText } = await axios.put(res.uploadUrl, file);
      if (statusText !== "OK") {
        toast.error(toastErrorMessages.uploadIssue);
      } else {
        resArray = [...resArray, res];
      }
    })
  );
  return resArray;
};

// This is prepared for the furture delete at project delete
export const handleDelete = async () => {
    const url = await s3SecureUrlForDelete("project-images/30221432cb17.jpg");
    await axios.delete(url);
  };
