import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { OnboardingLayout } from "../components/onboarding/OnboardingLayout";
import { OnboardingProgress } from "../components/onboarding/OnboardingProgress";
import { OnboardingStep } from "../components/onboarding/OnboardingStep";
import { InterestSelector } from "../components/onboarding/InterestSelector";
import { PreferenceSelector } from "../components/onboarding/PreferenceSelector";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const TOTAL_STEPS = 4;

const PREVIEW_BUSINESSES = [
  { name: "Cafe Brew", category: "Cafe", rating: 4.6, distance: "1.2 km" },
  { name: "Urban Coffee", category: "Cafe", rating: 4.5, distance: "0.8 km" },
  { name: "Pizza Hub", category: "Restaurant", rating: 4.4, distance: "2.1 km" }
];

export function Onboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [rating, setRating] = useState("");
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState("");

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      if (step === 2) {
        try {
          localStorage.setItem("jaadu_interests", JSON.stringify(interests));
        } catch {
          // ignore storage failures (private mode / disabled storage)
        }
      }
      setStep((prev) => prev + 1);
    } else {
      navigate("/app");
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const canContinue =
    step === 2 ? interests.length > 0 : true;

  const stepLabel = `Step ${step} of ${TOTAL_STEPS}`;

  const title =
    step === 1
      ? "Welcome to Local Business Recs"
      : step === 2
        ? "What types of places do you usually visit?"
        : step === 3
          ? "Tell us a bit about your preferences"
          : "Your recommendations are ready";

  const description =
    step === 1
      ? "Let's personalize your recommendations."
      : step === 2
        ? "Pick a few categories so we can tailor the first set of places we show you."
        : step === 3
          ? "We’ll start with these defaults and refine them as you explore."
          : "Here’s a quick preview of the kind of places we’ll surface for you.";

  const footer = (
    <div className="flex items-center justify-between">
      <button
        type="button"
        className="text-xs text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/app")}
      >
        Skip for now
      </button>
      <div className="flex gap-2">
        {step > 1 && (
          <Button type="button" variant="outline" onClick={goBack}>
            Back
          </Button>
        )}
        <Button type="button" disabled={!canContinue} onClick={goNext}>
          {step === TOTAL_STEPS ? "Go to dashboard" : "Continue"}
        </Button>
      </div>
    </div>
  );

  return (
    <OnboardingLayout
      stepLabel={stepLabel}
      title={title}
      description={description}
      progress={<OnboardingProgress currentStep={step} totalSteps={TOTAL_STEPS} />}
      footer={footer}
    >
      <OnboardingStep>
        {step === 1 && (
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              In just a few quick steps, we&apos;ll learn what kinds of spots you enjoy so we
              can surface cafes, restaurants, salons, gyms, and more that actually fit your day.
            </p>
            <p>
              You can always adjust these preferences later from your profile.
            </p>
          </div>
        )}

        {step === 2 && (
          <InterestSelector selected={interests} onChange={setInterests} />
        )}

        {step === 3 && (
          <PreferenceSelector
            rating={rating}
            distance={distance}
            price={price}
            onRatingChange={setRating}
            onDistanceChange={setDistance}
            onPriceChange={setPrice}
          />
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {PREVIEW_BUSINESSES.map((business) => (
                <Card
                  key={business.name}
                  className="rounded-xl border-border/70 bg-background/80 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{business.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-xs text-muted-foreground space-y-1.5">
                    <p>{business.category}</p>
                    <p>⭐ {business.rating.toFixed(1)}</p>
                    <p>{business.distance} away</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Once you land on your dashboard, we&apos;ll use your interests and preferences to
              fine-tune recommendations just for you.
            </p>
          </div>
        )}
      </OnboardingStep>
    </OnboardingLayout>
  );
}

