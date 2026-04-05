import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface BusinessSkeletonProps {
  count?: number;
}

export function BusinessSkeleton({ count = 6 }: BusinessSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-full">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-36 w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-9 w-24 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

