import { Link } from "react-router-dom";

import { Button } from "../ui/button";

export function CTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-800 px-6 py-10 sm:px-10 sm:py-14 text-center text-primary-foreground shadow-xl">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Ready to see what&apos;s around you?
            </h2>
            <p className="text-sm sm:text-base text-slate-200/80">
              Create your account in minutes, tell us what you like once, and let the
              recommendation engine handle your next coffee, dinner, or haircut.
            </p>
            <Button
              asChild
              className="mt-4 rounded-full px-6"
              size="lg"
            >
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

