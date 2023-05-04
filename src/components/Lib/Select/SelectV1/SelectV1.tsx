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
  name: string;
  required?: boolean;
  multiple?: boolean;
  defaultValue?: string | string[];
  classes?: string | string[];
  options?: IOptionV1[] | null;
}

const SelectV1 = (props: ISelectV1) => {
  const {
    testId,
    label,
    name,
    defaultValue,
    required,
    multiple,
    options,
    onParentStateChange,
    classes,
  } = props;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onParentStateChange) {
      onParentStateChange(e);
    }
  };

  return (
    <div className={[styles.selectContainer, classes].join(" ")}>
      <label htmlFor={name}>
        {required && <span className={styles.errorRed}>*</span>}
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={styles.selectContainer}
        onChange={onChange}
        data-cy={testId}
        multiple={multiple}
        required={required}
      >
        {options?.map((e) => (
          <option key={e.label} value={e.value}>
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
  multiple: false,
  defaultValue: "",
  options: null,
  classes: null,
  onParentStateChange: () => {},
};
