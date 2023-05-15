import React from "react";
import styles from "./BidCard.module.scss";
import { IBid } from "../../api/resTypes";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";

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
              <span className="mr-1">{makerName}</span>
              <span>
                {[...Array(5)].map((e, i) => (
                  <FaStar key={i} color={i < maker.rating ? "#8460c3" : "pink"} />
                ))}
              </span>
            </p>
            <p>
              <span className="mr-1">
                <HiOutlineLocationMarker color="#8460c3" />
                {maker.address}
              </span>
              <small>{createdAt}</small>
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
