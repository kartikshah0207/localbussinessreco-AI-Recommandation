import type { NearbyBusiness } from "../../types";
import { MapPin, Navigation2, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface NearbyBusinessCardProps {
  business: NearbyBusiness;
}

export function NearbyBusinessCard({ business }: NearbyBusinessCardProps) {
  const hasPhoto = Boolean(business.photo_url);
  const hasMapPreview = Boolean(business.map_preview_url);

  return (
    <Card className="group h-full flex flex-col overflow-hidden border-border/70 bg-background/80 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/20">
      <div className="relative h-36 w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {hasPhoto ? (
          <img
            src={business.photo_url}
            alt={business.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-300/80">
            {business.category ?? "Local spot"}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-200" />
        {business.distance && (
          <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-2 py-1 text-[11px] font-medium text-slate-50 shadow-sm backdrop-blur">
            <Navigation2 className="h-3 w-3" />
            <span>{business.distance}</span>
          </div>
        )}
      </div>
      <CardHeader className="space-y-2 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-sm line-clamp-2">{business.name}</CardTitle>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span className="truncate">
                {business.address ?? "Nearby"}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
            {typeof business.rating === "number" && (
              <Badge className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-500 border-amber-500/30">
                <Star className="h-3 w-3 fill-amber-500/80 text-amber-500" />
                <span className="text-xs font-medium">
                  {business.rating.toFixed(1)}
                </span>
              </Badge>
            )}
            {business.category && (
              <Badge className="bg-muted text-xs">
                {business.category}
              </Badge>
            )}
            </div>
          </div>
          {hasMapPreview && (
            <div className="overflow-hidden rounded-xl border border-border/70 bg-muted/30">
              <img
                src={business.map_preview_url}
                alt={`${business.name} map preview`}
                loading="lazy"
                className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

