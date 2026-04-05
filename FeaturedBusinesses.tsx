import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const FEATURED = [
  {
    name: "Sunrise Espresso Bar",
    category: "Cafe",
    rating: 4.8,
    blurb: "Third‑wave espresso, bright interior, laptop friendly.",
  },
  {
    name: "Harbor &amp; Hearth",
    category: "Restaurant",
    rating: 4.7,
    blurb: "Seasonal plates, natural wine, and a cozy dining room.",
  },
  {
    name: "Studio Nova Salon",
    category: "Salon",
    rating: 4.9,
    blurb: "Modern cuts, color specialists, and a calm atmosphere.",
  },
];

export function FeaturedBusinesses() {
  return (
    <section id="discover" className="py-16 sm:py-20">
      <div className="container space-y-8">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Featured this week
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            A sample of the kind of places we surface in your dashboard.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURED.map((item) => (
            <Card
              key={item.name}
              className="rounded-xl border-border/70 bg-background/80 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  <Badge>{item.category}</Badge>
                </div>
                <p className="text-xs font-medium text-amber-600">
                  {item.rating.toFixed(1)} average rating
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.blurb}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

