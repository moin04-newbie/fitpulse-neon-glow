
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { userData } from "@/data/mockData";
import { Calendar, Clock, TrendingUp, Droplet, Droplets } from "lucide-react";

export function useHydration() {
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

  return {
    animatedWater,
    waterIntake,
    intakeLog,
    customAmount,
    showCustomInput,
    setCustomAmount,
    setShowCustomInput,
    waterGoal,
    waterCompletion,
    waterHistory,
    tipIndex,
    hydrationTips,
    addWater,
    handleCustomAmountSubmit
  };
}
