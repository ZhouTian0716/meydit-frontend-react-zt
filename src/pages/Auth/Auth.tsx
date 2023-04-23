import React, { useState } from "react";
import styles from "./Auth.module.scss";
import scissors from "../../../src/assets/img/resource/scissors.jpg";
import InputV1 from "../../components/Lib/Inputs/InputV1/InputV1";
import { createAccount } from "../../api/register/register";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [pwd, setPwd] = useState<string | null>(null);
  const [pwdConfirm, setPwdConfirm] = useState<string | null>(null);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };
  const onChangePwdConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdConfirm(e.target.value);
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createAccount({ email: "sample", password: "pwd123" });

    console.log(result.data);
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Welcome to MEYD.IT</h1>
      <div>
        <img src={scissors} alt="scissors" className={styles.iconImg} />
        {hasAccount ? (
          <span className={styles.subTitle}>Login to see our marketplace</span>
        ) : (
          <span className={styles.subTitle}>
            Please fill in the details below to join the Meyd.it family
          </span>
        )}
      </div>
      <form action="" className={styles.authForm} onSubmit={onSubmit}>
        <InputV1
          testId="email"
          type="email"
          label="Email:"
          onParentStateChange={onChangeEmail}
        />
        <InputV1
          testId="pwd"
          type="password"
          label="Password:"
          onParentStateChange={onChangePwd}
        />
        <InputV1
          testId="pwdConfirm"
          type="password"
          label="Confirm Password:"
          onParentStateChange={onChangePwdConfirm}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Auth;
