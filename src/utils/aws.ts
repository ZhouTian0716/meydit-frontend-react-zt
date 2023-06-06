import axios from "axios";
import { toast } from "react-toastify";
import { toastErrorMessages } from "../data/constants";
import { s3SecureUrlForDelete, s3SecureUrlForUpload } from "../api/aws";

export interface IS3UploadPermissionRes {
  uploadUrl: string;
  urlOnS3: string;
  fileName: string;
}

export const uploadToS3 = async (filesArray: File[], filesFolder: string, category: string, accountId: string, token: string) => {
  if (!filesArray.length) return;
  let resArray: IS3UploadPermissionRes[] = [];

  await Promise.all(
    filesArray.map(async (file) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const fileType = encodeURIComponent(file.name).split(".")[1];
      const res: IS3UploadPermissionRes = await s3SecureUrlForUpload(fileType, filesFolder, category, accountId, token);
      // ZT-NOTE:👻这里拿到for upload的presigned url之后，axios的返回结果为空，但是图片已经上传到s3了
      const { statusText } = await axios.put(res.uploadUrl, file);
      if (statusText !== "OK") {
        toast.error(toastErrorMessages.uploadIssue);
      } else {
        resArray = [...resArray, res];
      }
    })
  );
  // eslint-disable-next-line consistent-return
  return resArray;
};

// This is prepared for the furture delete at project delete
export const handleDelete = async (fileUrl: string, accountId: string, token: string) => {
  const fileKey = fileUrl.split("amazonaws.com/")[1];
  const res: string = await s3SecureUrlForDelete(fileKey, accountId, token);
  await axios.delete(res);
};
