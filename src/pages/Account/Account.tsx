import React, { useState, useEffect } from "react";
import { accountShow } from "../../api/accounts";

const Account = () => {
  const [account, setAccount] = useState();
  const fetchAccount = async () => {
    const res = await accountShow("1");
    setAccount(res);
  };
  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div>
      <h1>Hello, {account?.firstName}</h1>
      <h1>here to modify my account & profiles</h1>
      <h1>Page WIP by Joee</h1>
      {}
    </div>
  );
};

export default Account;
