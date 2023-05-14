import React, { useState, useEffect, useRef } from "react";
import styles from "./Project.module.scss";
import { useParams } from "react-router-dom";
import { IProfile, IProject } from "../../api/resTypes";
import { projectShow } from "../../api/projects";
import { profileShow } from "../../api/profiles";
import { timeAgo } from "../../utils/formatters";
import LoaderV1 from "../../components/Loader/LoaderV1";
import defaultUser from "../../../src/assets/img/defaultUser.png";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

const Project = () => {
  const firstMount = useRef(true);
  const { slug } = useParams();
  const [project, setProject] = useState<IProject | null>(null);
  const [ownerProfile, setOwnerProfile] = useState<IProfile | null>(null);

  const loadProject = async () => {
    if (!slug) return;
    const projectData: IProject = await projectShow(slug);
    setProject(projectData);
    const ownerProfileData: IProfile = await profileShow(
      projectData.client.id.toString()
    );
    setOwnerProfile(ownerProfileData);
  };

  useEffect(() => {
    firstMount.current && loadProject();
    return () => {
      firstMount.current = false;
    };
  }, []);

  // Display related:
  const clientName = project?.client.firstName
    ? `${project.client.firstName} ${project.client.lastName}`
    : project?.client.email;

  return project && ownerProfile ? (
    <div className={styles.projectPage}>
      <h2 className={styles.title}>Posted by</h2>
      <div className={`${styles.flexRow} ${styles.alignCenter}`}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatar}
            src={ownerProfile.avatar ? ownerProfile.avatar : defaultUser}
            alt={"ownerAvatar"}
          />
        </div>
        <div>
          <span className={styles.clientName}>{clientName}</span>
          <p className={styles.postedDate}>{timeAgo(project.createdAt)}</p>
        </div>
      </div>
      <h2 className={styles.title}>Location</h2>
      <p className={styles.content}>
        <HiOutlineLocationMarker color="#8460c3" />
        Double Bay, NSW , Sydney
      </p>
      <h2 className={styles.title}>Due Date</h2>
      <p className={styles.content}>
        <HiOutlineCalendar color="#8460c3" />
        22 Aug 2023
      </p>
      <h2 className={styles.title}>Description</h2>
      <p className={styles.description}>{project.description}</p>
      <h2 className={styles.textCenter}>Samples</h2>
    </div>
  ) : (
    <LoaderV1 height={"200"} width={"200"} wrapperClass="pageLoader" />
  );
};

export default Project;
