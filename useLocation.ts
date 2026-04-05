import { useCallback, useEffect, useState } from "react";

import { GeolocationError, getCurrentPosition } from "../lib/location";

interface UseLocationResult {
  lat: number | null;
  lng: number | null;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean | null;
  refetch: () => void;
}

export function useLocation(): UseLocationResult {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const fallback = { lat: 21.25, lng: 81.62 };

  const fetchLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    getCurrentPosition()
      .then((coords) => {
        setHasPermission(true);
        setLat(coords.lat);
        setLng(coords.lng);
        // eslint-disable-next-line no-console
        console.log("Lat:", coords.lat, "Lng:", coords.lng);
      })
      .catch((err: unknown) => {
        if (err instanceof GeolocationError) {
          if (err.code === 1) {
            setHasPermission(false);
            // Fallback coords for demo reliability
            setLat(fallback.lat);
            setLng(fallback.lng);
            // eslint-disable-next-line no-console
            console.log("Location denied. Using fallback:", fallback.lat, fallback.lng);
            setError("Enable location to discover nearby places.");
            return;
          }
          setError("We couldn't determine your location. Please check your browser settings.");
          return;
        }
        setError("We couldn't determine your location. Please try again.");
      })
      .finally(() => setIsLoading(false));
  }, [fallback.lat, fallback.lng]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return {
    lat,
    lng,
    isLoading,
    error,
    hasPermission,
    refetch: fetchLocation
  };
}

