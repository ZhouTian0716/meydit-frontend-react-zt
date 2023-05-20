import React, { useEffect, useState, useRef } from "react";
import styles from "./ClientProjects.module.scss";
import { useParams } from "react-router-dom";
import { projectsByAccount } from "../../api/projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { IProjectCardProps } from "../../types/component";

const ClientProjects = () => {
  const firstMount = useRef(true);
  const { accountId } = useParams();
  const [projects, setProjects] = useState([]);
  // console.log(projects);
  const fetchProjects = async () => {
    if (!accountId) return;
    const res = await projectsByAccount(accountId);
    setProjects(res.data);
  };
  useEffect(() => {
    firstMount.current && fetchProjects();
    return () => {
      firstMount.current = false;
    };
  }, []);
  return (
    <div className={styles.projects}>
      <h2 className={styles.pageTitle}>Projects created by {}</h2>
      <div className={styles.projectsGrid}>
        {projects && projects.map((project: IProjectCardProps) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ClientProjects;
