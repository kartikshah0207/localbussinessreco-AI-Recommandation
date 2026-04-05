const { fetchNearbyPlaces } = require("../services/overpassService");
const calculateDistance = require("../utils/calculateDistance");

async function getNearbyBusinesses(req, res, next) {
  try {
    const { lat, lng } = req.query;

    if (lat == null || lng == null) {
      return res.status(400).json({
        message: "Missing required query parameters: lat and lng"
      });
    }

    const parsedLat = Number(lat);
    const parsedLng = Number(lng);

    if (
      Number.isNaN(parsedLat) ||
      Number.isNaN(parsedLng) ||
      parsedLat < -90 ||
      parsedLat > 90 ||
      parsedLng < -180 ||
      parsedLng > 180
    ) {
      return res.status(400).json({
        message: "Invalid latitude or longitude values"
      });
    }

    try {
      const places = await fetchNearbyPlaces({
        lat: parsedLat,
        lng: parsedLng,
        radiusMeters: 3000
      });

      if (Array.isArray(places) && places.length > 0) {
        const mapped = places.map((p) => {
          const dKm = calculateDistance(parsedLat, parsedLng, p.lat, p.lng);
          return {
            name: p.name,
            rating: undefined,
            category:
              p.category === "cafe"
                ? "Cafe"
                : p.category === "restaurant"
                  ? "Restaurant"
                  : p.category === "fast_food"
                    ? "Fast food"
                    : p.category,
            distance: `${dKm.toFixed(1)} km`,
            distance_km: Number(dKm.toFixed(2)),
            address: "Nearby",
            place_id: p.id,
            lat: p.lat,
            lng: p.lng
          };
        });
        return res.json(mapped);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Overpass failed:", err?.message || err);
    }

    // If Overpass returns nothing or fails, respond with empty array (no demo data)
    return res.json([]);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getNearbyBusinesses
};

