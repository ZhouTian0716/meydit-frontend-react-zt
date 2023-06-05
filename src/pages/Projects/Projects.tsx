import React, { useEffect, useState } from "react";
import styles from "./Projects.module.scss";
import { projectsIndex } from "../../api/projects";
import { IProjectCardProps } from "../../types/component";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    const res = await projectsIndex();
    setProjects(res.data);
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className={styles.projects}>
      <h2 className={styles.pageTitle}>Projects Hub</h2>
      <div className={styles.projectsGrid}>
        {projects.map((project: IProjectCardProps) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
