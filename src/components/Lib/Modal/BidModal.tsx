import React, { useState } from "react";
import { AiFillCamera, AiFillMinusSquare, AiFillPlusSquare, AiFillCloseCircle } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { toast } from "react-toastify";
import styles from "./BidModal.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { toggleBidModal } from "../../../redux/reducers/uiSlice";

function BidModal() {
  const placeHolderText = "Your comment here... (e.g. I can do this project in 3 days)";
  const startPrice = 200;
  const [price, setPrice] = useState<number>(startPrice);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(toggleBidModal());
  };

  const onPriceAdd = () => {
    setPrice((prev) => prev + 10);
  };

  const onPriceReduce = () => {
    setPrice((prev) => prev - 10);
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newBid = {
      price,
      comment,
    };
    // eslint-disable-next-line no-console
    console.log(newBid);
    if (price < startPrice) {
      toast.error(`Bid price should be at least $${startPrice}`);
      return;
    }
    dispatch(toggleBidModal());
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <AiFillCloseCircle className={`${styles.closeBtn} ${styles.pointer}`} onClick={closeModal} />
        <h3 className={styles.title}>Set your Bid</h3>
        <div className={styles.priceDiv}>
          <AiFillMinusSquare className={`${styles.priceBtn} ${styles.pointer}`} style={{ borderRadius: "50%" }} onClick={onPriceReduce} />
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
          <AiFillPlusSquare className={`${styles.priceBtn} ${styles.pointer}`} style={{ borderRadius: "50%" }} onClick={onPriceAdd} />
        </div>
        <h3 className={styles.title}>Your Comment</h3>
        <textarea className={styles.commentArea} placeholder={placeHolderText} value={comment} onChange={onCommentChange} />
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
        <button type="submit" className={styles.bidBtn}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default BidModal;
