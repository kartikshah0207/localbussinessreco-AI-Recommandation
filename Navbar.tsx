import { MapPin } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { useAuth } from "../../providers/AuthProvider";

interface NavbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  SearchInput?: React.ReactNode;
}

export function Navbar({ SearchInput }: NavbarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center gap-4">
        <Link to="/app" className="flex items-center gap-2 font-semibold">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">Local Business Recs</span>
        </Link>
        <div className="flex-1 hidden sm:flex items-center justify-center">
          {SearchInput}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-3 text-sm">
            <NavLink
              to="/app"
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Discover
            </NavLink>
            <NavLink
              to="/app/profile"
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Profile
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/app/profile")}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-2 py-1 text-xs text-muted-foreground hover:bg-muted/70 transition-colors"
            >
              <Avatar className="h-7 w-7" alt="User" />
              <span className="hidden md:inline">Account</span>
            </button>
            <Button
              type="button"
              variant="ghost"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

