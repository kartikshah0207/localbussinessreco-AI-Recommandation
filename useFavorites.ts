import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "jaadu_favorites_v1";

function safeParse(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function persist(next: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage failures
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    safeParse(localStorage.getItem(STORAGE_KEY))
  );

  useEffect(() => {
    persist(favoriteIds);
  }, [favoriteIds]);

  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const isFavorite = useCallback(
    (id: string) => favoriteIdSet.has(id),
    [favoriteIdSet]
  );

  const addFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev : [id, ...prev].slice(0, 200)));
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev].slice(0, 200)
      );
    },
    []
  );

  return {
    favoriteIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite
  };
}

