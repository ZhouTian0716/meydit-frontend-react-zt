import React, { useEffect, useState, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./InputV2.module.scss";
import { IUpdateProject } from "../../../../api/payloadTypes";
import { getToken } from "../../../../redux/reducers/authSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { IProject } from "../../../../api/resTypes";

interface IInputV2 {
  projectSlug?: string;
  projectUpdate?: (projectSlug: string, data: IUpdateProject, accessToken: string) => Promise<IProject>;
  testId?: string;
  name: string;
  type?: string;
  maxWidth?: string;
  required?: boolean;
  placeHolder?: string;
  defaultValue: string | number;
  regex?: RegExp | null;
  classes?: string | string[];
}

function InputV2(props: IInputV2) {
  const { token } = useAppSelector(getToken);
  const { testId, name, defaultValue, placeHolder, type, projectUpdate, projectSlug, maxWidth, regex } = props;

  const syncVal = useRef(defaultValue);
  const [val, setVal] = useState(syncVal.current);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleBlur = () => {
    if (active) {
      // Only reset the value if the input was active and the value has changed
      setVal(syncVal.current);
      setActive(false);
    }
  };

  const sendRequest = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setActive(false);
      if (!projectUpdate) return;
      const payload = { [name]: val };
      setLoading(true);
      if (!projectSlug) return;
      const res = await projectUpdate(projectSlug, payload, token);
      // console.log(res);
      syncVal.current = res[name];
      setLoading(false);
    }
  };

  useEffect(() => {
    if (regex && typeof val === "string") {
      if (!regex.test(val)) setError(true);
    } else setError(false);
  }, [val, regex]);

  const activeClassName = active && styles.inputActive;

  const errorClassName = error && styles.inputError;

  const responsiveWidth = typeof val === "string" ? `${val.length}ch` : `${val.toString().length}ch`;

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <RotatingLines strokeColor="#8460c3" strokeWidth="5" animationDuration="1" width="1em" visible />
      ) : (
        <input
          className={`${styles.input} ${activeClassName} ${errorClassName}`}
          type={type}
          name={name}
          placeholder={placeHolder}
          value={val}
          onChange={onChange}
          onFocus={() => setActive(true)}
          onBlur={handleBlur}
          onKeyDown={sendRequest}
          style={{
            width: responsiveWidth,
            maxWidth,
            minWidth: "4ch",
          }}
          data-cy={testId}
        />
      )}
    </div>
  );
}

export default InputV2;

InputV2.defaultProps = {
  required: false,
  placeHolder: "place holder",
  type: "text",
  testId: "testId",
  projectSlug: "",
  projectUpdate: async () => {},
  regex: null,
  maxWidth: "200px",
  classes: [],
};
