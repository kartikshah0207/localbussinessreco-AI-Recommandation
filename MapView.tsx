import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import type { NearbyBusiness, Recommendation } from "../../types";

interface MapViewProps {
  center: { lat: number; lng: number };
  businesses: NearbyBusiness[] | null;
  recommendations?: Recommendation[] | null;
}

const userIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35]
});

const recommendedIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -40]
});

export function MapView({ center, businesses, recommendations }: MapViewProps) {
  if (typeof window === "undefined") return null;

  const recommendedIds = new Set(
    (recommendations ?? [])
      .filter((r) => typeof r.id === "string")
      .map((r) => r.id)
  );

  return (
    <div className="h-72 w-full overflow-hidden rounded-xl border border-border/70">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[center.lat, center.lng]} icon={userIcon}>
          <Popup>Your location</Popup>
        </Marker>

        {businesses?.map((b) =>
          typeof b.lat === "number" && typeof b.lng === "number" ? (
            <Marker
              key={b.place_id}
              position={[b.lat, b.lng]}
              icon={recommendedIds.has(b.place_id) ? recommendedIcon : userIcon}
            >
              <Popup>
                <div className="space-y-1">
                  <div className="font-medium text-sm">{b.name}</div>
                  {b.category && (
                    <div className="text-xs text-muted-foreground">{b.category}</div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {b.distance}
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}

