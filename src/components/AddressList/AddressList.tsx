import React, { useState } from "react";
import styles from "./AddressList.module.scss";
import { IAddress } from "../../api/resTypes";
import { FaHome } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getToken,
  removeAddressFromState,
  updatePrimaryAddress,
} from "../../redux/reducers/authSlice";
import { addressDestroy, addressUpdate } from "../../api/addresses";
import { ThreeCircles } from "react-loader-spinner";
import { MdDeleteForever } from "react-icons/md";

interface IProps {
  addresses: IAddress[];
}

const formatAddress = (address: IAddress) => {
  return `${address.number} ${address.route},${address.city}, ${address.zip}, ${address.state}, ${address.country}`;
};

const AddressList = ({ addresses }: IProps) => {
  const { token } = useAppSelector(getToken);
  const dispatch = useAppDispatch();
  const [isChanging, setIsChanging] = useState(false);

  const setPrimary = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    const selectedId = target.dataset.addressId;
    if (!selectedId) return;
    setIsChanging(true);
    try {
      await addressUpdate(selectedId, { isPrimary: true }, token);
      dispatch(updatePrimaryAddress({ selectedId: parseInt(selectedId) }));
    } catch (err) {
      console.log(err);
    } finally {
      setIsChanging(false);
    }
  };

  const deleteSelected = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("what happened");
    const target = e.target as HTMLElement;
    const selectedId = target.dataset.addressId;
    console.log(target.dataset);
    if (!selectedId) return;
    setIsChanging(true);
    try {
      const statusCode = await addressDestroy(selectedId, token);
      dispatch(removeAddressFromState({ selectedId: parseInt(selectedId) }));
    } catch (err) {
      console.log(err);
    } finally {
      setIsChanging(false);
    }
  };

  const content = isChanging ? (
    <ThreeCircles
      height="100px"
      width="100px"
      ariaLabel="three-circles-rotating"
      outerCircleColor="#9b71fe"
      innerCircleColor="#8460c3"
      middleCircleColor="#9b71fe"
    />
  ) : (
    <ul className={styles.list}>
      {addresses.map((address, i) => (
        <li key={address.id}>
          <button
            type="button"
            onClick={setPrimary}
            data-address-id={address.id}
          >
            {formatAddress(address)}
          </button>
          {address.isPrimary && <FaHome color="#8460c3" fontSize={"1.5em"} />}
          <button
            type="button"
            onClick={deleteSelected}
            data-address-id={address.id}
            className={styles.deleteBtn}
          >
            <MdDeleteForever
              fontSize={"1.5em"}
              color="orange"
              pointerEvents="none"
            />
          </button>
        </li>
      ))}
    </ul>
  );

  return content;
};

export default AddressList;