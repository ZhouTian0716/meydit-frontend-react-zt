/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./TextAreaV1.module.scss";

interface ITextAreaV1 {
  onParentStateChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  testId: string;
  label: string;
  name: string;
  type?: string;
  rows?: number;
  required?: boolean;
  placeHolder?: string | undefined;
  defaultValue?: string | undefined;
  loading?: boolean;
  classes?: string | string[];
}

function TextAreaV1(props: ITextAreaV1) {
  const { testId, label, name, rows, placeHolder, defaultValue, type, required, onParentStateChange, loading, classes } = props;

  const [val, setVal] = useState<string>();
  const [error, setError] = useState<null | string>(null);
  const [inputType, setInputType] = useState(type);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value);
    if (onParentStateChange) {
      onParentStateChange(e);
    }
  };
  return (
    <div className={[styles.inputContainer, error ? styles.borderRed : "", classes].join(" ")}>
      <label className={[styles.label, error ? styles.errorRed : ""].join(" ")} htmlFor={name}>
        {required && <span className={styles.errorRed}>*</span>}
        {label}
      </label>
      <textarea
        name={name}
        id={label}
        className={styles.textArea}
        rows={rows}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        required={required}
        autoCorrect="on"
        spellCheck="false"
        value={val}
        onChange={onChange}
      />
    </div>
  );
}

export default TextAreaV1;

TextAreaV1.defaultProps = {
  required: false,
  rows: 5,
  placeHolder: undefined,
  defaultValue: undefined,
  type: "text",
  loading: false,
  classes: null,
  onParentStateChange: () => {},
};
