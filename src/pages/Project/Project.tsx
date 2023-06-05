import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import styles from "./Project.module.scss";
import { IProjectData } from "../../api/resTypes";
import { projectShow, projectUpdate } from "../../api/projects";
import { timeAgo } from "../../utils/formatters";
import LoaderV1 from "../../components/Loader/LoaderV1";
import defaultUser from "../../assets/img/defaultUser.png";
import ProjectCarousel from "../../components/Lib/Carousel/ProjectCarousel";
import BidCard from "../../components/Bid/BidCard";
import { toggleBidModal } from "../../redux/reducers/uiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getPrimaryAddress } from "../../utils/helpers";
import { getAccount } from "../../redux/reducers/authSlice";
import InputV2 from "../../components/Lib/Inputs/InputV2/InputV2";
import TextAreaV2 from "../../components/Lib/TextArea/TextAreaV2";

function Project() {
  const firstMount = useRef(true);
  const { slug } = useParams();
  // Redux
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector(getAccount);
  const { id: loginUserId } = loginUser;
  // UseStates
  const [project, setProject] = useState<IProjectData | null>(null);
  const { client, title, description, startPrice, tags, bids } = project ?? {};

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
  const clientName = client?.firstName ? `${client.firstName} ${client.lastName}` : client?.email;

  const clientAvatarSrc = client?.profile.avatar ? client.profile.avatar : defaultUser;

  return project ? (
    <div className={styles.projectPage}>
      <h2 className={styles.title}>
        {client?.id === loginUserId ? (
          <>
            <InputV2 name="title" defaultValue={title ?? ""} projectSlug={slug} projectUpdate={projectUpdate} regex={/^.{5,}$/} maxWidth="300px" />
            <span className="flexRow">
              <small>$</small>
              <InputV2 name="startPrice" type="number" defaultValue={startPrice ?? 0} maxWidth="100px" projectSlug={slug} projectUpdate={projectUpdate} />
            </span>
          </>
        ) : (
          <>
            <span>{title}</span>
            <span>
              <small>$</small>
              {startPrice}
            </span>
          </>
        )}
      </h2>
      <div className={`${styles.flexRow} ${styles.alignCenter}`}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={clientAvatarSrc} alt="ownerAvatar" />
        </div>
        <div>
          <span className={styles.clientName}>{clientName}</span>
          <p className={styles.postedDate}>{timeAgo(project.createdAt)}</p>
        </div>
      </div>
      <h2 className={styles.title}>Location</h2>
      <p className={styles.content}>
        <HiOutlineLocationMarker color="#8460c3" />
        {project.client.addresses.length ? getPrimaryAddress(project.client.addresses) : "Client address pending"}
      </p>
      <h2 className={styles.title}>Due Date</h2>
      <p className={styles.content}>
        <HiOutlineCalendar color="#8460c3" />
        22 Aug 2023
      </p>
      <h2 className={styles.title}>Description</h2>
      {client?.id === loginUserId ? (
        <TextAreaV2 name="description" defaultValue={description} projectSlug={slug} projectUpdate={projectUpdate} />
      ) : (
        <p className={styles.description}>{description}</p>
      )}

      <h2 className={styles.textCenter}>Samples</h2>
      <ProjectCarousel images={project.images} clientId={project.client.id} />
      {project.tags.length && (
        <>
          <h2 className={styles.title}>Required Skills</h2>
          <div className={styles.tags}>
            {tags?.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
          </div>
        </>
      )}

      <button className={styles.bidBtn} onClick={() => dispatch(toggleBidModal())}>
        SUBMIT BID
      </button>

      {bids?.length ? (
        <>
          <h2 className={styles.title}>Submitted Bids ({bids.length})</h2>
          {project.bids.map((bid) => (
            <BidCard bid={bid} key={bid.id} />
          ))}
        </>
      ) : (
        <p>Update your project details to attract best bids</p>
      )}
    </div>
  ) : (
    <LoaderV1 height="200" width="200" wrapperClass="pageLoader" />
  );
}

export default Project;
