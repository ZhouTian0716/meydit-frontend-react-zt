import React, { useState } from "react";
import styles from "./Tab.module.scss";

interface IProps {
  id: number;
  name: string;
  selectedTagIds: number[];
  setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function Tab(props: IProps) {
  const { id, name, selectedTagIds, setSelectedTagIds } = props;
  const [active, setActive] = useState(false);
  const tabClass = active ? `${styles.tag} ${styles.active}` : styles.tag;
  const onClick = () => {
    setActive((prev) => !prev);
    const isInSelected = selectedTagIds.includes(id);
    if (isInSelected) {
      setSelectedTagIds((prev) => prev.filter((e) => e !== id));
    } else {
      setSelectedTagIds((prev) => [...prev, id]);
    }
  };
  return (
    <button type="button" className={tabClass} data-tagid={id} onClick={onClick}>
      {name}
    </button>
  );
}

export default Tab;
