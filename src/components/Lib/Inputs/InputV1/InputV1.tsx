import React, { useEffect, useState } from "react";
import { MdOutlineVisibility, MdVisibility } from "react-icons/md";
import styles from "./InputV1.module.scss";

interface IInputV1 {
  onParentStateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testId: string;
  label: string;
  type?: string;
  required?: boolean;
  placeHolder?: string;
  loading?: boolean;
  classes?: string | string[];
}

const InputV1 = (props: IInputV1) => {
  const {
    testId,
    label,
    placeHolder,
    type,
    required,
    onParentStateChange,
    loading = false,
    classes,
  } = props;

  const [val, setVal] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [pwdHidden, setPwdHidden] = useState(true);

  

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    if (onParentStateChange) {
      onParentStateChange(e);
    }
  };

  if (loading) {
    return <div className={styles.skeleton} />;
  }

  const passwordIconBtn = pwdHidden ? (
    <MdOutlineVisibility
      onClick={() => {
        setPwdHidden((prev) => !prev);
      }}
    />
  ) : (
    <MdVisibility
      onClick={() => {
        setPwdHidden((prev) => !prev);
      }}
    />
  );

  return (
    <div
      className={[
        "relative",
        styles.inputContainer,
        error ? styles.borderRed : "",
        classes,
      ].join(" ")}
    >
      <label
        className={[
          styles.label,
          error ? styles.errorRed : "",
        ].join(" ")}
        htmlFor={testId}
      >
        {label}
        {required ? <span className={styles.errorRed}>*</span> : ""}
      </label>
      <div className={styles.xxx}>
        <input
          className={[styles.input].join(" ")}
          type={type}
          value={val}
          name={testId}
          onChange={onChange}
          placeholder={placeHolder}
          data-cy={testId}
        />
        {type !== "password" ? null : passwordIconBtn}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default InputV1;

InputV1.defaultProps = {
  required: false,
  placeHolder: "",
  type: "text",
  loading: false,
  classes: null,
  onParentStateChange: () => {},
};
