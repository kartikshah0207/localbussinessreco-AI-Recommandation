import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { registerUser } from "../services/authApi";
import { useAuth } from "../providers/AuthProvider";

const INTEREST_OPTIONS = ["Cafes", "Restaurants", "Salons", "Gyms", "Shopping"];

export function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (value: string) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await registerUser({ name, email, password, interests });
      login(res.user, res.token);
      navigate("/onboarding");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Unable to sign up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <Card className="rounded-2xl border-border/80 shadow-lg shadow-slate-900/10">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl">
              Create your account
            </CardTitle>
            <CardDescription>
              Save your favorite places and get better recommendations over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Alex Parker"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((opt) => {
                    const active = interests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                          active
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-muted/40 text-muted-foreground border-border/60 hover:border-primary/40"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
              {error && (
                <p className="text-xs text-red-500">
                  {error}
                </p>
              )}
              <Button
                className="w-full rounded-full mt-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

