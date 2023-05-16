import React from "react";
import styles from "./Messages.module.scss";
import MapFeature from "../../components/GoogleMap/MapFeature";

const Messages = () => {
  return (
    <div className={styles.add}>
      <MapFeature />
    </div>
  );
};

export default Messages;
