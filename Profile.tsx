import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BusinessList } from "../components/business/BusinessList";
import { Avatar } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useAuth } from "../providers/AuthProvider";
import { useRecommendations } from "../hooks/useRecommendations";
import type { UserProfile } from "../types";

const MOCK_PROFILE: UserProfile = {
  name: "Alex Parker",
  avatarUrl: undefined,
  interests: ["Coffee", "Brunch", "Outdoor seating", "Remote work friendly"],
  savedBusinesses: []
};

export function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: recommended, isLoading, error } = useRecommendations();
  const [activeTab, setActiveTab] = useState<"saved" | "preferences">("saved");

  const savedBusinesses = useMemo(
    () => recommended?.slice(0, 3) ?? [],
    [recommended]
  );

  return (
    <section className="space-y-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar src={MOCK_PROFILE.avatarUrl} alt={MOCK_PROFILE.name} />
            <div>
              <CardTitle>{MOCK_PROFILE.name}</CardTitle>
              <CardDescription>
                Tuning recommendations based on your favorite local spots.
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex flex-wrap gap-2 justify-end">
              {MOCK_PROFILE.interests.map((interest) => (
                <Badge key={interest}>{interest}</Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="text-xs"
                onClick={() => navigate("/onboarding")}
              >
                Rerun onboarding
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Log out
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "saved" | "preferences")}>
          <TabsList>
            <TabsTrigger
              isActive={activeTab === "saved"}
              type="button"
              onClick={() => setActiveTab("saved")}
            >
              Saved places
            </TabsTrigger>
            <TabsTrigger
              isActive={activeTab === "preferences"}
              type="button"
              onClick={() => setActiveTab("preferences")}
            >
              Preferences
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "saved" ? (
          <BusinessList
            businesses={savedBusinesses}
            isLoading={isLoading}
            error={error}
            emptyMessage="You haven't saved any businesses yet. As you explore, your favorites will appear here."
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Preferences overview</CardTitle>
              <CardDescription>
                These high-level preferences influence your future recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                We&apos;ll prioritize cozy cafes, brunch spots, and places that are friendly
                for working remotely.
              </p>
              <p>
                As you save or dismiss places, this page will evolve to reflect the types of
                businesses you enjoy most.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

