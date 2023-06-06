import React, { useEffect, useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import styles from "./InputV1.module.scss";

interface IInputV1 {
  onParentStateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testId: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeHolder?: string;
  defaultValue?: string;
  loading?: boolean;
  classes?: string | string[];
  regex?: RegExp | null;
  errorMsg?: string | null;
}

function InputV1(props: IInputV1) {
  const { testId, label, name, defaultValue, placeHolder, type, required, onParentStateChange, loading = false, classes, regex, errorMsg } = props;

  const [val, setVal] = useState(defaultValue);
  const [error, setError] = useState(false);
  const [pwdHidden, setPwdHidden] = useState(true);
  const [inputType, setInputType] = useState(type);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    if (onParentStateChange) {
      onParentStateChange(e);
    }
  };

  useEffect(() => {
    if (typeof val === "string" && regex) {
      if (val.length && !regex.test(val)) setError(true);
      else setError(false);
    }
  }, [val, regex]);

  if (loading) {
    return <div className={styles.skeleton} />;
  }

  const passwordIconBtn = pwdHidden ? (
    <MdVisibilityOff
      className={styles.pwdIcon}
      onClick={() => {
        setPwdHidden((prev) => !prev);
        setInputType("text");
      }}
    />
  ) : (
    <MdVisibility
      className={styles.pwdIcon}
      onClick={() => {
        setPwdHidden((prev) => !prev);
        setInputType("password");
      }}
    />
  );

  return (
    <div className={[styles.inputContainer, classes].join(" ")}>
      <label className={[styles.label, error ? styles.errorRed : ""].join(" ")} htmlFor={label}>
        {required && <span className={styles.errorRed}>*</span>}
        {label}
      </label>
      {error && <small className={styles.errorMessage}>{errorMsg}</small>}
      <div className={styles.inputWrapper}>
        <input
          className={[styles.input].join(" ")}
          type={inputType}
          value={val}
          id={label}
          name={name}
          onChange={onChange}
          placeholder={placeHolder}
          data-cy={testId}
        />
        {type !== "password" ? null : passwordIconBtn}
      </div>
    </div>
  );
}

export default InputV1;

InputV1.defaultProps = {
  required: false,
  defaultValue: "",
  placeHolder: "",
  type: "text",
  loading: false,
  classes: null,
  regex: null,
  errorMsg: null,
  onParentStateChange: () => {},
};
