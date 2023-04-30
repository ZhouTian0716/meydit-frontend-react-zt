import React, { useState } from "react";
import styles from "./Dashboard.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
// Redux
import { getAccount, getToken } from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { s3SecureUrl } from "../../api/aws";
import { validateFilesize } from "../../utils/helpers";

// interface SelectedFile  {
//   name?: string;
//   size?: number;
//   type?: string;
//   preview?: string;
// };

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  // Redux
  const loginUser = useAppSelector(getAccount);

  const createProject = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedFile);
    // get secure url from backend
    // const url = await s3SecureUrl();
    // console.log("Uploading project", url);
    // upload image to s3 with secure url
    // await axios.put(url, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },

    // });
    // post request to server to store project
  };
  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // We prevent massive images from being uploaded
    if (!e.target.files) return;
    const file = e.target.files[0];
    const { size } = file;
    // console.log(file.size)
    const maxMB = 15;
    const sizeOK = validateFilesize(size, maxMB);
    if (!sizeOK) return;
    setSelectedFile(file);
  };
  return (
    <div className={styles.dashboard}>
      <h1>Hello {loginUser.first_name || loginUser.email?.split("@")[0]}</h1>
      <p>Wanna post a new project today?</p>
      <form className={styles.authForm} onSubmit={createProject}>
        <input type="file" onChange={onAddImage} />
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
