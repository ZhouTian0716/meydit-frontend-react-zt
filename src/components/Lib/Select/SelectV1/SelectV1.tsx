import React, { useEffect, useState } from "react";
import styles from "./SelectV1.module.scss";

interface IOptionV1 {
  value: string;
  label: string;
}

interface ISelectV1 {
  onParentStateChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  testId?: string;
  label?: string;
  defaultValue?: string ;
  classes?: string | string[];
  options?: IOptionV1[] | null;
}

const SelectV1 = (props: ISelectV1) => {
  const { testId, label, defaultValue, options, onParentStateChange, classes } =
    props;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onParentStateChange) {
      onParentStateChange(e);
    }
  };

  return (
    <div
      className={[
        styles.selectContainer,
        classes,
      ].join(" ")}
    >
      <label htmlFor="accountRole">{label}</label>
      <select name="accountRole" id="accountRole" defaultValue={defaultValue} className={styles.selectContainer} onChange={onChange} data-cy={testId}>
        {options?.map((e) => (
          <option
            key={e.label}
            value={e.value}
          >
            {e.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectV1;

SelectV1.defaultProps = {
  testId: null,
  label: "label for select dropdown",
  required: false,
  defaultValue: "",
  options: null,
  classes: null,
  onParentStateChange: () => {},
};
