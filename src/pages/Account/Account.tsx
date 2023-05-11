import React, { useState } from "react";
import styles from "./Account.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getAccount } from "../../redux/reducers/authSlice";
import defaultUser from "../../../src/assets/img/defaultUser.png";
import profileDeco from "../../../src/assets/img/decorations/profile.jpg";

const Account = () => {
  // Redux
  const loginUser = useAppSelector(getAccount);
  const { id, firstName, lastName, email, role, profile } = loginUser;

  return (
    <div className={styles.accountPage}>
      <h2>Account settings</h2>
      <p className={styles.colorSecondary}>
        Hi {firstName || email}, customise your account & profile here
      </p>
      <div className={styles.flexRow}>
        <div>
          <h2 className="pb-1">Your profile info in Meydit services</h2>
          <p className={styles.colorSecondary}>
            Personal info and options to manage it. You can make some of this
            info, like your contact details, visible to others so that they can
            reach you easily. You can also see a summary of your profiles.
          </p>
        </div>
        <img
          className={styles.profileDeco}
          src={profileDeco}
          alt="profileDeco"
        />
      </div>

      <div className={styles.section}>
        <h2>Basic info</h2>
        <p className={styles.colorSecondary}>
          Some info may be visible to other people using Meydit services
        </p>
        <div className={styles.inputRow}>
          <span className={styles.labelEl}>Avatar</span>
          <span>An avatar helps personalise your account</span>
          <label className={styles.avatarContainer} htmlFor="setAvatar">
            <img
              className={styles.avatar}
              src={profile?.avatar ? profile.avatar : defaultUser}
              alt="myAvatar"
            />
          </label>
          <input
            type="file"
            id="setAvatar"
            className={styles.fileInputEl}
            accept="image/*"
          />
        </div>
        <div className={styles.inputRow}>
          <label className={styles.labelEl} htmlFor="Name">
            Name
          </label>
          <input
            className={styles.inputEl}
            type="text"
            value={firstName ? firstName : "First Name"}
          />
          <input
            className={styles.inputEl}
            type="text"
            value={lastName ? lastName : "Last Name"}
          />
        </div>
        <div className={styles.inputRow}>
          <span className={styles.labelEl}>Email</span>
          <span className={styles.inputEl}>{email}</span>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Addresses (WIP)</h2>
        <p className={styles.colorSecondary}>
          Save your addresses to make delivery easier
        </p>
        <div>
          <label htmlFor="No.">No.</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="Street">Street</label>
          <input type="text" />
        </div>
      </div>

      <Link to={`/account/${id}/projects`} className="navBtn">Manage my projects</Link>
    </div>
  );
};

export default Account;
