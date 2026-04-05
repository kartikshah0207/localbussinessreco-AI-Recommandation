import { useEffect, useMemo, useState } from "react";

import api from "../services/api";
import type { Recommendation } from "../types";
import { useLocation } from "./useLocation";
import { useUserBehavior } from "./useUserBehavior";

interface UseRecommendationsResult {
  data: Recommendation[] | null;
  isLoading: boolean;
  error: string | null;
  notice: string | null;
}

export function useRecommendations(): UseRecommendationsResult {
  const [data, setData] = useState<Recommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const location = useLocation();
  const { behavior } = useUserBehavior();

  const fallbackLocation = useMemo(() => ({ lat: 19.076, lng: 72.8777 }), []);

  const interests = useMemo(() => {
    try {
      const raw = localStorage.getItem("jaadu_interests");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const demoRecommendations = useMemo<Recommendation[]>(
    () => [
      {
        name: "Demo Cafe",
        category: "cafe",
        reason: "Popular nearby place",
        distance: "0.8 km"
      },
      {
        name: "Pizza Demo",
        category: "restaurant",
        reason: "Popular nearby place",
        distance: "1.5 km"
      }
    ],
    []
  );

  useEffect(() => {
    if (location.isLoading) {
      setIsLoading(true);
      return;
    }

    // Fallback demo mode if location denied/unavailable
    const shouldFallback =
      location.hasPermission === false ||
      (typeof location.error === "string" && location.error.includes("Enable location"));

    const lat = shouldFallback ? fallbackLocation.lat : location.lat;
    const lng = shouldFallback ? fallbackLocation.lng : location.lng;

    if (shouldFallback) {
      setNotice("Showing recommendations for default location.");
    } else {
      setNotice(null);
    }

    if (location.error && !shouldFallback) {
      setIsLoading(false);
      setError(location.error);
      return;
    }

    if (lat == null || lng == null) return;
    if (interests.length === 0) {
      setIsLoading(false);
      setData([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    // eslint-disable-next-line no-console
    console.log("Recommendations Request:", { lat, lng, interests, behavior });

    api
      .post<Recommendation[]>("/recommendations", {
        lat,
        lng,
        interests,
        behavior
      })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log("Recommendations Response:", res.data);

        if (!Array.isArray(res.data) || res.data.length === 0) {
          setNotice("Showing demo recommendations.");
          setData(demoRecommendations);
          return;
        }
        setData(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("Recommendations Error:", err?.response?.data || err?.message || err);
        setNotice("Showing demo recommendations.");
        setData(demoRecommendations);
      })
      .finally(() => setIsLoading(false));
  }, [
    behavior,
    demoRecommendations,
    fallbackLocation.lat,
    fallbackLocation.lng,
    interests,
    location.error,
    location.hasPermission,
    location.isLoading,
    location.lat,
    location.lng
  ]);

  return { data, isLoading, error, notice };
}

