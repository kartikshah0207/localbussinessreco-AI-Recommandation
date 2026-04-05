import { Bookmark, BookmarkCheck, MapPin, Sparkles, TrendingUp } from "lucide-react";

import type { Recommendation } from "../../types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useFavorites } from "../../hooks/useFavorites";
import { useUserBehavior } from "../../hooks/useUserBehavior";

interface RecommendationCardProps {
  recommendation: Recommendation;
  rankIndex: number;
}

const CATEGORY_LABEL: Record<string, string> = {
  cafe: "Cafe",
  restaurant: "Restaurant",
  fast_food: "Fast food"
};

export function RecommendationCard({ recommendation, rankIndex }: RecommendationCardProps) {
  const categoryLabel =
    CATEGORY_LABEL[recommendation.category] ??
    recommendation.category.replace(/_/g, " ");

  const { toggleFavorite, isFavorite } = useFavorites();
  const { viewedCategoryCounts, trackClick } = useUserBehavior();

  const favoriteKey = `${recommendation.category}::${recommendation.name}`;
  const saved = isFavorite(favoriteKey);

  const distanceKm = (() => {
    const match = recommendation.distance.match(/([\d.]+)/);
    const n = match ? Number(match[1]) : NaN;
    return Number.isFinite(n) ? n : null;
  })();

  const isNearby = distanceKm != null ? distanceKm < 1 : false;
  const isAiPick = rankIndex < 3;
  const trendCount = viewedCategoryCounts.get(recommendation.category) ?? 0;
  const isTrending = trendCount >= 3;

  return (
    <Card className="group h-full overflow-hidden border-border/70 bg-background/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/15">
      <CardHeader className="space-y-2 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-sm line-clamp-2">
              {recommendation.name}
            </CardTitle>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{categoryLabel}</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {recommendation.distance}
              </span>
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(favoriteKey);
            }}
            aria-label={saved ? "Remove from favorites" : "Save to favorites"}
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {isAiPick && (
            <Badge className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Pick
            </Badge>
          )}
          {isNearby && (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/25">
              Nearby
            </Badge>
          )}
          {isTrending && (
            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/25 inline-flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Trending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          className="space-y-2"
          onClick={() => trackClick({ name: recommendation.name, category: recommendation.category })}
          role="button"
          tabIndex={0}
        >
          <p className="text-xs font-medium text-foreground/80">
            ✨ Recommended because:
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recommendation.reason}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

