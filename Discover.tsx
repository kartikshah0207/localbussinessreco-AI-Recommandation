import { BusinessFilters } from "../components/business/BusinessFilters";
import { BusinessList } from "../components/business/BusinessList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useBusinesses } from "../hooks/useBusinesses";
import { useState } from "react";

export function Discover() {
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [distance, setDistance] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: businesses,
    isLoading,
    error
  } = useBusinesses({ category, rating, distance, search });

  return (
    <section className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Discover</CardTitle>
          <CardDescription>
            Explore nearby businesses with filters and intelligent recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <BusinessFilters
            category={category}
            rating={rating}
            distance={distance}
            search={search}
            onCategoryChange={setCategory}
            onRatingChange={setRating}
            onDistanceChange={setDistance}
            onSearchChange={setSearch}
          />
        </CardContent>
      </Card>

      <BusinessList
        businesses={businesses}
        isLoading={isLoading}
        error={error}
        emptyMessage="No businesses match these filters yet. Try broadening your search."
      />
    </section>
  );
}

