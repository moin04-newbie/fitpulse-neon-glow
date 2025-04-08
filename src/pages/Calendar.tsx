
import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { CalendarClock, Clock, Dumbbell, Users } from "lucide-react";
import { calendarEvents } from "@/data/mockData";
import { useState } from "react";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Format the date as Month Year
  const currentMonth = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  
  // Generate array of days for current month
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  const calendarDays = [...blankDays, ...daysArray];
  
  // Get today's date
  const today = new Date();
  const isCurrentMonth = today.getMonth() === selectedDate.getMonth() && today.getFullYear() === selectedDate.getFullYear();
  const currentDay = today.getDate();
  
  // Navigate to previous or next month
  const goToPrevMonth = () => {
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  // Get events for the currently selected date
  const todayEvents = calendarEvents.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.getDate() === selectedDate.getDate() && 
           eventDate.getMonth() === selectedDate.getMonth() && 
           eventDate.getFullYear() === selectedDate.getFullYear();
  });
  
  // Get type-based color
  const getEventColor = (type: string) => {
    switch(type) {
      case 'workout': return 'bg-green-500/10 text-green-500';
      case 'appointment': return 'bg-blue-500/10 text-blue-500';
      case 'event': return 'bg-purple-500/10 text-purple-500';
      case 'personal': return 'bg-amber-500/10 text-amber-500';
      default: return 'bg-primary/10 text-primary';
    }
  };
  
  // Check if a day has events
  const dayHasEvents = (day: number) => {
    return calendarEvents.some(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === selectedDate.getMonth() && 
             eventDate.getFullYear() === selectedDate.getFullYear();
    });
  };
  
  return (
    <MainLayout pageTitle="Calendar" pageDescription="View your fitness schedule">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <DashboardCard 
            title={currentMonth} 
            icon={<CalendarClock className="h-5 w-5" />}
            className="animate-fade-in"
            variant="elevated"
            rightContent={
              <div className="flex space-x-2">
                <button 
                  onClick={goToPrevMonth}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={goToNextMonth}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            }
          >
            {/* Calendar header */}
            <div className="grid grid-cols-7 text-center text-sm font-medium text-muted-foreground mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={i} className="py-2">{day}</div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1 text-sm">
              {calendarDays.map((day, i) => (
                <div 
                  key={i}
                  className={`
                    aspect-square rounded-md flex flex-col justify-center items-center relative
                    ${day ? 'hover:bg-muted/50 cursor-pointer transition-colors' : ''}
                    ${day && isCurrentMonth && day === currentDay ? 'bg-primary text-primary-foreground' : ''}
                  `}
                  onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                >
                  {day && (
                    <>
                      <span>{day}</span>
                      {/* Event indicator */}
                      {dayHasEvents(day) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent absolute bottom-1"></div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
        
        <div className="md:col-span-1">
          <DashboardCard 
            title={selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} 
            icon={<Clock className="h-5 w-5" />}
            className="animate-fade-in"
            delay={1}
          >
            <div className="space-y-3 pt-2">
              {todayEvents.length > 0 ? (
                todayEvents.map((event) => {
                  const startTime = new Date(event.start).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  });
                  const endTime = new Date(event.end).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  });
                  
                  return (
                    <div key={event.id} className={`p-3 rounded-lg ${getEventColor(event.type)} transition-all`}>
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="text-xs bg-background/20 rounded-full px-2 py-0.5">
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{startTime} - {endTime}</p>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <p>No events scheduled for this day</p>
                </div>
              )}
            </div>
          </DashboardCard>
        </div>
        
        <DashboardCard 
          title="Upcoming Workouts" 
          icon={<Dumbbell className="h-5 w-5" />}
          className="animate-fade-in md:col-span-2"
          delay={2}
        >
          <div className="divide-y divide-border">
            {calendarEvents.filter(e => e.type === 'workout').slice(0, 5).map((event) => {
              const eventDate = new Date(event.start);
              
              return (
                <div key={event.id} className="py-3 px-2 flex items-center space-x-4">
                  <div className="bg-green-500/10 text-green-500 rounded-full p-2 flex-shrink-0">
                    <Dumbbell className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {eventDate.toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric' 
                      })} at {eventDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>
                  <button className="px-3 py-1 text-xs bg-primary/10 hover:bg-primary/20 rounded-full transition-colors">
                    Details
                  </button>
                </div>
              );
            })}
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Group Activities" 
          icon={<Users className="h-5 w-5" />}
          className="animate-fade-in"
          delay={3}
        >
          <div className="space-y-3 p-2">
            <div className="bg-purple-500/10 text-purple-500 p-3 rounded-lg">
              <h4 className="font-medium">Morning Run Club</h4>
              <p className="text-sm mt-1">Saturday 6:30 AM</p>
              <div className="flex -space-x-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">JD</div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">MP</div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">KL</div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">+4</div>
              </div>
            </div>
            
            <div className="bg-amber-500/10 text-amber-500 p-3 rounded-lg">
              <h4 className="font-medium">Yoga at the Park</h4>
              <p className="text-sm mt-1">Sunday 10:00 AM</p>
              <div className="flex -space-x-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">AL</div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">RJ</div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">+2</div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </MainLayout>
  );
}
