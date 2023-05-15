import React, { useState, useRef, useEffect } from "react";
import styles from "./InputAddress.module.scss";
import { TbMapSearch } from "react-icons/tb";
import { BiCurrentLocation } from "react-icons/bi";
import { IAutoAddress, extractAddress } from "../../../../utils/formatters";

// Google Map
const apiKey = import.meta.env.VITE_APP_GMAP_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
// Load google map api js
function loadAsyncScript(src: any) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

//////////////////////////////////////////////////////////////

const InputAddress = () => {
  const initialAddressObj = {
    number: "",
    route: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };
  const firstMount = useRef(true);
  const searchInputRef = useRef(null);
  const [address, setAddress] = useState<IAutoAddress>(initialAddressObj);

  // do something on address change
  const onChangeAddress = (autocomplete: any) => {
    const place = autocomplete.getPlace();
    console.log("place", place);
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

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  interface ICoords {
    latitude: string;
    longitude: string;
  }

  const reverseGeocode = ({ latitude: lat, longitude: lng }: ICoords) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    if (!searchInputRef.current) return;
    searchInputRef.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);
        setAddress(_address);
        if (!searchInputRef.current) return;
        searchInputRef.current.value = _address.plain();
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
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

  const [searchAddress, setSearchAddress] = useState("");
  const getLocationAddress = () => {
    findMyLocation();
  };
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  return (
    <div>
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
          onClick={getLocationAddress}
        />
      </div>
      <div>
        <div>
          <label htmlFor="line-1">Line 1:</label>
          <input
            type="text"
            id="line-1"
            placeholder="No & Street"
            value={`${address.number} ${address.route}`}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={address.city}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            placeholder="State"
            value={address.state}
          />
        </div>
        <div>
          <label htmlFor="zip">ZIP:</label>
          <input type="text" id="zip" placeholder="ZIP" value={address.zip} />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            placeholder="Country"
            value={address.country}
          />
        </div>
      </div>
    </div>
  );
};

export default InputAddress;
