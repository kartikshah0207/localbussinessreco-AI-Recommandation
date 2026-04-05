import { useParams, useNavigate } from "react-router-dom";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useBusiness } from "../hooks/useBusinesses";

export function BusinessDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: business, isLoading, error } = useBusiness(id);

  if (isLoading) {
    return (
      <section className="space-y-6">
        <Card>
          <CardHeader className="space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </section>
    );
  }

  if (error || !business) {
    return (
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business not available</CardTitle>
            <CardDescription>
              We couldn&apos;t load details for this business right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Try again later or explore similar places on the Discover page.
            </p>
            <Button variant="outline" onClick={() => navigate("/app/discover")}>
              Back to Discover
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1.5">
              <CardTitle>{business.name}</CardTitle>
              <CardDescription>
                {business.distance.toFixed(1)} km away • Rated{" "}
                <span className="font-medium">{business.rating.toFixed(1)}</span>/5
              </CardDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge>{business.category}</Badge>
              {business.isRecommended && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Recommended for you
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {business.description && (
            <p className="text-sm text-muted-foreground max-w-2xl">
              {business.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            More details such as opening hours, price range, and reviews can be surfaced here
            as the platform evolves.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

