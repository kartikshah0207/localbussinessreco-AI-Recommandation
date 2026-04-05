import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { loginUser } from "../services/authApi";
import { useAuth } from "../providers/AuthProvider";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await loginUser({ email, password });
      login(res.user, res.token);
      navigate("/app");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Unable to log in. Please try again.");
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
              Welcome back
            </CardTitle>
            <CardDescription>
              Log in to access your personalized local recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form className="space-y-5" onSubmit={handleSubmit}>
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
              {error && (
                <p className="text-xs text-red-500">
                  {error}
                </p>
              )}
              <Button className="w-full rounded-full mt-2" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center">
              New here?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

