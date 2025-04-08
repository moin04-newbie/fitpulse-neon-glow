
import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

export function MainLayout({ 
  children, 
  pageTitle, 
  pageDescription 
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 pl-16 lg:pl-64 min-h-screen">
        <div className="container p-6 max-w-7xl mx-auto">
          {(pageTitle || pageDescription) && (
            <div className="mb-8">
              {pageTitle && (
                <h1 className="text-3xl font-heading font-bold">{pageTitle}</h1>
              )}
              {pageDescription && (
                <p className="text-muted-foreground mt-2">{pageDescription}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
