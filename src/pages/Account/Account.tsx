import React from "react";
import styles from "./Account.module.scss";
// Redux
import { getAccount, getToken } from "../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Account = () => {
  // Redux
  const loginUser = useAppSelector(getAccount);
  return (
    <div className={styles.account}>
      <h1>Hello {loginUser.first_name || loginUser.email?.split("@")[0]}</h1>
      <p>Wanna post a new project today?</p>
    </div>
  );
};

export default Account;
