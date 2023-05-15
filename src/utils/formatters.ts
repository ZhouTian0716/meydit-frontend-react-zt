import { Interface } from "readline";

export const timeAgo = (createdAt: Date) => {
  const now = new Date();
  const created = new Date(createdAt);
  const elapsed = now.getTime() - created.getTime();
  const msPerMin = 60 * 1000;
  const msPerHour = msPerMin * 60;
  const msPerDay = msPerHour * 24;
  if (elapsed < msPerMin) {
    return "just now";
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMin);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.round(elapsed / msPerDay);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};

export interface IAutoAddress {
  number: string;
  route: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface IAddresssComponent{
  long_name: string;
  short_name: string;
  types: string[];
}

export const extractAddress = (place: any) => {
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

  if (!Array.isArray(place?.address_components)) {
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

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};
