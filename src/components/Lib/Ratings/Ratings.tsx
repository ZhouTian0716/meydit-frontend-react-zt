import React from "react";
import { FaStar } from "react-icons/fa";

// comback later, modal rating
interface IProps {
  rate: number;
}

const Ratings = ({ rate }: IProps) => {
  return (
    <span>
      {[...Array(5)].map((e, i) => (
        <FaStar color={i < rate ? "#8460c3" : "pink"} />
      ))}
    </span>
  );
};

export default Ratings;
