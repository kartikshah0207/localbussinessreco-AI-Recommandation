const axios = require("axios");

const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter";

function buildOverpassQuery({ lat, lng, radiusMeters }) {
  // Query amenity-based places around a point.
  // We prefer nodes, but include ways/relations to improve coverage.
  const around = `around:${radiusMeters},${lat},${lng}`;

  return `
[out:json][timeout:25];
(
  node["amenity"="cafe"](${around});
  way["amenity"="cafe"](${around});
  relation["amenity"="cafe"](${around});

  node["amenity"="restaurant"](${around});
  way["amenity"="restaurant"](${around});
  relation["amenity"="restaurant"](${around});

  node["amenity"="fast_food"](${around});
  way["amenity"="fast_food"](${around});
  relation["amenity"="fast_food"](${around});
);
out center tags;
`;
}

function normalizeElementToPlace(element) {
  const tags = element.tags || {};
  const rawName = typeof tags.name === "string" ? tags.name.trim() : "";
  if (!rawName) return null; // skip entries with no real name

  const category =
    tags.amenity === "cafe"
      ? "cafe"
      : tags.amenity === "restaurant"
        ? "restaurant"
        : tags.amenity === "fast_food"
          ? "fast_food"
          : null;

  if (!category) return null;

  // Nodes have lat/lon, ways/relations may have center
  const lat = typeof element.lat === "number" ? element.lat : element.center?.lat;
  const lng = typeof element.lon === "number" ? element.lon : element.center?.lon;

  if (typeof lat !== "number" || typeof lng !== "number") return null;

  return {
    id: `${element.type}/${element.id}`,
    name: rawName,
    category,
    lat,
    lng
  };
}

async function fetchNearbyPlaces({ lat, lng, radiusMeters = 3000 }) {
  const query = buildOverpassQuery({ lat, lng, radiusMeters });

  // eslint-disable-next-line no-console
  console.log("Overpass Query:", query);

  try {
    const response = await axios.post(OVERPASS_ENDPOINT, query, {
      headers: { "Content-Type": "text/plain" },
      timeout: 15000
    });

    // eslint-disable-next-line no-console
    console.log("Overpass Response:", {
      hasElements: Array.isArray(response.data?.elements),
      count: Array.isArray(response.data?.elements) ? response.data.elements.length : 0
    });

    const elements = Array.isArray(response.data?.elements) ? response.data.elements : [];
    const places = elements.map(normalizeElementToPlace).filter(Boolean);

    // De-dupe by name+category (Overpass can return multiple geometries)
    const seen = new Set();
    const deduped = [];
    for (const place of places) {
      const key = `${place.category}::${place.name.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(place);
    }

    if (deduped.length > 0) {
      // Limit to top 20 valid places
      return deduped.slice(0, 20);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Overpass Error:", error?.response?.data || error?.message || error);
  }

  // If Overpass fails, return empty array – no demo data
  return [];
}

module.exports = {
  fetchNearbyPlaces
};

