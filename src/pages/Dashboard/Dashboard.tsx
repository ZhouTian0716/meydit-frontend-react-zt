import React, { useState } from "react";
import styles from "./Dashboard.module.scss";
import axios from "axios";

// Redux
import { getAccount, getToken } from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { s3SecureUrl } from "../../api/aws";
import { validateFilesize } from "../../utils/helpers";

const uploadToS3 = async (e: React.ChangeEvent<HTMLFormElement>) => {
  const formData = new FormData(e.target);
  // The input attribute name "projectImg" is used here
  const file = formData.get("projectImg");
  if (!file) {
    return null;
  }
  // @ts-ignore
  const fileType =encodeURIComponent(file.name).split('.')[1];
  const url = await s3SecureUrl(fileType);
  await axios.put(url, file);
};

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  // Redux
  const loginUser = useAppSelector(getAccount);

  const createProject = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await uploadToS3(e);
    // post request to server to store project
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

  return (
    <div className={styles.dashboard}>
      <h1>Hello {loginUser.first_name || loginUser.email?.split("@")[0]}</h1>
      <p>Wanna post a new project today?</p>
      <form className={styles.authForm} onSubmit={createProject}>
        <input
          type="file"
          onChange={onAddImage}
          name="projectImg"
        />
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
    </div>
  );
};

export default Dashboard;
