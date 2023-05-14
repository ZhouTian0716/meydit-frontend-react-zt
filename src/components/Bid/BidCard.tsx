import React from "react";
import styles from "./BidCard.module.scss";
import { IBid } from "../../api/resTypes";
import Ratings from "../Lib/Ratings/Ratings";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface IProps {
  bid: IBid;
}

const BidCard = ({ bid }: IProps) => {
  const { id, price, comment, createdAt, maker } = bid;
  const makerName =
    maker.firstName && maker.lastName
      ? `${maker.firstName} ${maker.lastName}`
      : maker.email;
  return (
    <>
      <div className={styles.flexBetween}>
        <div className={styles.flexRow}>
          <div className={styles.avatarContainer}>
            <img src={maker.avatar} alt="ddd" className={styles.avatar} />
          </div>
          <div className={styles.flexCol}>
            <p>
              <span>{makerName}</span>
              <Ratings rate={maker.rating} />
            </p>
            <p>
              <span>
                <HiOutlineLocationMarker color="#8460c3" />
                {maker.address}
              </span>
              <span>{createdAt}</span>
            </p>
          </div>
        </div>
        <span className={styles.price}>{price}$</span>
      </div>
      <p className={styles.comment}>{comment}</p>
    </>
  );
};

export default BidCard;
