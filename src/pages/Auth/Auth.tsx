import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Auth.module.scss";
import scissors from "../../assets/img/resource/scissors.jpg";
import InputV1 from "../../components/Lib/Inputs/InputV1/InputV1";
import SelectV1 from "../../components/Lib/Select/SelectV1/SelectV1";
import { IAdonisValidationError, ICreateAccount } from "../../types";
import { rolesIndex } from "../../api/constants";

// API call
import { loginApi, registerApi } from "../../api/auth";

// Redux
import { logUserIn } from "../../redux/reducers/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { IRole } from "../../api/resTypes";

function Auth() {
  const firstMount = useRef(true);
  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [roles, setRoles] = useState<IRole[]>([]);
  const [roleId, setRoleId] = useState(1);
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loadRoles = async () => {
    const rolesData: IRole[] = await rolesIndex();
    const allowedRoles = rolesData.filter((role) => role.name === "Maker" || role.name === "Client");
    setRoles(allowedRoles);
  };

  useEffect(() => {
    if (firstMount.current) loadRoles();
    return () => {
      firstMount.current = false;
    };
  }, []);

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
    setRoleId(parseInt(e.target.value));
  };

  const onLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const authPayload = {
        email,
        password: pwd,
      };

      const res = await loginApi(authPayload);
      const { id, role, profile, firstName, lastName, addresses } = res.account;
      const actionPayload = {
        account: {
          id,
          email: res.account.email,
          firstName,
          lastName,
          role: {
            id: role.id,
            name: role.name,
          },
          profile: {
            id: profile.id,
            avatar: profile.avatar,
            bio: profile.bio,
          },
          addresses,
        },
        token: res.token,
      };
      // console.log("checking", actionPayload);
      dispatch(logUserIn(actionPayload));
      const from = location.state?.from?.pathname || `/settings/${id}`;
      navigate(from, { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message;
      toast.error(errorMsg);
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
        roleId,
      };

      const res = await registerApi(authPayload);
      toast.success(`Account registed with ${res.email}`);
      setHasAccount(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err);
      const errors = err.response?.data?.map((error: IAdonisValidationError) => error.message);
      errors.forEach((error: string) => toast.error(error));
    } finally {
      setLoading(false);
    }
  };

  const submitBtnClass = loading ? `${styles.btn} formBtn disabled loading` : `${styles.btn} formBtn`;

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>Welcome to MEYD.IT</h1>
      <div className={styles.formTitle}>
        <img src={scissors} alt="scissors" className={styles.scissorImg} />
        {hasAccount ? (
          <span className={styles.subTitle}>Login to see our marketplace</span>
        ) : (
          <span className={styles.subTitle}>Please fill in the details below to join the Meyd.it family</span>
        )}
      </div>
      <form className={styles.authForm} onSubmit={hasAccount ? onLogin : onRegister}>
        <InputV1 testId="email" type="email" label="Email:" name="email" placeHolder="address@example.com" onParentStateChange={onChangeEmail} required />
        {!hasAccount ? (
          <InputV1
            testId="pwd"
            type="password"
            label="Password:"
            name="password"
            placeHolder="password"
            onParentStateChange={onChangePwd}
            required
            regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/}
            errorMsg="8-20 characters, 1 uppercase, 1 lowercase, 1 special char"
          />
        ) : (
          <InputV1 testId="pwd" type="password" label="Password:" name="password" placeHolder="password" onParentStateChange={onChangePwd} required />
        )}

        {!hasAccount && (
          <>
            <InputV1
              testId="pwdConfirm"
              type="password"
              label="Confirm Password:"
              name="passwordConfirm"
              placeHolder="password"
              onParentStateChange={onChangePwdConfirm}
              required
            />
            <SelectV1
              testId="role"
              label="Register as a:"
              name="role"
              initialValueFromParent={roleId}
              options={roles}
              onParentStateChange={onChangeRole}
              required
            />
          </>
        )}
        {hasAccount ? (
          <div className={styles.spaceBtw}>
            <button type="button" className={styles.formLink} onClick={() => setHasAccount((prev) => !prev)}>
              Create Account ?
            </button>
            <button type="button" className={styles.formLink} onClick={() => {}}>
              Password forgotten ?
            </button>
          </div>
        ) : (
          <button type="button" className={styles.formLink} onClick={() => setHasAccount((prev) => !prev)}>
            Sign with existing account ?
          </button>
        )}
        <button type="submit" className={submitBtnClass} disabled={loading}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {loading ? "Sending..." : hasAccount ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Auth;
