
import { MainLayout } from "@/components/MainLayout";

export default function Vitals() {
  return (
    <MainLayout pageTitle="Vitals" pageDescription="Monitor your health metrics">
      <div className="grid gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-lg font-medium mb-4">Health Metrics</h2>
          <p className="text-muted-foreground">Vitals data will be displayed here.</p>
          <div className="h-64 flex items-center justify-center bg-sidebar/10 rounded-md mt-4">
            <p className="text-muted-foreground">Mock vitals monitor placeholder</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
