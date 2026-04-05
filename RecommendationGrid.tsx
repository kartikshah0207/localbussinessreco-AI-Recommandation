import type { Recommendation } from "../../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BusinessSkeleton } from "./BusinessSkeleton";
import { RecommendationCard } from "./RecommendationCard";

interface RecommendationGridProps {
  recommendations: Recommendation[] | null;
  isLoading: boolean;
  error: string | null;
  emptyMessage?: string;
}

export function RecommendationGrid({
  recommendations,
  isLoading,
  error,
  emptyMessage = "No recommendations yet. Complete onboarding to personalize your picks."
}: RecommendationGridProps) {
  if (isLoading) return <BusinessSkeleton />;

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">No recommendations yet</CardTitle>
          <CardDescription>{emptyMessage}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((r, index) => (
        <RecommendationCard
          key={`${r.name}-${r.category}`}
          recommendation={r}
          rankIndex={index}
        />
      ))}
    </div>
  );
}

