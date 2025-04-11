import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { HydrationTracker } from "./HydrationTracker";
import { HydrationLog } from "./HydrationLog";
import { WeeklyProgress } from "./WeeklyProgress";
import { HydrationTips } from "./HydrationTips";
import { useHydration } from "./useHydration";
import { HydrationIcon } from "./HydrationIcon";

export default function HydrationContainer() {
  const {
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
  } = useHydration();
  
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
            <HydrationTracker 
              animatedWater={animatedWater}
              waterGoal={waterGoal}
              waterCompletion={waterCompletion}
            />
            
            <div className="flex flex-col">
              <h3 className="text-md font-medium mb-3">Quick Add</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { amount: 250, label: "Small Glass", icon: "small" },
                  { amount: 350, label: "Medium Glass", icon: "medium" },
                  { amount: 500, label: "Large Glass", icon: "large" },
                  { amount: 750, label: "Water Bottle", icon: "bottle" },
                ].map((item) => (
                  <button
                    key={item.amount}
                    onClick={() => addWater(item.amount)}
                    className="flex flex-col items-center justify-center p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <div className="bg-primary/10 text-primary rounded-full p-2 mb-2">
                      <HydrationIcon type={item.icon} />
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
                  <HydrationIcon type="plus" />
                  <span>Custom Amount</span>
                </button>
              )}
            </div>
          </div>
        </DashboardCard>
        
        {/* Today's log */}
        <HydrationLog 
          intakeLog={intakeLog} 
          setShowCustomInput={setShowCustomInput} 
        />
        
        {/* Weekly progress */}
        <WeeklyProgress waterHistory={waterHistory} waterGoal={waterGoal} />
        
        {/* Hydration tips */}
        <HydrationTips hydrationTips={hydrationTips} tipIndex={tipIndex} />
      </div>
    </MainLayout>
  );
}
