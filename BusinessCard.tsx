import { Link } from "react-router-dom";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { Business } from "../../types";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-150 hover:shadow-card hover:-translate-y-0.5">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>{business.name}</CardTitle>
            <CardDescription className="mt-1">
              {business.distance.toFixed(1)} km away
            </CardDescription>
          </div>
          <Badge>{business.category}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{business.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">/ 5</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        {business.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {business.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          {business.isRecommended && (
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Recommended
            </Badge>
          )}
          <Button asChild className="ml-auto">
            <Link to={`/app/business/${business.id}`}>View details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

