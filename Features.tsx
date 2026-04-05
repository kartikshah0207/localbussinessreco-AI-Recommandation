import { Compass, Filter, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description:
      "See places picked just for you based on your taste, habits, and what you like to do."
  },
  {
    icon: Filter,
    title: "Smart Filters",
    description:
      "Slice by category, rating, distance, and vibe. Quickly narrow down to the perfect spot."
  },
  {
    icon: Compass,
    title: "Nearby Discovery",
    description:
      "Explore hidden gems a few minutes away, whether you’re at home or traveling."
  }
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-20">
      <div className="container space-y-8">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Designed for the way you actually explore cities.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            From quick coffee runs to special nights out, we combine data and intuition
            to surface places worth your time.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="rounded-xl border-border/70 bg-background/80 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <CardHeader className="space-y-4">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <feature.icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

