import React, { useState } from "react";
import styles from "./Auth.module.scss";
import scissors from "../../../src/assets/img/resource/scissors.jpg";
import InputV1 from "../../components/Lib/Inputs/InputV1/InputV1";
import { createAccount } from "../../api/auth";
import SelectV1 from "../../components/Lib/Select/SelectV1/SelectV1";

const Roles = [
  { value: "client", label: "Client" },
  { value: "maker", label: "Maker" },
  // { value: "admin", label: "Admin" },
];

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [pwd, setPwd] = useState<string | null>(null);
  const [role, setRole] = useState<string>(Roles[0].value);
  const [pwdConfirm, setPwdConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };
  const onChangePwdConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdConfirm(e.target.value);
  };
  const onChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const onLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authPayload = {
      email,
      password: pwd,
    };
    console.log(authPayload);
    // const result = await createAccount({ email: "sample", password: "pwd123" });
  };

  const onRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authPayload = {
      email,
      password: pwd,
      password_confirmation: pwdConfirm,
      role,
    };
    console.log(authPayload);
    // const result = await createAccount({ email: "sample", password: "pwd123" });
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Welcome to MEYD.IT</h1>
      <div className={styles.formTitle}>
        <img src={scissors} alt="scissors" className={styles.scissorImg} />
        {hasAccount ? (
          <span className={styles.subTitle}>Login to see our marketplace</span>
        ) : (
          <span className={styles.subTitle}>
            Please fill in the details below to join the Meyd.it family
          </span>
        )}
      </div>
      <form
        action=""
        className={styles.authForm}
        onSubmit={hasAccount ? onLogin : onRegister}
      >
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
        {!hasAccount && (
          <>
            <InputV1
              testId="pwdConfirm"
              type="password"
              label="Confirm Password:"
              onParentStateChange={onChangePwdConfirm}
            />
            <SelectV1
              testId="role"
              label="Register as a:"
              defaultValue={role}
              options={Roles}
              onParentStateChange={onChangeRole}
            />
          </>
        )}
        {hasAccount ? (
          <div className={styles.spaceBtw}>
            <button
              type="button"
              className={styles.formLink}
              onClick={() => setHasAccount((prev) => !prev)}
            >
              Create Account ?
            </button>
            <button
              type="button"
              className={styles.formLink}
              onClick={() => {}}
            >
              Password forgotten ?
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.formLink}
            onClick={() => setHasAccount((prev) => !prev)}
          >
            Sign with existing account ?
          </button>
        )}
        <button
          type="submit"
          className={`${styles.btn} formBtn`}
          disabled={loading}
        >
          {hasAccount ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
