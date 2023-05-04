import React, { useState } from "react";
import styles from "./Dashboard.module.scss";
import { TiDelete } from "react-icons/ti";
import InputV1 from "../../components/Lib/Inputs/InputV1/InputV1";
import TextAreaV1 from "../../components/Lib/TextArea/TextAreaV1";
import SelectV1 from "../../components/Lib/Select/SelectV1/SelectV1";
import { projectsStore } from "../../api/projects";
import { imagesStore } from "../../api/images";
import { ICreateImage, ICreateProject, IProjectsStoreRes } from "../../types";
import { uploadToS3 } from "../../utils/aws";
import { validateFilesize } from "../../utils/helpers";
import { toast } from "react-toastify";
import { Categories, Tags, toastErrorMessages } from "../../data/constants";
// Redux
import { getAccount, getToken } from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Dashboard = () => {
  const projectInitialState: ICreateProject = {
    title: "dfdfs",
    description: "dfdf",
    category: Categories[0].value,
    tags: [],
  };
  const [projectPayload, setProjectPayload] = useState(projectInitialState);
  const { title, description, category, tags } = projectPayload;
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const MAX_FILE_COUNT = 9;
  // Redux
  const loginUser = useAppSelector(getAccount);
  const { token } = useAppSelector(getToken);

  // ZT-NOTE: 创建project的过程步骤要之后做好记录，因为涉及到了s3的上传，以及image入档db的顺序
  const createProject = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!uploadedFiles.length)
        return toast.error(toastErrorMessages.emptyFile);
      if (!token) return toast.error(toastErrorMessages.tokenLost);
      console.log("checking breack point");

      // ZT-NOTE: 多个图片发送多个请求
      const resArray = await uploadToS3(uploadedFiles);
      if (!resArray) return toast.error(toastErrorMessages.uploadIssue);
      if (!title) return toast.error(toastErrorMessages.titleRequired);

      // ZT-NOTE: 注意创建project要有用户权限，所以这之前要检查登录状态
      const projectsStoreRes: IProjectsStoreRes = await projectsStore(
        projectPayload,
        token
      );

      const imagePayloadArray: ICreateImage[] = resArray.map((res) => {
        return {
          url: res.urlOnS3,
          fileName: res.fileName,
          projectId: projectsStoreRes.id,
        };
      });

      // ZT-NOTE: imagePayloadArray here prepared for going into DB
      imagePayloadArray.forEach(async (imagePayload) => {
        const imageStoreRes = await imagesStore(imagePayload);
        console.log(imageStoreRes);
      });
      toast.success("Project created!");
    } catch (err) {
      toast.error("Project create fail due to unknown error.");
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let limitExceeded = false;
    const maxMB = 15;
    const fileList = e.target.files;
    if (!fileList) return;
    const chosenFiles = Array.prototype.slice.call(fileList);
    const uploaded = [...uploadedFiles];

    chosenFiles.some((file) => {
      const sizeOK = validateFilesize(file.size, maxMB, file.name);
      if (!sizeOK) return;
      if (uploaded.findIndex((f) => f.name === file.name) !== -1) return;
      uploaded.push(file);
      if (uploaded.length === MAX_FILE_COUNT) {
        setFileLimit(true);
      }
      if (uploaded.length > MAX_FILE_COUNT) {
        alert(`${MAX_FILE_COUNT} images allowed in total.`);
        setFileLimit(false);
        limitExceeded = true;
        return true;
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
    // console.log(uploadedFiles);
  };

  const onCancelImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    // console.log(target.dataset.filename);
    const filteredFiles = uploadedFiles.filter(
      (file) => file.name !== target.dataset.filename
    );
    setUploadedFiles(filteredFiles);

    if (uploadedFiles.length <= MAX_FILE_COUNT) {
      setFileLimit(false);
    }
  };

  const onProjectPayloadChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProjectPayload({ ...projectPayload, [e.target.name]: e.target.value });
  };

  const submitBtnClass = loading
    ? `${styles.btn} formBtn disabled loading`
    : `${styles.btn} formBtn`;

  return (
    <div className={styles.dashboard}>
      <h1>Hello {loginUser.firstName || loginUser.email?.split("@")[0]}</h1>
      <p
        onClick={() => {
          console.log(uploadedFiles);
        }}
      >
        Wanna post a new project today?
      </p>
      <form className={styles.projectForm} onSubmit={createProject}>
        <InputV1
          testId="projectTitle"
          type="text"
          label="Title:"
          name="title"
          placeHolder="Project Title"
          defaultValue={title}
          onParentStateChange={onProjectPayloadChange}
          classes={"width-100"}
          required={true}
        />
        <div className={styles.imageGrid}>
          {!!uploadedFiles &&
            uploadedFiles.map((e) => (
              <div
                className={styles.imgContainer}
                key={`${e.size}+${e.lastModified}+${e.name}`}
              >
                <img
                  className={styles.uploadImg}
                  src={URL.createObjectURL(e)}
                />
                <button
                  type="button"
                  className={styles.deleteBtn}
                  data-filename={e.name}
                  onClick={onCancelImage}
                >
                  <TiDelete
                    fontSize={"20px"}
                    pointerEvents="none"
                    color="pink"
                  />
                </button>
              </div>
            ))}
          {!fileLimit && (
            <label htmlFor="uploadBtn" className={styles.addFileBtn}>
              +
            </label>
          )}
          <input
            type="file"
            id="uploadBtn"
            className={styles.fileInputEl}
            onChange={onAddImage}
            name="uploadedFiles"
            multiple
            accept="image/*"
          />
        </div>

        <SelectV1
          testId="category"
          label="Pick a category:"
          name="category"
          defaultValue={category}
          options={Categories}
          required={true}
          classes={"width-100"}
          onParentStateChange={onProjectPayloadChange}
        />

        <SelectV1
          testId="category"
          label="Pick some tags:"
          name="tags"
          defaultValue={tags}
          options={Tags}
          required={true}
          classes={"width-100"}
          multiple={true}
          onParentStateChange={onProjectPayloadChange}
        />

        <TextAreaV1
          testId="projectDesc"
          type="text"
          label="Description:"
          name="description"
          rows={6}
          placeHolder="Project Description"
          defaultValue={description}
          onParentStateChange={onProjectPayloadChange}
          classes={"width-100"}
          required={true}
        />

        <button type="submit" className={submitBtnClass} disabled={loading}>
          {loading ? "Sending..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
