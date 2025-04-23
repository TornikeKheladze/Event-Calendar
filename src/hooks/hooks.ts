import { useState, useEffect } from "react";
import { Location } from "../types/types";
// import { getCurrentLocation } from "../helpers/location";

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>({
    latitude: 41.722433,
    longitude: 44.746272,
  });

  // useEffect(() => {
  //   getCurrentLocation()
  //     .then((location) => setLocation(location))
  //     .catch(() => setLocation(null));
  // }, []);

  return {
    location,
    setLocation,
  };
};
