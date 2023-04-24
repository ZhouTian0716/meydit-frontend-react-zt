import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.scss";
import scissors from "../../../src/assets/img/resource/scissors.jpg";
import InputV1 from "../../components/Lib/Inputs/InputV1/InputV1";
import SelectV1 from "../../components/Lib/Select/SelectV1/SelectV1";
import { ICreateAccount } from "../../types";

import { toast } from "react-toastify";

// Redux
import {
  register,
  login,
  getAuthStatus,
  getAuthError,
} from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Roles = [
  { value: "client", label: "Client" },
  { value: "maker", label: "Maker" },
  // { value: "admin", label: "Admin" },
];

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState(Roles[0].value);
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const status = useAppSelector(getAuthStatus);
  const error = useAppSelector(getAuthError);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (status !== "pending") {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [status]);

  useEffect(() => {
    if (error) {
      toast.error("failed to register");
    } 
  }, [error]);

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
    setLoading(true);
    try {
      const authPayload = {
        email,
        password: pwd,
      };
      await dispatch(login(authPayload));

      // toast.success(`Login with ${email}`);
      navigate("/account");
    } catch (err) {
      console.log(err);
      toast.error("failed to loginyy");
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: register payload validation
      if (pwd !== pwdConfirm) {
        toast.error("Password and confirmation do not match");
        return;
      }
      const authPayload: ICreateAccount = {
        email,
        password: pwd,
        password_confirmation: pwdConfirm,
        role,
      };

      dispatch(register(authPayload));

      toast.success(`Account created with ${email}`);
    } catch (err) {
      toast.error("failed to register");
    } finally {
      setLoading(false);
    }
  };

  const submitBtnClass = loading
    ? `${styles.btn} formBtn disabled loading`
    : `${styles.btn} formBtn`;

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
        className={styles.authForm}
        onSubmit={hasAccount ? onLogin : onRegister}
      >
        <InputV1
          testId="email"
          type="email"
          label="Email:"
          placeHolder="address@example.com"
          onParentStateChange={onChangeEmail}
        />
        <InputV1
          testId="pwd"
          type="password"
          label="Password:"
          placeHolder="password"
          onParentStateChange={onChangePwd}
        />
        {!hasAccount && (
          <>
            <InputV1
              testId="pwdConfirm"
              type="password"
              label="Confirm Password:"
              placeHolder="password"
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
        <button type="submit" className={submitBtnClass} disabled={loading}>
          {loading ? "Sending..." : hasAccount ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
