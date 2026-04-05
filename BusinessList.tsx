import type { Business } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { BusinessCard } from "./BusinessCard";

interface BusinessListProps {
  businesses: Business[] | null;
  isLoading: boolean;
  error: string | null;
  emptyMessage?: string;
}

export function BusinessList({
  businesses,
  isLoading,
  error,
  emptyMessage = "No businesses to show yet."
}: BusinessListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-9 w-24 ml-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-red-600">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          {emptyMessage}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}

