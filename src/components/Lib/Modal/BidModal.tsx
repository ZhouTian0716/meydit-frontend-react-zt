import React, { useState } from "react";
import styles from "./BidModal.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { toggleBidModal } from "../../../redux/reducers/uiSlice";
import {
  AiFillCamera,
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { toast } from "react-toastify";

const BidModal = () => {
  const placeHolderText =
    "Your comment here... (e.g. I can do this project in 3 days)";
  const startPrice = 200;
  const [price, setPrice] = useState<number>(startPrice);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(toggleBidModal());
  };

  const onPriceAdd = () => {
    price ? setPrice((prev) => prev + 10) : setPrice(10);
  };

  const onPriceReduce = () => {
    price > startPrice ? setPrice((prev) => prev - 10) : setPrice(startPrice);
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const newBid = {
      price,
      comment,
    };
    console.log(newBid);
    if (price < startPrice) {
      return toast.error(`Bid price should be at least $${startPrice}`);
    }

    dispatch(toggleBidModal());
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AiFillCloseCircle
          className={`${styles.closeBtn} ${styles.pointer}`}
          onClick={closeModal}
        />
        <h3 className={styles.title}>Set your Bid</h3>
        <div className={styles.priceDiv}>
          <AiFillMinusSquare
            className={`${styles.priceBtn} ${styles.pointer}`}
            style={{ borderRadius: "50%" }}
            onClick={onPriceReduce}
          />
          <div className={styles.priceContainer}>
            {!!price && <span>$</span>}
            <input
              type="number"
              className={styles.priceInput}
              value={price}
              onChange={onPriceChange}
              style={{ width: price ? `${price.toString().length}ch` : "2ch" }}
            />
          </div>
          <AiFillPlusSquare
            className={`${styles.priceBtn} ${styles.pointer}`}
            style={{ borderRadius: "50%" }}
            onClick={onPriceAdd}
          />
        </div>
        <h3 className={styles.title}>Your Comment</h3>
        <textarea
          className={styles.commentArea}
          placeholder={placeHolderText}
          value={comment}
          onChange={onCommentChange}
        />
        <h3 className={styles.title}>Relevant Pictures</h3>
        <div className={styles.flexRow}>
          <div className={styles.uploadArea}>
            <AiFillCamera className="mr-1" />
            <small>Camera</small>
          </div>
          <div className={styles.uploadArea}>
            <BsImageFill />
            <small>Photo Library</small>
          </div>
        </div>
        <button onClick={handleSubmit} className={styles.bidBtn}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default BidModal;
