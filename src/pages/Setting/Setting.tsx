import React, { useState } from "react";
import styles from "./Setting.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getAccount } from "../../redux/reducers/authSlice";
import defaultUser from "../../../src/assets/img/defaultUser.png";
import profileDeco from "../../../src/assets/img/decorations/profile.jpg";
import ImageUpload from "../../components/Lib/ImageUpload/ImageUpload";
import InputAddress from "../../components/Lib/Inputs/InputAddress/InputAddress";

const Setting = () => {
  // Redux
  const loginUser = useAppSelector(getAccount);
  const { id, firstName, lastName, email, role, profile } = loginUser;

  return (
    <div className={styles.settingPage}>
      <h2>Account settings</h2>
      <p className={styles.colorSecondary}>
        Hi {firstName || email}, customise your account & profile here
      </p>
      <div className={styles.pageHeader}>
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
          <ImageUpload defaultSrc={defaultUser} category="account" />
        </div>
        <div className={styles.inputRow}>
          <label className={styles.labelEl} htmlFor="Name">
            Name
          </label>
          <input
            className={styles.inputEl}
            type="text"
            value={firstName ? firstName : "First Name"}
            onChange={() => {}}
          />
          <input
            className={styles.inputEl}
            type="text"
            value={lastName ? lastName : "Last Name"}
            onChange={() => {}}
          />
        </div>
        <div className={styles.inputRow}>
          <span className={styles.labelEl}>Email</span>
          <span className={styles.inputEl}>{email}</span>
        </div>
        <div className={styles.inputRow}>
          <span className={styles.labelEl}>Biography</span>
          <input
            className={styles.inputEl}
            type="text"
            value={profile.bio ? profile.bio : "A bit about yourself"}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2>Addresses (WIP)</h2>
        <p className={styles.colorSecondary}>
          Save your addresses to make delivery easier
        </p>
        <div>
          <label htmlFor="No.">Type here for auto complete address</label>
          <InputAddress />
        </div>
      </div>

      <Link to={`/account/${id}/projects`} className="navBtn">
        Manage my projects
      </Link>
    </div>
  );
};

export default Setting;
