export function Stats() {
  return (
    <section id="stats" className="py-10">
      <div className="container grid gap-6 rounded-2xl border border-border/70 bg-background/80 px-6 py-6 sm:grid-cols-3 sm:py-8">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Local businesses mapped
          </p>
          <p className="text-2xl font-semibold tracking-tight">1,200+</p>
          <p className="text-xs text-muted-foreground">
            Cafes, restaurants, salons, gyms, and more.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Sessions powered by AI
          </p>
          <p className="text-2xl font-semibold tracking-tight">5,000+</p>
          <p className="text-xs text-muted-foreground">
            People skipping the endless scroll every month.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Avg. time to first match
          </p>
          <p className="text-2xl font-semibold tracking-tight">30 sec</p>
          <p className="text-xs text-muted-foreground">
            From signup to &ldquo;this place looks perfect&rdquo;.
          </p>
        </div>
      </div>
    </section>
  );
}

