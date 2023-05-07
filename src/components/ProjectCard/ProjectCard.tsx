import React from "react";
import styles from "./ProjectCard.module.scss";
import { IProjectCardProps } from "../../types/component";
import defaultImg from "../../../src/assets/img/logo.png";
import { timeAgo } from "../../utils/formatters";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import { Link } from "react-router-dom";

const testDescription = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
sequi fugiat aliquam veniam vitae quam a culpa omnis porro sunt! Itaque
tempore ea minus harum dignissimos animi autem inventore repellendus
voluptate, possimus eligendi, ipsum obcaecati dicta illo saepe nihil
dolores maiores vitae unde expedita distinctio ab! Distinctio aspernatur
id autem!`;

const ProjectCard = (props: IProjectCardProps) => {
  const { id, title, images, createdAt, tags, description, category } = props;

  const formattedDesc = testDescription
    ? `${testDescription.slice(0, 230)}...`
    : "Description pending...";

  return (
    <div className={styles.projectCard}>
      <div className={styles.flexRow}>
        <div className={styles.imgContainer}>
          <img
            className={styles.coverImg}
            src={images[0] ? images[0].url : defaultImg}
            alt={images[0] ? images[0].fileName : "defaultImg"}
          />
        </div>
        <div>
          <div className={`${styles.flexRow} ${styles.alignCenter}`}>
            <img
              className={styles.categoryIcon}
              src={`/src/assets/img/category/${category}.png`}
              alt={category}
            />
            <div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.postedDate}>{`Posted ${timeAgo(
                createdAt
              )}`}</p>
            </div>
          </div>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span className={`tagBtn ${styles.tag}`} key={tag.id}>
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* <p>{description}</p> */}
      <p className={styles.description}>
        {formattedDesc}{" "}
        <Link to={`/projects/${id}`}>
          <span className={styles.projectLink}>More →</span>
        </Link>
      </p>
      <div className={styles.footer}>
        <span className={styles.footerOptions}>
          <AiOutlineAppstore fontSize={"18px"} />
          <small>7 Submissions</small>
        </span>
        <span className={styles.footerOptions}>
          <RiArrowUpDownLine fontSize={"18px"} />
          <small>450$ Average Bid</small>
        </span>
        <span className={styles.footerOptions}>
          <BsCurrencyDollar fontSize={"18px"} />
          <small>Upfront Payment</small>
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
