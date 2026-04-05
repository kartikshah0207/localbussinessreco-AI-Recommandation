import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-18 sm:py-22 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.4),_transparent_55%)]" />
      <div className="container relative flex flex-col gap-12 lg:flex-row lg:items-center">
        <div className="space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Personalized picks in under 30 seconds</span>
          </div>
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Stop scrolling. Let AI find your next local favorite.
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg">
              Tell us what you like once, and we&apos;ll turn the noise of every cafe,
              restaurant, salon, gym, and shop nearby into a short list of places you&apos;ll
              actually enjoy.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild className="rounded-full px-6">
              <Link to="/signup" className="flex items-center gap-2">
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6 border-dashed">
              <Link to="/app">
                View live demo
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <MapPin className="h-3 w-3" />
              </span>
              <span>Works in any city</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <span>No credit card • No spam</span>
          </div>
        </div>
        <div className="flex-1">
          <Card className="rounded-2xl border border-border/70 bg-gradient-to-br from-background/95 via-background/90 to-background/80 shadow-[0_22px_45px_rgba(15,23,42,0.45)]">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    A morning in your neighborhood
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Built from your interests and what&apos;s actually open nearby.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  AI pick
                </span>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-base font-semibold tracking-tight">
                  Morning brew match
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &ldquo;Cozy, laptop‑friendly cafes within 10 minutes of you, with great
                  espresso and quiet corners.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-border/70 bg-muted/60 p-3 space-y-1.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/80">
                  <p className="font-medium text-xs">Tonight</p>
                  <p className="text-muted-foreground">
                    Walkable spots for dinner with friends.
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-muted/60 p-3 space-y-1.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/80">
                  <p className="font-medium text-xs">This weekend</p>
                  <p className="text-muted-foreground">
                    Brunch picks and outdoor seating.
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-muted/60 p-3 space-y-1.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/80">
                  <p className="font-medium text-xs">Remote day</p>
                  <p className="text-muted-foreground">
                    Quiet cafes with reliable Wi‑Fi.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

