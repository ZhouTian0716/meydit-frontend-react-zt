import React from "react";
import { Link } from "react-router-dom";
import styles from "./SlideCard.module.scss";
import { IAccount } from "../../api/resTypes";
import defaultUser from "../../assets/img/defaultUser.png";

interface IProps {
  account: IAccount;
}

function SlideCard({ account }: IProps) {
  const { id, firstName, email, profile } = account;
  return (
    <Link to={`user/${id}`}>
      <div className={styles.makerCard}>
        <img src={profile.avatar ? profile.avatar : defaultUser} alt="user" className={styles.makerImg} />
        <div className={styles.makerInfo}>
          <p className={styles.makerName}>{firstName || email}</p>
          <p className={styles.makerBio}>{profile.bio}</p>
        </div>
      </div>
    </Link>
  );
}

export default SlideCard;
