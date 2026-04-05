import type { NearbyBusiness } from "../../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BusinessSkeleton } from "./BusinessSkeleton";
import { NearbyBusinessCard } from "./NearbyBusinessCard";

interface BusinessGridProps {
  businesses: NearbyBusiness[] | null;
  isLoading: boolean;
  error: string | null;
  emptyMessage?: string;
}

export function BusinessGrid({
  businesses,
  isLoading,
  error,
  emptyMessage = "We couldn’t find places nearby just yet."
}: BusinessGridProps) {
  if (isLoading) {
    return <BusinessSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Nothing nearby yet</CardTitle>
          <CardDescription>
            {emptyMessage}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {businesses.map((business) => (
        <NearbyBusinessCard key={business.place_id} business={business} />
      ))}
    </div>
  );
}

