import { useEffect, useState } from "react";

import api from "../services/api";
import type { NearbyBusiness } from "../types";
import { GeolocationError, getCurrentPosition } from "../lib/location";

export type NearbyCategoryFilter = "cafes" | "restaurants" | "salons";

interface UseNearbyBusinessesOptions {
  category?: NearbyCategoryFilter;
}

interface UseNearbyBusinessesResult {
  data: NearbyBusiness[] | null;
  isLoading: boolean;
  error: string | null;
  hasLocationPermission: boolean | null;
  notice: string | null;
  refetch: () => void;
}

export function useNearbyBusinesses(
  options: UseNearbyBusinessesOptions = {}
): UseNearbyBusinessesResult {
  const [data, setData] = useState<NearbyBusiness[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchNearby = () => {
    setIsLoading(true);
    setError(null);
    setNotice(null);

    getCurrentPosition()
      .then(({ lat, lng }) => {
        setHasLocationPermission(true);
        // eslint-disable-next-line no-console
        console.log("Nearby Lat:", lat, "Lng:", lng);
        // eslint-disable-next-line no-console
        console.log("Nearby Request:", { lat, lng, category: options.category ?? "restaurants" });
        return api.get<NearbyBusiness[]>("/businesses/nearby", {
          params: { lat, lng, category: options.category ?? "restaurants" }
        });
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log("Nearby Response:", response.data);
        setData(response.data);
      })
      .catch((err: unknown) => {
        if (err instanceof GeolocationError) {
          if (err.code === 1) {
            setHasLocationPermission(false);
            setError("Enable location to discover nearby businesses.");
            return;
          }
          setError("We couldn't determine your location. Please check your browser settings.");
          return;
        }

        // eslint-disable-next-line no-console
        console.error("Nearby Error:", (err as any)?.response?.data || (err as any)?.message || err);
        setError("We couldn't load nearby places right now. Please try again in a bit.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchNearby();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.category]);

  return {
    data,
    isLoading,
    error,
    hasLocationPermission,
    notice,
    refetch: fetchNearby
  };
}

