
import { MainLayout } from "@/components/MainLayout";

export default function Calendar() {
  return (
    <MainLayout pageTitle="Calendar" pageDescription="View your fitness schedule">
      <div className="grid gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-lg font-medium mb-4">My Schedule</h2>
          <p className="text-muted-foreground">Calendar data will be displayed here.</p>
          <div className="h-64 flex items-center justify-center bg-sidebar/10 rounded-md mt-4">
            <p className="text-muted-foreground">Mock calendar placeholder</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
