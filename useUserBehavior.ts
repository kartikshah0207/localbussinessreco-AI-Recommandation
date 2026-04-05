import { useCallback, useEffect, useMemo, useState } from "react";

type BehaviorClick = {
  name: string;
  category?: string;
  ts: number;
};

export type UserBehavior = {
  clicked: BehaviorClick[];
  viewedCategories: { category: string; count: number }[];
};

const STORAGE_KEY = "jaadu_behavior_v1";

function safeParse(raw: string | null): UserBehavior {
  if (!raw) return { clicked: [], viewedCategories: [] };
  try {
    const parsed = JSON.parse(raw);
    const clicked = Array.isArray(parsed?.clicked) ? parsed.clicked : [];
    const viewed = Array.isArray(parsed?.viewedCategories) ? parsed.viewedCategories : [];
    return {
      clicked: clicked
        .map((c: any) => ({
          name: typeof c?.name === "string" ? c.name : "",
          category: typeof c?.category === "string" ? c.category : undefined,
          ts: typeof c?.ts === "number" ? c.ts : Date.now()
        }))
        .filter((c: BehaviorClick) => c.name),
      viewedCategories: viewed
        .map((v: any) => ({
          category: typeof v?.category === "string" ? v.category : "",
          count: typeof v?.count === "number" ? v.count : 0
        }))
        .filter((v: any) => v.category && v.count > 0)
    };
  } catch {
    return { clicked: [], viewedCategories: [] };
  }
}

function persist(next: UserBehavior) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage failures
  }
}

export function useUserBehavior() {
  const [behavior, setBehavior] = useState<UserBehavior>(() =>
    safeParse(localStorage.getItem(STORAGE_KEY))
  );

  useEffect(() => {
    persist(behavior);
  }, [behavior]);

  const viewedCategoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of behavior.viewedCategories) {
      map.set(v.category, (map.get(v.category) ?? 0) + v.count);
    }
    return map;
  }, [behavior.viewedCategories]);

  const trackClick = useCallback((business: { name: string; category?: string }) => {
    setBehavior((prev) => {
      const nextClicked = [
        { name: business.name, category: business.category, ts: Date.now() },
        ...prev.clicked
      ].slice(0, 50);

      return { ...prev, clicked: nextClicked };
    });
  }, []);

  const trackCategory = useCallback((category: string) => {
    setBehavior((prev) => {
      const normalized = String(category || "").trim().toLowerCase();
      if (!normalized) return prev;

      const existing = prev.viewedCategories.find((v) => v.category === normalized);
      const nextViewed = existing
        ? prev.viewedCategories.map((v) =>
            v.category === normalized ? { ...v, count: v.count + 1 } : v
          )
        : [...prev.viewedCategories, { category: normalized, count: 1 }];

      return { ...prev, viewedCategories: nextViewed };
    });
  }, []);

  const reset = useCallback(() => {
    const next = { clicked: [], viewedCategories: [] };
    setBehavior(next);
    persist(next);
  }, []);

  return {
    behavior,
    viewedCategoryCounts,
    trackClick,
    trackCategory,
    reset
  };
}

