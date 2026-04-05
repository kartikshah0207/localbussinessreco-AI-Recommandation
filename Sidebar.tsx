import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="hidden md:block w-56 border-r border-border bg-muted/40">
      <div className="p-4 space-y-4 text-sm">
        <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide">
          Browse
        </p>
        <nav className="space-y-2">
          <NavLink
            to="/app"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            Recommended
          </NavLink>
          <NavLink
            to="/app/discover"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            Discover
          </NavLink>
          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            Saved &amp; Profile
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

