/* eslint-disable react/no-unused-prop-types */
import React from "react";
import styles from "./SelectV2.module.scss";
import Tab from "./Tab";

interface IOptionV1 {
  id: number;
  name: string;
}

interface ISelectV2 {
  onParentStateChange?: (selectedTagIds: number[]) => void;
  testId?: string;
  label?: string;
  required?: boolean;
  classes?: string | string[];
  options?: IOptionV1[] | null;
  selectedTagIds: number[];
  setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function SelectV2(props: ISelectV2) {
  const { testId, label, required, options, selectedTagIds, setSelectedTagIds, classes } = props;

  return (
    <div className={[styles.selectContainer, classes].join(" ")}>
      <p>
        {required && <span className={styles.errorRed}>*</span>}
        {label}
      </p>
      <div className={styles.tagsBox} data-cy={testId}>
        {options?.map((e) => (
          <Tab key={e.id} id={e.id} name={e.name} selectedTagIds={selectedTagIds} setSelectedTagIds={setSelectedTagIds} />
        ))}
      </div>
    </div>
  );
}

export default SelectV2;

SelectV2.defaultProps = {
  testId: null,
  label: "label for select dropdown",
  options: null,
  required: false,
  classes: null,
  onParentStateChange: () => {},
};
