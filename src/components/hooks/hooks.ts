import { useState, useEffect } from "react";
import { getCurrentLocation } from "../../helpers/helpers";

export const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    getCurrentLocation()
      .then((location) => setLocation(location))
      .catch(() => setLocation(null));
  }, []);

  return {
    location,
    setLocation,
  };
};
