
import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Droplets, Plus, Calendar, TrendingUp, Droplet, Clock, BarChart3 } from "lucide-react";
import { ProgressRing } from "@/components/ProgressRing";
import { useState, useEffect } from "react";
import { userData } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Hydration() {
  const [animatedWater, setAnimatedWater] = useState(0);
  const [waterIntake, setWaterIntake] = useState(1800); // ml
  const [intakeLog, setIntakeLog] = useState([
    { time: "7:30 AM", amount: 350, type: "Water" },
    { time: "9:45 AM", amount: 250, type: "Coffee" },
    { time: "12:15 PM", amount: 500, type: "Water" },
    { time: "3:30 PM", amount: 350, type: "Water" },
    { time: "5:45 PM", amount: 350, type: "Tea" },
  ]);
  const [customAmount, setCustomAmount] = useState(0);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const { toast } = useToast();
  
  const waterGoal = userData.goals.water; // ml
  const waterCompletion = (waterIntake / waterGoal) * 100;
  
  const waterHistory = [
    { day: "Mon", amount: 2100, goal: waterGoal },
    { day: "Tue", amount: 1950, goal: waterGoal },
    { day: "Wed", amount: 2300, goal: waterGoal },
    { day: "Thu", amount: 1700, goal: waterGoal },
    { day: "Fri", amount: 1800, goal: waterGoal },
    { day: "Sat", amount: 2050, goal: waterGoal },
    { day: "Sun", amount: 2200, goal: waterGoal },
  ];
  
  // Hydration tips with state to rotate them
  const [tipIndex, setTipIndex] = useState(0);
  const hydrationTips = [
    {
      title: "Morning Routine",
      tip: "Drink a glass of water immediately after waking up to boost metabolism.",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: "Consistent Reminders",
      tip: "Set regular reminders to drink water throughout your day.",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Water-Rich Foods",
      tip: "Eat fruits with high water content like watermelon and cucumber.",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Hydration Schedule",
      tip: "Drink 2 cups before each meal and 1 cup between meals to stay hydrated.",
      icon: <Droplet className="h-5 w-5" />
    },
    {
      title: "Quality Over Quantity",
      tip: "Sip water slowly throughout the day rather than chugging all at once.",
      icon: <Droplets className="h-5 w-5" />
    }
  ];
  
  // Auto-rotate hydration tips every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % hydrationTips.length);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [hydrationTips.length]);
  
  // Simulate real-time hydration data with small random fluctuations
  useEffect(() => {
    const realTimeUpdate = setInterval(() => {
      // Small random chance of auto-adding a small amount of water (simulating passive tracking)
      if (Math.random() < 0.05) {
        const smallAmount = Math.floor(Math.random() * 50) + 30;
        addWater(smallAmount, true);
      }
    }, 30000);
    
    return () => clearInterval(realTimeUpdate);
  }, []);
  
  useEffect(() => {
    const waterInterval = setInterval(() => {
      setAnimatedWater(prev => {
        if (prev < waterIntake) {
          return Math.min(prev + Math.ceil(waterIntake / 40), waterIntake);
        }
        clearInterval(waterInterval);
        return prev;
      });
    }, 30);
    
    return () => {
      clearInterval(waterInterval);
    };
  }, [waterIntake]);
  
  const addWater = (amount: number, isAutomatic = false) => {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    setWaterIntake(prev => prev + amount);
    
    // Add to log
    if (!isAutomatic) {
      setIntakeLog(prev => [
        { time: formattedTime, amount, type: "Water" },
        ...prev
      ]);
      
      // Show toast notification
      toast({
        title: "Hydration tracked!",
        description: `Added ${amount}ml of water to your daily total.`,
      });
    }
    
    // Random chance to show an encouraging message when goal is close
    const newTotal = waterIntake + amount;
    if (newTotal >= waterGoal * 0.85 && newTotal < waterGoal && Math.random() > 0.5) {
      setTimeout(() => {
        toast({
          title: "Almost there!",
          description: `You're nearly at your daily hydration goal!`,
        });
      }, 1500);
    } else if (newTotal >= waterGoal && newTotal < waterGoal + amount) {
      // Congratulate on reaching the goal
      setTimeout(() => {
        toast({
          title: "Goal achieved! 🎉",
          description: `You've reached your daily hydration goal of ${waterGoal/1000}L!`,
        });
      }, 1500);
    }
  };
  
  const handleCustomAmountSubmit = () => {
    if (customAmount > 0) {
      addWater(customAmount);
      setCustomAmount(0);
      setShowCustomInput(false);
    }
  };
  
  return (
    <MainLayout pageTitle="Hydration" pageDescription="Track your daily water intake">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Water tracking card */}
        <DashboardCard 
          className="md:col-span-2"
          animation="fade-in"
          delay={0}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium mb-4">Today's Hydration</h2>
              <div className="hydration-glass w-32 h-56 flex items-center justify-center mb-6">
                <div 
                  className="hydration-water h-0" 
                  style={{"--water-level": `${waterCompletion}%`} as React.CSSProperties}
                ></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl font-bold">{(animatedWater / 1000).toFixed(1)}L</div>
                  <div className="text-sm text-muted-foreground">
                    of {(waterGoal / 1000).toFixed(1)}L
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground mb-4">
                {waterCompletion.toFixed(0)}% of daily goal
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-md font-medium mb-3">Quick Add</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { amount: 250, label: "Small Glass", icon: <Droplets size={16} /> },
                  { amount: 350, label: "Medium Glass", icon: <Droplets size={16} /> },
                  { amount: 500, label: "Large Glass", icon: <Droplets size={16} /> },
                  { amount: 750, label: "Water Bottle", icon: <Droplets size={16} /> },
                ].map((item) => (
                  <button
                    key={item.amount}
                    onClick={() => addWater(item.amount)}
                    className="flex flex-col items-center justify-center p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <div className="bg-primary/10 text-primary rounded-full p-2 mb-2">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.amount}ml</span>
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </button>
                ))}
              </div>
              
              {showCustomInput ? (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={customAmount || ''}
                      onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter amount (ml)"
                      min="1"
                      max="2000"
                    />
                    <button 
                      onClick={handleCustomAmountSubmit}
                      className="py-2 px-4 bg-primary text-primary-foreground rounded-md"
                    >
                      Add
                    </button>
                  </div>
                  <button 
                    onClick={() => setShowCustomInput(false)}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md flex items-center justify-center space-x-2 text-sm"
                >
                  <Plus size={16} />
                  <span>Custom Amount</span>
                </button>
              )}
            </div>
          </div>
        </DashboardCard>
        
        {/* Today's log */}
        <DashboardCard 
          title="Today's Log" 
          icon={<Clock className="h-5 w-5" />}
          animation="fade-in"
          delay={1}
        >
          <div className="divide-y divide-border/50 max-h-[300px] overflow-y-auto">
            {intakeLog.map((entry, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{entry.time}</div>
                  <div className="text-xs text-muted-foreground">{entry.type}</div>
                </div>
                <div className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded text-sm">
                  {entry.amount}ml
                </div>
              </div>
            ))}
          </div>
          <button 
            className="w-full mt-3 py-2 text-sm text-primary hover:underline flex items-center justify-center"
            onClick={() => setShowCustomInput(true)}
          >
            <Plus size={16} className="mr-1" />
            Add Entry
          </button>
        </DashboardCard>
        
        {/* Weekly progress */}
        <DashboardCard 
          title="Weekly Progress" 
          icon={<BarChart3 className="h-5 w-5" />}
          animation="fade-in"
          delay={2}
          className="md:col-span-3"
        >
          <div className="h-64 grid grid-cols-7 items-end gap-3 p-4">
            {waterHistory.map((day) => {
              const percentage = (day.amount / day.goal) * 100;
              const height = `${Math.max(5, Math.min(100, percentage))}%`;
              
              return (
                <div key={day.day} className="flex flex-col items-center h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div 
                      className={`w-full bg-blue-500/20 rounded-t-md relative ${
                        percentage >= 100 ? 'bg-green-500/30' : ''
                      }`}
                      style={{ height }}
                    >
                      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-blue-500/20 rounded-t-md overflow-hidden">
                        <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-blue-500/40 to-transparent"></div>
                      </div>
                      <div className="absolute -top-7 inset-x-0 text-center text-xs">
                        {Math.round(percentage)}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs">{day.day}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex justify-between text-xs text-muted-foreground px-4">
            <div>Last 7 days average: {Math.round(waterHistory.reduce((acc, day) => acc + day.amount, 0) / 7 / 100) / 10}L</div>
            <div>Goal: {waterGoal / 1000}L daily</div>
          </div>
        </DashboardCard>
        
        {/* Hydration tips */}
        <DashboardCard
          title="Hydration Tips"
          icon={<Droplet className="h-5 w-5 text-blue-500" />}
          animation="fade-in"
          delay={3}
          className="md:col-span-3"
          variant="gradient"
        >
          <div className="grid md:grid-cols-3 gap-4 p-2">
            {hydrationTips.slice(tipIndex, tipIndex + 3).map((item, i) => (
              <div key={i} className="bg-background/80 backdrop-blur-sm p-4 rounded-lg transform transition-all hover:scale-[1.03]">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full mr-2">
                    {item.icon}
                  </div>
                  <h4 className="font-medium">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{item.tip}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </MainLayout>
  );
}
