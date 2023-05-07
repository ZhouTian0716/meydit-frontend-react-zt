import React, { useEffect, useState, useRef } from "react";
import styles from "./Projects.module.scss";
import { projectsIndex } from "../../api/projects";
import { IProjectCardProps } from "../../types/component";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const Projects = () => {
  let firstRender = useRef(true);
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    const res = await projectsIndex();
    setProjects(res.data);
  };
  useEffect(() => {
    firstRender.current && fetchProjects();
    return () => {
      firstRender.current = false;
    };
  }, []);

  return (
    <div className={styles.projects}>
      <h2 className={styles.pageTitle}>Check our projects</h2>
      <div className={styles.projectsGrid}>
        {projects.map((project: IProjectCardProps) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
