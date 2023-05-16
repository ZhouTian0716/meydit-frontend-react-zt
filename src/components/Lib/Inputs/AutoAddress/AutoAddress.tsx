import React, { useState, useRef, useEffect } from "react";
import styles from "./AutoAddress.module.scss";
import { TbMapSearch } from "react-icons/tb";
import { BiCurrentLocation } from "react-icons/bi";
import {
  apiKey,
  geocodeJson,
  initMapScript,
  IAutoAddress,
  extractAddress,
} from "../../../../utils/gmap";
import { AiFillSave } from "react-icons/ai";

const AutoAddress = () => {
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
  const { number, route, city, state, zip, country } = address;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  const onAddressPayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // do something on address change
  const onChangeAddress = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    // console.log("place", place);
    setAddress(extractAddress(place));
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInputRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInputRef.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () => {
      onChangeAddress(autocomplete);
    });
  };

  const reverseGeocode = ({ latitude, longitude }: GeolocationCoordinates) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${latitude},${longitude}`;
    setSearchAddress("Getting your location...");
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        // console.log(_address);
        setAddress(_address);
        // console.log(address);
        setSearchAddress(_address.plain());
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          reverseGeocode(position.coords);
        }
      );
    }
  };

  // load map script after mounted
  useEffect(() => {
    firstMount.current &&
      initMapScript().then(() => {
        initAutocomplete();
      });
    return () => {
      firstMount.current = false;
    };
  }, []);

  const onSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(address);
  };

  const defaultInputLength = "8ch";

  return (
    <form onSubmit={onSaveAddress}>
      <button className={styles.saveBtn} type="submit">
        <AiFillSave />
      </button>
      <h2>Addresses</h2>
      <div className={styles.searchInputBox}>
        <TbMapSearch />
        <input
          ref={searchInputRef}
          type="text"
          value={searchAddress}
          placeholder="Search your address..."
          className={styles.searchInput}
          onChange={onSearchChange}
          autoComplete={"off"}
        />
        <BiCurrentLocation
          className={styles.flexEnd}
          onClick={() => findMyLocation()}
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
              width: number
                ? `${number.toString().length + 1}ch`
                : defaultInputLength,
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
              width: route
                ? `${route.toString().length}ch`
                : defaultInputLength,
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
              width: city
                ? `${city.toString().length}ch`
                : defaultInputLength,
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
              width: state
                ? `${state.toString().length + 3}ch`
                : defaultInputLength,
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
              width: zip
                ? `${zip.toString().length}ch`
                : defaultInputLength,
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
              width: country
                ? `${country.toString().length + 3}ch`
                : defaultInputLength,
            }}
            value={country}
            onChange={onAddressPayloadChange}
          />
        </div>
      </div>
    </form>
  );
};

export default AutoAddress;
