import { LandingNavbar } from "../components/landing/Navbar";
import { CTA } from "../components/landing/CTA";
import { FeaturedBusinesses } from "../components/landing/FeaturedBusinesses";
import { Features } from "../components/landing/Features";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Stats } from "../components/landing/Stats";

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <FeaturedBusinesses />
        <CTA />
      </main>
    </div>
  );
}

