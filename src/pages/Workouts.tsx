
import { MainLayout } from "@/components/MainLayout";

export default function Workouts() {
  return (
    <MainLayout pageTitle="Workouts" pageDescription="View and manage your workout routines">
      <div className="grid gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-lg font-medium mb-4">My Workouts</h2>
          <p className="text-muted-foreground">Workout data will be displayed here.</p>
          <div className="h-64 flex items-center justify-center bg-sidebar/10 rounded-md mt-4">
            <p className="text-muted-foreground">Mock workout list placeholder</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
