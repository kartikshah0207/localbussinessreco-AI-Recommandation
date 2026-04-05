import { BusinessList } from "../components/business/BusinessList";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useBusinesses } from "../hooks/useBusinesses";
import { useRecommendations } from "../hooks/useRecommendations";

export function Home() {
  const { data: recommended, isLoading: isLoadingRecommended, error: recommendedError } =
    useRecommendations();
  const { data: trending, isLoading: isLoadingTrending, error: trendingError } =
    useBusinesses({ category: "", rating: "", distance: "", search: "" });

  return (
    <section className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Discover local places you&rsquo;ll love.
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            An AI-powered guide to cafes, restaurants, salons, and more &mdash;
            tailored to your taste, mood, and location.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button>
              Start exploring nearby places
            </Button>
            <Button variant="outline" className="border-dashed">
              View recommendations
            </Button>
          </div>
        </div>
        <Card className="hidden lg:block">
          <CardHeader>
            <CardTitle>Quick glance</CardTitle>
            <CardDescription>
              A snapshot of top picks around you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>See what&rsquo;s trending for tonight, tomorrow, or your next weekend.</p>
            <p>We&rsquo;ll soon learn your favorite spots to make even better suggestions.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Recommended for you
          </h2>
        </div>
        <BusinessList
          businesses={recommended}
          isLoading={isLoadingRecommended}
          error={recommendedError}
          emptyMessage="No recommendations yet. As you start exploring, we’ll surface personalized picks here."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Trending nearby
          </h2>
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

