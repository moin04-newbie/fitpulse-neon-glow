
import { MainLayout } from "@/components/MainLayout";

export default function Profile() {
  return (
    <MainLayout pageTitle="Profile" pageDescription="Manage your account settings">
      <div className="grid gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6 animate-fade-in">
          <h2 className="text-lg font-medium mb-4">My Profile</h2>
          <p className="text-muted-foreground">Profile data will be displayed here.</p>
          <div className="h-64 flex items-center justify-center bg-sidebar/10 rounded-md mt-4">
            <p className="text-muted-foreground">Mock profile settings placeholder</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
