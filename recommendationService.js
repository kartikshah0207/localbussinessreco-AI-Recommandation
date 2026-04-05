const calculateDistance = require("../utils/calculateDistance");

function normalizeInterest(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function normalizeCategory(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function inferAllowedCategories(interests) {
  const normalized = new Set(interests.map(normalizeInterest));

  const allowed = new Set();
  if (normalized.has("cafes") || normalized.has("cafe") || normalized.has("coffee")) {
    allowed.add("cafe");
  }
  if (normalized.has("restaurants") || normalized.has("restaurant") || normalized.has("food")) {
    allowed.add("restaurant");
    allowed.add("fast_food");
  }
  if (normalized.has("fast food")) {
    allowed.add("fast_food");
  }

  // If user interests don't match our overpass categories, don't hard-filter
  return allowed.size > 0 ? Array.from(allowed) : null;
}

function buildBehaviorSignals(behavior) {
  const clickedNames = new Set();
  const clickedCategories = new Map();
  const viewedCategories = new Map();

  const clicked = Array.isArray(behavior?.clicked) ? behavior.clicked : [];
  for (const c of clicked) {
    const name = typeof c?.name === "string" ? c.name.trim().toLowerCase() : "";
    if (name) clickedNames.add(name);
    const cat = normalizeCategory(c?.category);
    if (cat) clickedCategories.set(cat, (clickedCategories.get(cat) ?? 0) + 1);
  }

  const viewed = Array.isArray(behavior?.viewedCategories) ? behavior.viewedCategories : [];
  for (const v of viewed) {
    const cat = normalizeCategory(v?.category);
    const count = typeof v?.count === "number" ? v.count : 0;
    if (cat && count > 0) viewedCategories.set(cat, (viewedCategories.get(cat) ?? 0) + count);
  }

  return { clickedNames, clickedCategories, viewedCategories };
}

function computeHybridScore({ place, interestSet, behaviorSignals }) {
  // distance_score: map [0..] km -> [0..1], closer is better
  const d = typeof place.distance_km === "number" ? place.distance_km : 10;
  const distanceScore = Math.max(0, Math.min(1, (3 - d) / 3)); // <=3km gets some weight

  const categoryMatch =
    (place.category === "cafe" && (interestSet.has("cafes") || interestSet.has("cafe") || interestSet.has("coffee"))) ||
    (place.category === "restaurant" && (interestSet.has("restaurants") || interestSet.has("restaurant") || interestSet.has("food"))) ||
    (place.category === "fast_food" && (interestSet.has("fast food") || interestSet.has("food")))
      ? 1
      : 0;

  const normalizedName = String(place.name || "").trim().toLowerCase();
  const behaviorNameMatch = behaviorSignals.clickedNames.has(normalizedName) ? 1 : 0;

  const catClicks = behaviorSignals.clickedCategories.get(place.category) ?? 0;
  const catViews = behaviorSignals.viewedCategories.get(place.category) ?? 0;
  const behaviorMatch = behaviorNameMatch || catClicks > 0 || catViews > 0 ? 1 : 0;

  // score = (category_match * 5) + (behavior_match * 3) + (distance_score * 2)
  return categoryMatch * 5 + behaviorMatch * 3 + distanceScore * 2;
}

function prepareCandidatePlaces({ places, userLat, userLng, interests, behavior, limit = 15 }) {
  const allowedCategories = inferAllowedCategories(interests);
  const interestSet = new Set(interests.map(normalizeInterest));
  const behaviorSignals = buildBehaviorSignals(behavior);

  const withDistance = places
    .map((p) => {
      const distanceKm = calculateDistance(userLat, userLng, p.lat, p.lng);
      return {
        ...p,
        distance_km: Number(distanceKm.toFixed(2)),
        distance: `${distanceKm.toFixed(1)} km`
      };
    })
    .map((p) => ({
      ...p,
      hybrid_score: computeHybridScore({ place: p, interestSet, behaviorSignals })
    }));

  const filtered = allowedCategories
    ? withDistance.filter((p) => allowedCategories.includes(p.category))
    : withDistance;

  // Hybrid pre-ranking: sort by score, then prefer closer ties
  const preRanked = [...filtered].sort((a, b) => {
    if (b.hybrid_score !== a.hybrid_score) return b.hybrid_score - a.hybrid_score;
    return a.distance_km - b.distance_km;
  });

  // Limit to top N (<= 15) first, then send <= 10 to LLM
  const topForLlm = preRanked.slice(0, Math.min(limit, 15)).slice(0, 10);

  // Only essential fields for LLM
  const candidates = topForLlm.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    distance_km: p.distance_km
  }));

  return {
    candidates,
    resolvedPlacesById: new Map(withDistance.map((p) => [p.id, p])),
    allowedCategories,
    behaviorSignals
  };
}

function fallbackRank({ candidates, resolvedPlacesById, interests, behavior, topN = 7 }) {
  const interestSet = new Set(interests.map(normalizeInterest));
  const behaviorSignals = buildBehaviorSignals(behavior);

  const ranked = [...candidates]
    .sort((a, b) => {
      const aScore = computeHybridScore({ place: a, interestSet, behaviorSignals });
      const bScore = computeHybridScore({ place: b, interestSet, behaviorSignals });
      if (bScore !== aScore) return bScore - aScore;
      return (a.distance_km ?? 999) - (b.distance_km ?? 999);
    })
    .slice(0, topN)
    .map((c) => {
      const full = resolvedPlacesById.get(c.id);
      const isCafe = (full?.category ?? c.category) === "cafe";
      const isRestaurant = (full?.category ?? c.category) === "restaurant";
      const isFastFood = (full?.category ?? c.category) === "fast_food";

      const reasons = [];
      if (isCafe && (interestSet.has("cafes") || interestSet.has("coffee") || interestSet.has("cafe"))) {
        reasons.push("Matches your interest in cafes/coffee.");
      }
      if (isRestaurant && (interestSet.has("restaurants") || interestSet.has("food") || interestSet.has("restaurant"))) {
        reasons.push("Matches your interest in restaurants/food.");
      }
      if (isFastFood && (interestSet.has("fast food") || interestSet.has("food"))) {
        reasons.push("Matches your interest in quick bites.");
      }

      const nameKey = String(full?.name ?? c.name).trim().toLowerCase();
      if (behaviorSignals.clickedNames.has(nameKey)) {
        reasons.push("You previously clicked this place.");
      } else {
        const catClicks = behaviorSignals.clickedCategories.get(full?.category ?? c.category) ?? 0;
        const catViews = behaviorSignals.viewedCategories.get(full?.category ?? c.category) ?? 0;
        if (catClicks > 0) reasons.push("You clicked similar places recently.");
        if (catViews > 0) reasons.push("You’ve been exploring this category.");
      }

      reasons.push("Very close to your location.");

      return {
        id: full?.id ?? c.id,
        name: full?.name ?? c.name,
        category: full?.category ?? c.category,
        reason: reasons.slice(0, 3).join(" "),
        distance: full?.distance ?? `${(c.distance_km ?? 0).toFixed(1)} km`,
        lat: full?.lat,
        lng: full?.lng,
        isRecommended: true
      };
    });

  return ranked;
}

module.exports = {
  prepareCandidatePlaces,
  fallbackRank
};

