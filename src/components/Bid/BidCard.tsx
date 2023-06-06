import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import styles from "./BidCard.module.scss";
import { IBid } from "../../api/resTypes";
import { timeAgo } from "../../utils/formatters";
import { getPrimaryAddress } from "../../utils/helpers";
import defaultUser from "../../assets/img/defaultUser.png";

interface IProps {
  bid: IBid;
}

function BidCard({ bid }: IProps) {
  const { price, comment, createdAt, maker } = bid;
  const { addresses, profile } = maker;
  const makerName = maker.firstName && maker.lastName ? `${maker.firstName} ${maker.lastName}` : maker.email;

  const makerAvatarSrc = profile.avatar ? profile.avatar : defaultUser;
  return (
    <>
      <div className={styles.flexBetween}>
        <div className={styles.flexRow}>
          <div className={styles.avatarContainer}>
            <img src={makerAvatarSrc} alt="maker" className={styles.avatar} />
          </div>
          <div className={styles.flexCol}>
            <p>
              <span className="mr-1 bold">{makerName}</span>
              <span>
                {[...Array(5)].map((e, i) => (
                  // ZT-NOTE:
                  // maker rating to be continued
                  <FaStar key={e} color={i < 4 ? "#8460c3" : "pink"} />
                ))}
              </span>
            </p>

            <p className={styles.smallText}>
              <HiOutlineLocationMarker color="#8460c3" />
              {getPrimaryAddress(addresses)}
            </p>
            <p className={styles.smallText}>{timeAgo(createdAt)}</p>
          </div>
        </div>
        <span className={styles.price}>{price}$</span>
      </div>
      <p className={styles.comment}>{comment}</p>
    </>
  );
}

export default BidCard;
