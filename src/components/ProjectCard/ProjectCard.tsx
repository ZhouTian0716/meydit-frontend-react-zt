import React from "react";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.scss";
import { IProjectCardProps } from "../../types/component";
import defaultImg from "../../assets/img/logo.png";
import { timeAgo } from "../../utils/formatters";
import { getCoverImageSrc } from "../../utils/helpers";

function ProjectCard(props: IProjectCardProps) {
  const { slug, title, images, createdAt, tags, description, category, startPrice } = props;

  const formattedDesc = description ? `${description.slice(0, 230)}...` : "Description pending...";

  return (
    <div className={styles.projectCard}>
      <div className={styles.flexRow}>
        <div className={styles.imgContainer}>
          <img className={styles.coverImg} src={getCoverImageSrc(images, defaultImg)} alt={images[0] ? images[0].fileName : "defaultImg"} />
        </div>
        <div>
          <div className={`${styles.flexRow} ${styles.alignCenter}`}>
            <img className={styles.categoryIcon} src={category.url} alt={category.name} />
            <div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.postedDate}>{`Posted ${timeAgo(createdAt)}`}</p>
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
        <Link to={`/projects/${slug}`}>
          <span className={styles.projectLink}>More →</span>
        </Link>
      </p>
      <div className={styles.footer}>
        <span className={styles.footerOptions}>
          <AiOutlineAppstore fontSize="18px" />
          <small>7 Submissions</small>
        </span>
        <span className={styles.footerOptions}>
          <RiArrowUpDownLine fontSize="18px" />
          <small>450$ Average Bid</small>
        </span>
        <span className={styles.footerOptions}>
          <BsCurrencyDollar fontSize="18px" />
          <small>{startPrice} Starter</small>
        </span>
      </div>
    </div>
  );
}

export default ProjectCard;
