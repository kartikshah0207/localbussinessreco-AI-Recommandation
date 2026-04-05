import { ReactNode, useState } from "react";

import { Input } from "../ui/input";
import { Navbar } from "./Navbar";
import { PageContainer } from "./PageContainer";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [search, setSearch] = useState("");

  // In a later iteration, `search` can be lifted into context
  // or routed into specific pages. For now we keep it local.

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        SearchInput={
          <div className="w-full max-w-sm">
            <Input
              placeholder="Search nearby cafes, restaurants..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        }
      />
      <div className="flex flex-1">
        <Sidebar />
        <PageContainer>
          {children}
        </PageContainer>
      </div>
    </div>
  );
}

