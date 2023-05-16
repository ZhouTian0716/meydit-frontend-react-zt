// Google Map
export const apiKey = import.meta.env.VITE_APP_GMAP_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
export const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
// Load google map api js
function loadAsyncScript(src: string) {
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

export const initMapScript = () => {
  if (window.google) {
    return Promise.resolve();
  }
  const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
  return loadAsyncScript(src);
};

// Formatting featrues
export interface IAutoAddress {
  number: string;
  route: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface IAddresssComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export const extractAddress = (place: google.maps.places.PlaceResult) => {
  const address = {
    number: "",
    route: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const number = this.number ? this.number + ", " : "";
      const route = this.route ? this.route + ", " : "";
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return number + route + city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place.address_components)) {
    return address;
  }

  place.address_components.forEach((component: IAddresssComponent) => {
    const types = component.types;
    // const value = component.long_name;
    const value = component.short_name;

    if (types.includes("street_number")) {
      address.number = value;
    }
    if (types.includes("route")) {
      address.route = value;
    }
    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("administrative_area_level_1")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};
