import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BusinessGrid } from "../components/business/BusinessGrid";
import { BusinessList } from "../components/business/BusinessList";
import { RecommendationGrid } from "../components/business/RecommendationGrid";
import { MapView } from "../components/map/MapView";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Select } from "../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { type NearbyCategoryFilter, useNearbyBusinesses } from "../hooks/useNearbyBusinesses";
import { useBusinesses } from "../hooks/useBusinesses";
import { useRecommendations } from "../hooks/useRecommendations";
import { useLocation } from "../hooks/useLocation";
import { useUserBehavior } from "../hooks/useUserBehavior";

export function Dashboard() {
  const navigate = useNavigate();
  const [nearbyCategory, setNearbyCategory] = useState<NearbyCategoryFilter>("restaurants");
  const userLocation = useLocation();

  const {
    data: recommended,
    isLoading: isLoadingRecommended,
    error: recommendedError,
    notice: recommendedNotice
  } = useRecommendations();
  const {
    data: trending,
    isLoading: isLoadingTrending,
    error: trendingError
  } = useBusinesses({ category: "", rating: "", distance: "", search: "" });
  const {
    data: nearby,
    isLoading: isLoadingNearby,
    error: nearbyError,
    hasLocationPermission,
    notice: nearbyNotice
  } = useNearbyBusinesses({ category: nearbyCategory });

  const { trackCategory } = useUserBehavior();

  useEffect(() => {
    trackCategory(nearbyCategory);
  }, [nearbyCategory, trackCategory]);

  const totalPlaces = useMemo(() => (trending?.length ?? 0), [trending]);

  return (
    <section className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>AI session live</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Good to see you back, Alex.
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Here&apos;s what looks promising nearby right now, based on the interests you set during onboarding.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => navigate("/app/discover")}>
              Continue exploring
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-dashed"
              onClick={() => navigate("/app/profile")}
            >
              Tune preferences
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Morning coffee
            </Badge>
            <Badge className="bg-primary/5 text-xs text-muted-foreground border-border/60">
              After‑work plans
            </Badge>
            <Badge className="bg-primary/5 text-xs text-muted-foreground border-border/60">
              Remote‑day spots
            </Badge>
          </div>
        </div>

        <Card className="bg-background/80 border-border/70 shadow-lg shadow-slate-900/5">
          <CardHeader className="space-y-3">
            <CardTitle className="text-base">
              Today&apos;s snapshot
            </CardTitle>
            <CardDescription>
              A quick overview of how many places we think you&apos;ll like right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3 text-sm">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Recommended
              </p>
              <p className="text-2xl font-semibold tracking-tight">
                {recommended?.length ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">
                Curated picks tailored to your interests.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Trending nearby
              </p>
              <p className="text-2xl font-semibold tracking-tight">
                {trending?.length ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">
                Popular spots other locals are loving.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Total in view
              </p>
              <p className="text-2xl font-semibold tracking-tight">
                {totalPlaces}
              </p>
              <p className="text-xs text-muted-foreground">
                Adjust filters in Discover to see more.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Recommended near you
          </h2>
          <p className="text-xs text-muted-foreground">
            AI-ranked picks based on your onboarding interests and live location.
          </p>
        </div>
        {recommendedNotice && (
          <Card className="bg-muted/30 border-border/60">
            <CardContent className="p-4 text-xs text-muted-foreground">
              {recommendedNotice}
            </CardContent>
          </Card>
        )}
        <RecommendationGrid
          recommendations={recommended}
          isLoading={isLoadingRecommended}
          error={recommendedError}
          emptyMessage="No recommendations yet. Complete onboarding to personalize your picks."
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Businesses near you
            </h2>
            <p className="text-xs text-muted-foreground">
              Live based on your current location. Switch categories to refresh results.
            </p>
          </div>
          <div className="w-full sm:w-56 space-y-1">
            <span className="text-xs font-medium text-muted-foreground">
              Category
            </span>
            <Select
              value={nearbyCategory}
              onChange={(event) => setNearbyCategory(event.target.value as NearbyCategoryFilter)}
            >
              <option value="cafes">Cafes</option>
              <option value="restaurants">Restaurants</option>
              <option value="salons">Salons</option>
            </Select>
          </div>
        </div>
        {userLocation.lat != null && userLocation.lng != null && (
          <MapView
            center={{ lat: userLocation.lat, lng: userLocation.lng }}
            businesses={nearby}
            recommendations={recommended}
          />
        )}
        {nearbyNotice && (
          <Card className="bg-muted/30 border-border/60">
            <CardContent className="p-4 text-xs text-muted-foreground">
              {nearbyNotice}
            </CardContent>
          </Card>
        )}
        <BusinessGrid
          businesses={nearby}
          isLoading={isLoadingNearby}
          error={
            hasLocationPermission === false
              ? "Enable location to discover nearby businesses."
              : nearbyError
          }
          emptyMessage="We couldn’t find places nearby just yet. Try adjusting your location settings and refreshing."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Trending nearby
          </h2>
          <p className="text-xs text-muted-foreground">
            What&apos;s drawing attention in your area right now.
          </p>
        </div>
        <BusinessList
          businesses={trending}
          isLoading={isLoadingTrending}
          error={trendingError}
          emptyMessage="We couldn’t find trending spots right now. Try adjusting your filters in Discover."
        />
      </div>
    </section>
  );
}

