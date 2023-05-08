import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import { TiDelete } from "react-icons/ti";
import InputV1 from "../../components/Lib/Inputs/InputV1/InputV1";
import TextAreaV1 from "../../components/Lib/TextArea/TextAreaV1";
import SelectV1 from "../../components/Lib/Select/SelectV1/SelectV1";
import { projectsStore } from "../../api/projects";
import { categoriesIndex, tagsIndex } from "../../api/constants";
import { imagesStore } from "../../api/images";
import { ICreateImage, ICreateProject, IProjectsStoreRes } from "../../types";
import { uploadToS3 } from "../../utils/aws";
import { validateFilesize } from "../../utils/helpers";
import { toast } from "react-toastify";
import { toastErrorMessages } from "../../data/constants";
// Redux
import { getAccount, getToken } from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SelectV2 from "../../components/Lib/Select/SelectV2/SelectV2";
import { ICategory, ITag } from "../../api/resTypes";

const Dashboard = () => {
  const projectInitialState: ICreateProject = {
    title: null,
    startPrice: null,
    description: null,
    categoryId: null,
    tagIds: [],
  };
  const firstMount = useRef(true);
  const [categories, setCategories] = useState<ICategory[]>();
  const [tags, setTags] = useState<ITag[]>();
  const [projectPayload, setProjectPayload] = useState(projectInitialState);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const { title, description, startPrice, categoryId } = projectPayload;
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const MAX_FILE_COUNT = 9;
  const navigate = useNavigate();
  // Redux
  const loginUser = useAppSelector(getAccount);
  const { token } = useAppSelector(getToken);

  const loadConstants = async () => {
    const categoriesData: ICategory[] = await categoriesIndex();
    const tagsData: ITag[] = await tagsIndex();
    setCategories(categoriesData);
    setTags(tagsData);
  };
  useEffect(() => {
    if (firstMount.current) {
      loadConstants();
    }
    return () => {
      firstMount.current = false;
    };
  }, []);

  // ZT-NOTE: 创建project的过程步骤要之后做好记录，因为涉及到了s3的上传，以及image入档db的顺序
  const createProject = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!uploadedFiles.length)
        return toast.error(toastErrorMessages.emptyFile);
      if (!token) return toast.error(toastErrorMessages.tokenLost);
      // ZT-NOTE: Validate project payload
      if (!title || !description || !startPrice || !categoryId)
        return toast.error(toastErrorMessages.requiredFields);
      // ZT-NOTE: 注意创建project要有用户权限，所以这之前要检查登录状态
      const projectsStoreRes: IProjectsStoreRes = await projectsStore(
        projectPayload,
        token
      );

      // ZT-NOTE: 多个图片发送多个请求
      const resArray = await uploadToS3(
        uploadedFiles,
        projectsStoreRes.id.toString(),
        "project"
      );
      if (!resArray) return toast.error(toastErrorMessages.uploadIssue);
      // ZT-NOTE: imagePayloadArray here prepared for going into DB
      const imagePayloadArray: ICreateImage[] = resArray.map((res) => {
        return {
          url: res.urlOnS3,
          fileName: res.fileName,
          projectId: projectsStoreRes.id,
        };
      });
      imagePayloadArray.forEach(async (imagePayload) => {
        const imageStoreRes = await imagesStore(imagePayload);
        // console.log(imageStoreRes);
      });
      toast.success("Project created!");
      navigate("/projects");
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
    // console.log(e.target.value);
    // console.log(projectPayload);
  };

  const submitBtnClass = loading
    ? `${styles.btn} formBtn disabled loading`
    : `${styles.btn} formBtn`;

  return (
    <div className={styles.dashboard}>
      <h1>Hello {loginUser.firstName || loginUser.email?.split("@")[0]}</h1>
      <p>Wanna post a new project today?</p>
      <form className={styles.projectForm} onSubmit={createProject}>
        <InputV1
          testId="projectTitle"
          type="text"
          label="Title:"
          name="title"
          placeHolder="Project Title"
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
          name="categoryId"
          defaultValue={1}
          options={categories}
          required={true}
          classes={"width-100"}
          onParentStateChange={onProjectPayloadChange}
        />

        <SelectV2
          testId="tags"
          label="Pick some tags:"
          options={tags}
          classes={"width-100"}
          selectedTagIds={selectedTagIds}
          setSelectedTagIds={setSelectedTagIds}
        />

        <InputV1
          testId="projectPrice"
          type="number"
          label="Starter price:"
          name="startPrice"
          placeHolder="Set a price"
          onParentStateChange={onProjectPayloadChange}
          classes={"width-100"}
          required={true}
        />

        <TextAreaV1
          testId="projectDesc"
          type="text"
          label="Description:"
          name="description"
          rows={6}
          placeHolder="Project Description"
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
