import React, { useState } from "react";
import styles from "./Setting.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAccount,
  getToken,
  updateAccount,
  updateProfile,
} from "../../redux/reducers/authSlice";
import defaultUser from "../../../src/assets/img/defaultUser.png";
import profileDeco from "../../../src/assets/img/decorations/profile.jpg";
import ImageReplace from "../../components/Lib/ImageReplace/ImageReplace";
import AutoAddress from "../../components/Lib/Inputs/AutoAddress/AutoAddress";
import { Roles } from "../../data/constants";
import AddressList from "../../components/AddressList/AddressList";
import { AiFillSave } from "react-icons/ai";
import { ThreeCircles } from "react-loader-spinner";
import { accountUpdate } from "../../api/accounts";
import { profileUpdate } from "../../api/profiles";
import { toast } from "react-toastify";

const Setting = () => {
  // Redux
  const dispatch = useAppDispatch();
  const loginUser = useAppSelector(getAccount);
  const { token } = useAppSelector(getToken);
  const { id, firstName, lastName, email, role, profile, addresses } =
    loginUser;
  const isClient = role.id === Roles.CLIENT;
  const isMaker = role.id === Roles.MAKER;
  const accountInitialState = {
    firstName: firstName,
    lastName: lastName,
  };
  const [account, setAccount] = useState(accountInitialState);
  const [biography, setBiography] = useState(profile.bio);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [accountUpdateLoading, setAccountUpdateLoading] = useState(false);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);

  const onAccountPayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingAccount(true);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const updateAccountNames = async () => {
    setAccountUpdateLoading(true);
    setIsEditingAccount(false);
    try {
      await accountUpdate(id.toString(), account, token);
      dispatch(updateAccount({ ...account }));
    } catch (err: any) {
      err?.response?.data?.map((e: { message: string }) =>
        toast.error(e.message)
      );
    } finally {
      setAccountUpdateLoading(false);
    }
  };

  const onBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditingProfile(true);
    setBiography(e.target.value);
  };

  const updateProfileBio = async () => {
    setProfileUpdateLoading(true);
    setIsEditingProfile(false);
    try {
      await profileUpdate(profile.id, { bio: biography }, token);
      dispatch(updateProfile({ bio: biography }));
    } catch (err) {
      console.log(err);
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  const defaultInputLength = "8ch";

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
          <ImageReplace defaultSrc={defaultUser} category="account" />
        </div>
        <div className={styles.inputRow}>
          <label className={styles.labelEl} htmlFor="Name">
            Name
          </label>
          {accountUpdateLoading ? (
            <ThreeCircles
              height="1.5rem"
              width="1.5rem"
              ariaLabel="three-circles-rotating"
              outerCircleColor="#9b71fe"
              innerCircleColor="#8460c3"
              middleCircleColor="#9b71fe"
            />
          ) : (
            <>
              <input
                className={styles.inputEl}
                type="text"
                name="firstName"
                value={account.firstName ? account.firstName : ""}
                placeholder="First Name"
                style={{
                  width: account.firstName
                    ? `${account.firstName.toString().length + 1}ch`
                    : defaultInputLength,
                }}
                onChange={onAccountPayloadChange}
              />
              <input
                className={styles.inputEl}
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={account.lastName ? account.lastName : ""}
                style={{
                  width: account.lastName
                    ? `${account.lastName.toString().length + 1}ch`
                    : defaultInputLength,
                }}
                onChange={onAccountPayloadChange}
              />
            </>
          )}
          {isEditingAccount && (
            <button onClick={updateAccountNames} className="bg-trans">
              <AiFillSave
                fontSize={"1.5em"}
                color="#8460c3"
                pointerEvents="none"
              />
            </button>
          )}
        </div>
        <div className={styles.inputRow}>
          <span className={styles.labelEl}>Email</span>
          <span>{email}</span>
        </div>
        <div className={styles.inputRow}>
          <span className={styles.labelEl}>Biography</span>
          <div className={styles.positionDiv}>
            {isEditingProfile && (
              <button
                onClick={updateProfileBio}
                className={`${styles.bioSaveBtn} bg-trans`}
              >
                <AiFillSave
                  fontSize={"1.5em"}
                  color="#8460c3"
                  pointerEvents="none"
                />
              </button>
            )}
            {profileUpdateLoading ? (
              <ThreeCircles
                height="100%"
                width="100%"
                ariaLabel="three-circles-rotating"
                outerCircleColor="#9b71fe"
                innerCircleColor="#8460c3"
                middleCircleColor="#9b71fe"
              />
            ) : (
              <textarea
                className={styles.textAreaEl}
                value={biography ? biography : "A bit about yourself"}
                onChange={onBioChange}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <AutoAddress />
        {addresses.length ? <AddressList addresses={addresses} /> : <p>Add your address above</p>}
      </div>

      {isClient && (
        <Link to={`/account/${id}/projects`} className="navBtn">
          Manage my projects
        </Link>
      )}
      {isMaker && (
        <Link to={`/account/${id}/projects`} className="navBtn">
          My demo page
        </Link>
      )}
    </div>
  );
};

export default Setting;
