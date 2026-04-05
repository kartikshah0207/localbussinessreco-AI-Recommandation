import { MouseEvent } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const INTEREST_CATEGORIES = [
  "Cafes",
  "Restaurants",
  "Salons",
  "Gyms",
  "Shopping",
  "Bars",
  "Bakeries"
];

interface InterestSelectorProps {
  selected: string[];
  onChange: (next: string[]) => void;
}

export function InterestSelector({ selected, onChange }: InterestSelectorProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>, value: string) => {
    event.preventDefault();
    toggle(value);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {INTEREST_CATEGORIES.map((category) => {
        const isActive = selected.includes(category);

        return (
          <Card
            key={category}
            role="button"
            tabIndex={0}
            onClick={(event) => handleClick(event, category)}
            className={`group cursor-pointer border transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${
              isActive
                ? "border-primary bg-primary/5"
                : "border-border bg-background/80"
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>{category}</span>
                <span
                  className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                    isActive
                      ? "border-primary bg-primary"
                      : "border-border bg-background group-hover:border-primary/60"
                  }`}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground">
              Tap to {isActive ? "remove from" : "add to"} your interests.
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

