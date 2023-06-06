import React, { useState } from "react";
import { AiFillSave } from "react-icons/ai";
import { ThreeCircles } from "react-loader-spinner";
import styles from "./TextAreaV2.module.scss";
import { IUpdateProject } from "../../../api/payloadTypes";
import { IProject } from "../../../api/resTypes";
import { useAppSelector } from "../../../redux/hooks";
import { getToken } from "../../../redux/reducers/authSlice";

interface ITextAreaV2 {
  projectSlug?: string;
  projectUpdate?: (projectSlug: string, data: IUpdateProject, accessToken: string) => Promise<IProject>;
  name: string;
  type?: string;
  rows?: number;
  required?: boolean;
  defaultValue?: string;
}

function TextAreaV2(props: ITextAreaV2) {
  const { token } = useAppSelector(getToken);
  const { name, rows, defaultValue, projectUpdate, projectSlug } = props;

  const [val, setVal] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    setVal(e.target.value);
  };

  const handleSave = async () => {
    setIsEditing(false);
    setLoading(true);
    if (!projectUpdate) return;
    const payload = { [name]: val };
    if (!projectSlug) return;
    await projectUpdate(projectSlug, payload, token);
    setLoading(false);
  };

  const containerClassNames = `${styles.container}`;
  return (
    <div className={containerClassNames}>
      <textarea name={name} className={styles.textArea} rows={rows} autoCorrect="on" spellCheck="false" value={val} onChange={onChange} />
      {isEditing && (
        <button type="button" onClick={handleSave} className={`${styles.btn} bg-trans`}>
          <AiFillSave fontSize="1.5em" color="#8460c3" pointerEvents="none" />
        </button>
      )}
      {loading && (
        <div className={styles.btn}>
          <ThreeCircles
            height="1.5em"
            width="1.5em"
            ariaLabel="three-circles-rotating"
            outerCircleColor="#9b71fe"
            innerCircleColor="#8460c3"
            middleCircleColor="#9b71fe"
          />
        </div>
      )}
    </div>
  );
}

export default TextAreaV2;

TextAreaV2.defaultProps = {
  rows: 5,
  defaultValue: "",
  projectSlug: "",
  projectUpdate: async () => {},
  type: "text",
  required: false,
};
