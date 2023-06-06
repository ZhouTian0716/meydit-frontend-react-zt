import React, { useState, useEffect, useRef } from "react";
import styles from "./Home.module.scss";
import Landing from "../../components/Landing/Landing";
import Slide from "../../components/Slide/Slide";
import { accountsIndex } from "../../api/accounts";
import { IAccount } from "../../api/resTypes";

function Home() {
  const firstMount = useRef(true);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const loadDatas = async () => {
    const accountsData = await accountsIndex();
    setAccounts(accountsData);
  };

  useEffect(() => {
    if (firstMount.current) {
      loadDatas();
    }
    return () => {
      firstMount.current = false;
    };
  }, []);

  return (
    <div className={styles.home}>
      <Landing accounts={accounts} />
      <h2 className={styles.slideTitle}>Top Users</h2>
      <Slide topAccounts={accounts} />
    </div>
  );
}

export default Home;
