
import { MainLayout } from "@/components/MainLayout";

export default function Analytics() {
  return (
    <MainLayout pageTitle="Analytics" pageDescription="Track your fitness progress over time">
      <div className="grid gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-lg font-medium mb-4">Your Progress</h2>
          <p className="text-muted-foreground">Analytics data will be displayed here.</p>
          <div className="h-64 flex items-center justify-center bg-sidebar/10 rounded-md mt-4">
            <p className="text-muted-foreground">Mock chart placeholder</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
