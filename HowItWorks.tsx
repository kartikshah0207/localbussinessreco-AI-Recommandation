import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const STEPS = [
  {
    step: "1",
    title: "Choose your interests",
    description:
      "Tell us what you enjoy — from third-wave coffee to rooftops with a view."
  },
  {
    step: "2",
    title: "AI analyzes preferences",
    description:
      "We blend your interests with local data to understand what makes a great spot for you."
  },
  {
    step: "3",
    title: "Get personalized recommendations",
    description:
      "Open your dashboard to see a feed of places matched to your mood and schedule."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20">
      <div className="container space-y-8">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            A simple flow that turns a few signals into surprisingly good suggestions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <Card
              key={step.title}
              className="rounded-xl border-border/70 bg-background/80 shadow-lg shadow-slate-900/5"
            >
              <CardHeader className="space-y-3">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {step.step}
                </div>
                <CardTitle className="text-base">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

