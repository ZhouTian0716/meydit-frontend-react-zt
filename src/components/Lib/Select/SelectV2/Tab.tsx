import React, { useState } from "react";
import styles from "./Tab.module.scss";

interface IProps {
  id: number;
  name: string;
  selectedTagIds: number[];
  setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const Tab = (props: IProps) => {
  const { id, name, selectedTagIds, setSelectedTagIds } = props;
  const [active, setActive] = useState(false);
  let tabClass = active ? `${styles.tag} ${styles.active}` : styles.tag;
  const onClick = () => {
    setActive((prev) => !prev);
    let isInSelected = selectedTagIds.includes(id);
    isInSelected
      ? setSelectedTagIds((prev) => prev.filter((e) => e !== id))
      : setSelectedTagIds((prev) => [...prev, id]);
  };
  return (
    <small className={tabClass} data-tagid={id} onClick={onClick}>
      {name}
    </small>
  );
};

export default Tab;
