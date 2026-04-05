const { fetchNearbyPlaces } = require("../services/overpassService");
const { prepareCandidatePlaces, fallbackRank } = require("../services/recommendationService");
const { getAIRecommendations } = require("../services/llmService");
const calculateDistance = require("../utils/calculateDistance");

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

async function createRecommendations(req, res, next) {
  try {
    const { lat, lng, interests, behavior } = req.body || {};

    // eslint-disable-next-line no-console
    console.log("Incoming /api/recommendations:", { lat, lng, interestsCount: interests?.length ?? 0 });

    if (!isFiniteNumber(lat) || !isFiniteNumber(lng)) {
      return res.status(400).json({ message: "Invalid lat/lng" });
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ message: "Invalid lat/lng" });
    }
    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({ message: "Interests must be a non-empty array" });
    }

    const sanitizedInterests = interests
      .map((i) => String(i).trim())
      .filter(Boolean)
      .slice(0, 20);

    if (sanitizedInterests.length === 0) {
      return res.status(400).json({ message: "Interests must be a non-empty array" });
    }

    const places = await fetchNearbyPlaces({ lat, lng, radiusMeters: 3000 });
    if (!places || places.length === 0) {
      const demo = [
        {
          name: "Demo Cafe",
          category: "cafe",
          reason: "Popular nearby place",
          distance: `${calculateDistance(lat, lng, lat + 0.006, lng + 0.004).toFixed(1)} km`
        },
        {
          name: "Pizza Demo",
          category: "restaurant",
          reason: "Popular nearby place",
          distance: `${calculateDistance(lat, lng, lat + 0.011, lng - 0.003).toFixed(1)} km`
        }
      ];
      // eslint-disable-next-line no-console
      console.log("Recommendations Fallback Demo Used (no places)");
      return res.json(demo);
    }

    const { candidates, resolvedPlacesById } = prepareCandidatePlaces({
      places,
      userLat: lat,
      userLng: lng,
      interests: sanitizedInterests,
      behavior,
      limit: 15
    });

    if (candidates.length === 0) {
      const demo = [
        {
          name: "Demo Cafe",
          category: "cafe",
          reason: "Popular nearby place",
          distance: `${calculateDistance(lat, lng, lat + 0.006, lng + 0.004).toFixed(1)} km`
        }
      ];
      // eslint-disable-next-line no-console
      console.log("Recommendations Fallback Demo Used (no candidates)");
      return res.json(demo);
    }

    // LLM is only for ranking + reasoning. We never send raw Overpass payload.
    let ranked;
    try {
      const llmRanked = await getAIRecommendations(
        { interests: sanitizedInterests, behavior },
        candidates,
        7
      );

      const mapped = llmRanked
        .map((r) => {
          const full = resolvedPlacesById.get(r.id);
          if (!full) return null;
          return {
            id: full.id,
            name: full.name,
            category: full.category,
            lat: full.lat,
            lng: full.lng,
            reason: r.reason,
            distance: full.distance,
            isRecommended: true
          };
        })
        .filter(Boolean);

      ranked = mapped;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("LLM failed, using fallbackRank:", err?.message || err);
      // If LLM fails/missing key, fall back to deterministic heuristic ranking
      ranked = fallbackRank({
        candidates,
        resolvedPlacesById,
        interests: sanitizedInterests,
        behavior,
        topN: 7
      });
    }

    // Limit final results to 5–10 for UX (we use 7 as default)
    const finalRanked = ranked.slice(0, 10).map((r) => ({
      ...r,
      id: r.id || r.name,
      isRecommended: r.isRecommended ?? true
    }));
    if (!finalRanked || finalRanked.length === 0) {
      // eslint-disable-next-line no-console
      console.log("Recommendations Empty -> Demo Used");
      return res.json([
        {
          name: "Demo Cafe",
          category: "cafe",
          reason: "Popular nearby place",
          distance: "0.8 km"
        }
      ]);
    }
    return res.json(finalRanked);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createRecommendations
};

