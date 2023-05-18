import React, { useState, useEffect, useRef } from "react";
import styles from "./Project.module.scss";
import { useParams } from "react-router-dom";
import { IProject } from "../../api/resTypes";
import { projectShow } from "../../api/projects";
import { timeAgo } from "../../utils/formatters";
import LoaderV1 from "../../components/Loader/LoaderV1";
import defaultUser from "../../assets/img/defaultUser.png";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import ProjectCarousel from "../../components/Lib/Carousel/ProjectCarousel";
import BidCard from "../../components/Bid/BidCard";
import { toggleBidModal } from "../../redux/reducers/uiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { getPrimaryAddress } from "../../utils/helpers";

const Project = () => {
  const firstMount = useRef(true);
  const { slug } = useParams();
  const [project, setProject] = useState<IProject | null>(null);

  const dispatch = useAppDispatch();

  const loadProject = async () => {
    if (!slug) return;
    const projectData = await projectShow(slug);
    setProject(projectData);
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

  const clientAvatarSrc = project?.client.profile.avatar
    ? project.client.profile.avatar
    : defaultUser;

  return project ? (
    <div className={styles.projectPage}>
      <h2 className={styles.title}>
        <span>{project.title}</span>
        <span>From {project.startPrice}$</span>
      </h2>
      <div className={`${styles.flexRow} ${styles.alignCenter}`}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatar}
            src={clientAvatarSrc}
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
        {getPrimaryAddress(project.client.addresses)}
      </p>
      <h2 className={styles.title}>Due Date</h2>
      <p className={styles.content}>
        <HiOutlineCalendar color="#8460c3" />
        22 Aug 2023
      </p>
      <h2 className={styles.title}>Description</h2>
      <p className={styles.description}>{project.description}</p>
      <h2 className={styles.textCenter}>Samples</h2>
      <ProjectCarousel images={project.images} />
      {project.tags.length && (
        <>
          <h2 className={styles.title}>Required Skills</h2>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
          </div>
        </>
      )}

      <button
        className={styles.bidBtn}
        onClick={() => dispatch(toggleBidModal())}
      >
        SUBMIT BID
      </button>

      {project.bids.length && (
        <>
          <h2 className={styles.title}>Submitted Bids ({project.bids.length})</h2>
          {project.bids.map((bid) => (
            <BidCard bid={bid} key={bid.id} />
          ))}
        </>
      )}
    </div>
  ) : (
    <LoaderV1 height={"200"} width={"200"} wrapperClass="pageLoader" />
  );
};

export default Project;
