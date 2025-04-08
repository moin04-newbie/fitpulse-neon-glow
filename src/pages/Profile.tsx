
import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { UserCircle, Settings, Bell, Shield, Mail, Gift, Edit, Calendar, MapPin, Weight, Ruler, Heart } from "lucide-react";
import { userData } from "@/data/mockData";

export default function Profile() {
  const user = {
    name: "Alex Johnson",
    username: "alexfit",
    email: "alex@example.com",
    joined: "January 2023",
    location: "San Francisco, CA",
    height: 178, // cm
    weight: 68.5, // kg
    birthdate: "May 12, 1990",
    gender: "Male",
    fitnessLevel: "Intermediate",
    primaryGoal: "Build Muscle",
    secondaryGoal: "Improve Cardio",
    completedWorkouts: 175,
    achievements: 28,
    preferences: {
      notificationsEnabled: true,
      darkMode: true,
      metricUnits: true,
      weeklyReports: true,
      shareActivity: false,
    }
  };
  
  return (
    <MainLayout pageTitle="Profile" pageDescription="Manage your account settings">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Summary */}
        <DashboardCard
          className="md:col-span-3 p-0 overflow-hidden"
          animation="fade-in"
          delay={0}
        >
          <div className="relative h-48 bg-gradient-to-r from-primary/30 to-accent/30">
            <div className="absolute -bottom-16 left-6 bg-background rounded-full p-1 shadow-lg">
              <div className="relative w-32 h-32 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                <UserCircle className="w-full h-full text-muted-foreground/50" />
                <button className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground py-1 text-xs font-medium opacity-80 hover:opacity-100 transition-opacity">
                  Change
                </button>
              </div>
            </div>
            <button className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          
          <div className="mt-16 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
              
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold">{user.completedWorkouts}</div>
                  <div className="text-xs text-muted-foreground">Workouts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{user.achievements}</div>
                  <div className="text-xs text-muted-foreground">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">18</div>
                  <div className="text-xs text-muted-foreground">Weeks</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { icon: <Calendar className="h-4 w-4" />, label: "Member Since", value: user.joined },
                { icon: <MapPin className="h-4 w-4" />, label: "Location", value: user.location },
                { icon: <Mail className="h-4 w-4" />, label: "Email", value: user.email },
                { icon: <Gift className="h-4 w-4" />, label: "Birthday", value: user.birthdate },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
        
        {/* Physical Stats */}
        <DashboardCard
          title="Physical Stats"
          icon={<Ruler className="h-5 w-5" />}
          animation="fade-in"
          delay={1}
        >
          <div className="space-y-4 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-muted/70 p-2 rounded-full">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm">Weight</div>
                  <div className="text-sm text-muted-foreground">Goal: {userData.goals.weight}kg</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">{user.weight} kg</div>
                <div className="text-xs text-green-500">-0.5 kg this week</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-muted/70 p-2 rounded-full">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm">Height</div>
                </div>
              </div>
              <div className="text-lg font-medium">{user.height} cm</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-muted/70 p-2 rounded-full">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm">BMI</div>
                  <div className="text-sm text-muted-foreground">Healthy: 18.5-24.9</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">{(user.weight / Math.pow(user.height/100, 2)).toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Normal</div>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        {/* Fitness Profile */}
        <DashboardCard
          title="Fitness Profile"
          icon={<Activity className="h-5 w-5" />}
          animation="fade-in"
          delay={2}
        >
          <div className="space-y-4 py-2">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Fitness Level</div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm">{user.fitnessLevel}</span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-2">Primary Goal</div>
              <div className="bg-primary/10 text-primary px-3 py-2 rounded-md">
                {user.primaryGoal}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-2">Secondary Goal</div>
              <div className="bg-accent/10 text-accent px-3 py-2 rounded-md">
                {user.secondaryGoal}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-2">Preferred Workout Types</div>
              <div className="flex flex-wrap gap-2">
                {["Strength", "HIIT", "Running"].map((type) => (
                  <div key={type} className="bg-muted/70 px-3 py-1 rounded-full text-xs">
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>
        
        {/* Account Settings */}
        <DashboardCard
          title="Account Settings"
          icon={<Settings className="h-5 w-5" />}
          animation="fade-in"
          delay={3}
          className="md:col-span-3"
        >
          <div className="grid md:grid-cols-3 gap-6 py-2">
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </h4>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-muted/50 hover:bg-muted rounded-md text-sm transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-2 bg-muted/50 hover:bg-muted rounded-md text-sm transition-colors">
                  Two-Factor Authentication
                </button>
                <button className="w-full text-left px-4 py-2 bg-muted/50 hover:bg-muted rounded-md text-sm transition-colors">
                  Connected Devices
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Push Notifications", enabled: user.preferences.notificationsEnabled },
                  { label: "Email Notifications", enabled: true },
                  { label: "Weekly Reports", enabled: user.preferences.weeklyReports },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2 bg-muted/50 rounded-md">
                    <span className="text-sm">{item.label}</span>
                    <div className={`w-8 h-4 rounded-full ${item.enabled ? 'bg-green-500' : 'bg-muted'} relative transition-colors`}>
                      <div className={`absolute top-0.5 ${item.enabled ? 'right-0.5' : 'left-0.5'} w-3 h-3 rounded-full bg-background shadow-sm transition-all`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Dark Mode", enabled: user.preferences.darkMode },
                  { label: "Metric Units", enabled: user.preferences.metricUnits },
                  { label: "Share Activity", enabled: user.preferences.shareActivity },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2 bg-muted/50 rounded-md">
                    <span className="text-sm">{item.label}</span>
                    <div className={`w-8 h-4 rounded-full ${item.enabled ? 'bg-green-500' : 'bg-muted'} relative transition-colors`}>
                      <div className={`absolute top-0.5 ${item.enabled ? 'right-0.5' : 'left-0.5'} w-3 h-3 rounded-full bg-background shadow-sm transition-all`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </MainLayout>
  );
}
