
import { MainLayout } from "@/components/MainLayout";

export default function Recovery() {
  return (
    <MainLayout pageTitle="Recovery" pageDescription="Track your sleep and recovery metrics">
      <div className="grid gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-lg font-medium mb-4">Sleep & Recovery</h2>
          <p className="text-muted-foreground">Recovery data will be displayed here.</p>
          <div className="h-64 flex items-center justify-center bg-sidebar/10 rounded-md mt-4">
            <p className="text-muted-foreground">Mock sleep cycle placeholder</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
