import React, { useState } from "react";
import styles from "./Dashboard.module.scss";
import axios from "axios";

// Redux
import { getAccount, getToken } from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { s3SecureUrlForUpload, s3SecureUrlForDelete } from "../../api/aws";
import { validateFilesize } from "../../utils/helpers";
import { toast } from "react-toastify";
import InputV1 from "../../components/Lib/Inputs/InputV1/InputV1";
import { projectsStore } from "../../api/projects";
import { ICreateImage, ICreateProject, IProjectsStoreRes } from "../../types";
import { imagesStore } from "../../api/images";

interface IUploadReqReturn {
  uploadUrl: string;
  fileName: string;
}

const uploadToS3 = async (e: React.ChangeEvent<HTMLFormElement>) => {
  const formData = new FormData(e.target);
  // The input attribute name "projectImg" is used here
  const file = formData.get("projectImg");
  if (!file) {
    return null;
  }
  // @ts-ignore
  const fileType = encodeURIComponent(file.name).split(".")[1];
  const res: IUploadReqReturn = await s3SecureUrlForUpload(fileType);
  // 👻👻👻这里upload过后的返回并没有给回想要存的url好像，明天检查
  const uploadFinishResToBeCheck = await axios.put(res.uploadUrl, file);
  
  console.log(uploadFinishResToBeCheck);
  // return uploadFinishResToBeCheck;
};

const Dashboard = () => {
  const [title, setTitle] = useState("test");
  const [selectedFile, setSelectedFile] = useState<any>();
  // Redux
  const loginUser = useAppSelector(getAccount);
  const { token } = useAppSelector(getToken);

  // ZT-NOTE: 创建project的过程步骤要之后做好文档，因为涉及到了s3的上传，以及image入档db的顺序
  const createProject = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedFile) {
        toast.error(
          "At least one image is required to post a project, please try again."
        );
        return;
      }
      // Important: check login status before uploading
      if (!token) {
        toast.error("Project create fail due to login status lost.");
        return;
      }
      const res = await uploadToS3(e);
      if (res) {
        toast.error(
          "Image upload failed, contact technical support before posting project."
        );
        return;
      }
      // 👻👻👻检查完上面之后，再调回!res
      if (!title) {
        toast.error("Don't forget to add a title to your project!");
        return;
      }
      const projectPayload: ICreateProject = {
        title: title,
        description: "test",
      };
      // ZT-NOTE: 注意创建project要有用户权限，所以这之前要检查登录状态
      const projectsStoreRes: IProjectsStoreRes = await projectsStore(
        projectPayload,
        token
      );

      const imagePayload: ICreateImage = {
        url: res.uploadUrl,
        fileName: res.fileName,
        // ZT-NOTE: 这里用到projectId，所以要先创建project，再创建image
        projectId: projectsStoreRes.id,
      };
      const imageStoreRes = await imagesStore(imagePayload);
      console.log(imageStoreRes);
      toast.success("Project created!");
    } catch (err) {
      toast.error("Project create fail due to unknown error.");
      console.log(err);
    }
  };

  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // We prevent massive images from being uploaded
    if (!e.target.files) return;
    const file = e.target.files[0];
    const maxMB = 15;
    const sizeOK = validateFilesize(file.size, maxMB);
    if (!sizeOK) return;
    setSelectedFile(file);
  };

  // This is prepared for the furture delete at project delete
  const handleDelete = async () => {
    const url = await s3SecureUrlForDelete("project-images/20229d328213.jpg");
    await axios.delete(url);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.dashboard}>
      <h1>Hello {loginUser.firstName || loginUser.email?.split("@")[0]}</h1>
      <p>Wanna post a new project today?</p>
      <form className={styles.projectForm} onSubmit={createProject}>
        <InputV1
          testId="projectTitle"
          defaultValue={title}
          type="text"
          label="Title:"
          placeHolder=""
          onParentStateChange={onChangeTitle}
        />
        <input type="file" onChange={onAddImage} name="projectImg" />
        {selectedFile && (
          <div className={styles.imgContainer}>
            <img
              className={styles.uploadImg}
              src={URL.createObjectURL(selectedFile)}
            />
          </div>
        )}
        <button type="submit">Post</button>
      </form>
      <button type="button" onClick={handleDelete}>
        test delete
      </button>
    </div>
  );
};

export default Dashboard;
