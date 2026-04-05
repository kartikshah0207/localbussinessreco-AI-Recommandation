import { useMemo } from "react";

import type { Business, NearbyBusiness } from "../types";
import { useNearbyBusinesses } from "./useNearbyBusinesses";

interface UseBusinessesParams {
  category?: string;
  rating?: string;
  distance?: string;
  search?: string;
}

interface UseBusinessesResult {
  data: Business[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

function mapNearbyToBusiness(b: NearbyBusiness): Business {
  const distanceKm =
    typeof b.distance_km === "number"
      ? b.distance_km
      : Number.parseFloat(b.distance.replace(" km", "")) || 0;

  return {
    id: b.place_id,
    name: b.name,
    category: b.category ?? "Place",
    rating: typeof b.rating === "number" ? b.rating : 0,
    distance: distanceKm,
    description: b.address,
    isRecommended: false
  };
}

export function useBusinesses(params: UseBusinessesParams = {}): UseBusinessesResult {
  const {
    data: nearby,
    isLoading,
    error,
    refetch
  } = useNearbyBusinesses();

  const data = useMemo<Business[] | null>(() => {
    if (!nearby) return null;

    let results = nearby.map(mapNearbyToBusiness);

    if (params.category) {
      const categoryLower = params.category.toLowerCase();
      results = results.filter(
        (b) => b.category.toLowerCase() === categoryLower
      );
    }

    if (params.rating) {
      const minRating = Number(params.rating);
      if (!Number.isNaN(minRating)) {
        results = results.filter((b) => b.rating >= minRating);
      }
    }

    if (params.distance) {
      const maxDistance = Number(params.distance);
      if (!Number.isNaN(maxDistance)) {
        results = results.filter((b) => b.distance <= maxDistance);
      }
    }

    if (params.search) {
      const query = params.search.toLowerCase();
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.description?.toLowerCase().includes(query)
      );
    }

    return results;
  }, [nearby, params.category, params.rating, params.distance, params.search]);

  return { data, isLoading, error, refetch };
}

interface UseBusinessResult {
  data: Business | null;
  isLoading: boolean;
  error: string | null;
}

export function useBusiness(id: string | undefined): UseBusinessResult {
  const {
    data: nearby,
    isLoading,
    error
  } = useNearbyBusinesses();

  const data = useMemo<Business | null>(() => {
    if (!id || !nearby) return null;
    const match = nearby.find((b) => b.place_id === id);
    return match ? mapNearbyToBusiness(match) : null;
  }, [id, nearby]);

  return { data, isLoading, error };
}

