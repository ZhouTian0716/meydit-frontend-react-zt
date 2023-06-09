import React, { useState, useRef, useEffect, useCallback } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { AiFillSave, AiOutlineClear } from "react-icons/ai";
import { ThreeCircles } from "react-loader-spinner";
import { apiKey, geocodeJson, initMapScript, IAutoAddress, extractAddress } from "../../../../utils/gmap";
import styles from "./AutoAddress.module.scss";
import { isAddressEmpty } from "../../../../utils/helpers";
import { addressStore } from "../../../../api/addresses";
import { addAddressToState, getToken } from "../../../../redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

function AutoAddress() {
  const addressInitialState: IAutoAddress = {
    number: "",
    route: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };
  const firstMount = useRef(true);
  const searchInputRef = useRef(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [address, setAddress] = useState(addressInitialState);
  const [isStoring, setIsStoring] = useState(false);
  const { token } = useAppSelector(getToken);
  const dispatch = useAppDispatch();
  const { number, route, city, state, zip, country } = address;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  const onAddressPayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // do something on address change
  const onChangeAddress = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(extractAddress(place));
  }, []);

  // init autocomplete
  const initAutocomplete = useCallback(() => {
    if (!searchInputRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () => {
      onChangeAddress(autocomplete);
    });
  }, [onChangeAddress, searchInputRef]);

  const reverseGeocode = ({ latitude, longitude }: GeolocationCoordinates) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${latitude},${longitude}`;
    setSearchAddress("Getting your location...");
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
        const _address = extractAddress(place);
        // console.log(_address);
        setAddress(_address);
        // console.log(address);
        setSearchAddress(_address.plain());
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // load map script after mounted
  useEffect(() => {
    if (firstMount.current) {
      initMapScript().then(() => {
        initAutocomplete();
      });
    }
    return () => {
      firstMount.current = false;
    };
  }, [initAutocomplete]);

  const onSaveAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAddressEmpty(address)) return;
    setIsStoring(true);
    try {
      const addressPayload = { ...address, isPrimary: false };
      const res = await addressStore(addressPayload, token);
      dispatch(addAddressToState(res));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setIsStoring(false);
      setAddress(addressInitialState);
    }
  };

  const defaultInputLength = "8ch";

  return (
    <form onSubmit={onSaveAddress}>
      {isStoring ? (
        <button className={styles.saveBtn} type="button">
          <ThreeCircles
            height="1rem"
            width="1rem"
            ariaLabel="three-circles-rotating"
            outerCircleColor="#9b71fe"
            innerCircleColor="#8460c3"
            middleCircleColor="#9b71fe"
          />
        </button>
      ) : (
        <button className={styles.saveBtn} type="submit">
          <AiFillSave />
        </button>
      )}

      <h2>Addresses</h2>
      <div className={styles.searchInputBox}>
        <BiCurrentLocation className={styles.flexEnd} onClick={() => findMyLocation()} />
        <input
          ref={searchInputRef}
          type="text"
          value={searchAddress}
          placeholder="Search your address..."
          className={styles.searchInput}
          onChange={onSearchChange}
          autoComplete="off"
        />
        <AiOutlineClear
          className={styles.flexEnd}
          onClick={() => {
            setSearchAddress("");
            setAddress(addressInitialState);
          }}
        />
      </div>
      <div className={styles.addressGrid}>
        <div className={`${styles.addressGrid__item} `}>
          <label htmlFor="number" className={styles.addressGrid__item__label}>
            No:
          </label>
          <input
            type="text"
            id="number"
            name="number"
            autoComplete="off"
            className={styles.addressGrid__item__input}
            style={{
              width: number ? `${number.toString().length + 1}ch` : defaultInputLength,
            }}
            value={number}
            onChange={onAddressPayloadChange}
          />
        </div>
        <div className={styles.addressGrid__item}>
          <label htmlFor="street" className={styles.addressGrid__item__label}>
            Street:
          </label>
          <input
            type="text"
            id="street"
            name="route"
            className={styles.addressGrid__item__input}
            style={{
              width: route ? `${route.toString().length}ch` : defaultInputLength,
            }}
            value={route}
            onChange={onAddressPayloadChange}
          />
        </div>
        <div className={styles.addressGrid__item}>
          <label htmlFor="street" className={styles.addressGrid__item__label}>
            City/Sub:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className={styles.addressGrid__item__input}
            style={{
              width: city ? `${city.toString().length}ch` : defaultInputLength,
            }}
            value={city}
            onChange={onAddressPayloadChange}
          />
        </div>
        <div className={styles.addressGrid__item}>
          <label htmlFor="state" className={styles.addressGrid__item__label}>
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className={styles.addressGrid__item__input}
            style={{
              width: state ? `${state.toString().length + 2}ch` : defaultInputLength,
            }}
            value={state}
            onChange={onAddressPayloadChange}
          />
        </div>
        <div className={styles.addressGrid__item}>
          <label htmlFor="zip" className={styles.addressGrid__item__label}>
            ZIP:
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            className={styles.addressGrid__item__input}
            style={{
              width: zip ? `${zip.toString().length}ch` : defaultInputLength,
            }}
            value={zip}
            onChange={onAddressPayloadChange}
          />
        </div>
        <div className={styles.addressGrid__item}>
          <label htmlFor="country" className={styles.addressGrid__item__label}>
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className={styles.addressGrid__item__input}
            style={{
              width: country ? `${country.toString().length + 2}ch` : defaultInputLength,
            }}
            value={country}
            onChange={onAddressPayloadChange}
          />
        </div>
      </div>
    </form>
  );
}

export default AutoAddress;
