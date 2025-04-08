
// Mock user data
export const userData = {
  id: 1,
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  age: 28,
  height: 175, // cm
  weight: 68.5, // kg
  goals: {
    steps: 10000,
    calories: 2500,
    water: 2000, // ml
    sleep: 8, // hours
    workouts: 5, // per week
  },
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  joinDate: "2023-05-15",
  preferences: {
    notifications: true,
    theme: "dark",
    units: "metric",
    reminderFrequency: "hourly",
  },
};

// Activity data for the past 7 days
export const weeklyActivityData = [
  {
    date: "2025-04-01",
    steps: 8743,
    caloriesBurned: 2271,
    activeMinutes: 78,
    distance: 6.2, // km
    heartRate: {
      min: 58,
      max: 142,
      avg: 72,
    },
    sleep: {
      duration: 7.3, // hours
      quality: "good",
      cycles: 4,
      deepSleep: 2.1, // hours
      remSleep: 1.7, // hours
    },
    water: 1800, // ml
  },
  {
    date: "2025-04-02",
    steps: 10236,
    caloriesBurned: 2532,
    activeMinutes: 94,
    distance: 7.4,
    heartRate: {
      min: 56,
      max: 158,
      avg: 75,
    },
    sleep: {
      duration: 6.9,
      quality: "average",
      cycles: 4,
      deepSleep: 1.8,
      remSleep: 1.6,
    },
    water: 2100,
  },
  {
    date: "2025-04-03",
    steps: 7832,
    caloriesBurned: 2175,
    activeMinutes: 65,
    distance: 5.6,
    heartRate: {
      min: 57,
      max: 136,
      avg: 71,
    },
    sleep: {
      duration: 8.2,
      quality: "excellent",
      cycles: 5,
      deepSleep: 2.5,
      remSleep: 2.1,
    },
    water: 1950,
  },
  {
    date: "2025-04-04",
    steps: 12453,
    caloriesBurned: 2876,
    activeMinutes: 110,
    distance: 8.9,
    heartRate: {
      min: 55,
      max: 172,
      avg: 79,
    },
    sleep: {
      duration: 7.5,
      quality: "good",
      cycles: 4,
      deepSleep: 2.3,
      remSleep: 1.8,
    },
    water: 2300,
  },
  {
    date: "2025-04-05",
    steps: 9547,
    caloriesBurned: 2412,
    activeMinutes: 87,
    distance: 6.8,
    heartRate: {
      min: 56,
      max: 145,
      avg: 73,
    },
    sleep: {
      duration: 7.8,
      quality: "good",
      cycles: 5,
      deepSleep: 2.4,
      remSleep: 1.9,
    },
    water: 2000,
  },
  {
    date: "2025-04-06",
    steps: 6321,
    caloriesBurned: 1987,
    activeMinutes: 54,
    distance: 4.5,
    heartRate: {
      min: 58,
      max: 128,
      avg: 68,
    },
    sleep: {
      duration: 8.5,
      quality: "excellent",
      cycles: 5,
      deepSleep: 2.7,
      remSleep: 2.3,
    },
    water: 1600,
  },
  {
    date: "2025-04-07",
    steps: 11285,
    caloriesBurned: 2743,
    activeMinutes: 102,
    distance: 8.1,
    heartRate: {
      min: 54,
      max: 163,
      avg: 77,
    },
    sleep: {
      duration: 7.1,
      quality: "average",
      cycles: 4,
      deepSleep: 2.0,
      remSleep: 1.6,
    },
    water: 2200,
  },
];

// Mock workouts data
export const workoutsData = [
  {
    id: 1,
    name: "Morning Run",
    type: "Cardio",
    date: "2025-04-07",
    duration: 35, // minutes
    caloriesBurned: 420,
    details: {
      distance: 5.2, // km
      pace: "6:45", // min/km
      heartRate: {
        avg: 152,
        max: 176,
      },
      route: "Riverside Park",
    },
  },
  {
    id: 2,
    name: "Upper Body Strength",
    type: "Strength",
    date: "2025-04-06",
    duration: 45,
    caloriesBurned: 380,
    details: {
      exercises: [
        { name: "Bench Press", sets: 4, reps: 12, weight: 65 },
        { name: "Pull-ups", sets: 3, reps: 10, weight: 0 },
        { name: "Shoulder Press", sets: 3, reps: 12, weight: 20 },
        { name: "Bicep Curls", sets: 3, reps: 15, weight: 15 },
      ],
      heartRate: {
        avg: 135,
        max: 148,
      },
    },
  },
  {
    id: 3,
    name: "Yoga Flow",
    type: "Flexibility",
    date: "2025-04-05",
    duration: 60,
    caloriesBurned: 220,
    details: {
      focusAreas: ["Core", "Balance", "Flexibility"],
      heartRate: {
        avg: 98,
        max: 112,
      },
      instructor: "Digital Zen Studio",
    },
  },
  {
    id: 4,
    name: "HIIT Session",
    type: "Cardio",
    date: "2025-04-04",
    duration: 25,
    caloriesBurned: 340,
    details: {
      circuits: 4,
      exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "Push-ups"],
      heartRate: {
        avg: 162,
        max: 185,
      },
    },
  },
  {
    id: 5,
    name: "Leg Day",
    type: "Strength",
    date: "2025-04-03",
    duration: 50,
    caloriesBurned: 450,
    details: {
      exercises: [
        { name: "Squats", sets: 4, reps: 15, weight: 70 },
        { name: "Lunges", sets: 3, reps: 12, weight: 20 },
        { name: "Leg Press", sets: 3, reps: 12, weight: 130 },
        { name: "Calf Raises", sets: 4, reps: 20, weight: 40 },
      ],
      heartRate: {
        avg: 142,
        max: 156,
      },
    },
  },
];

// Mock nutrition data
export const nutritionData = [
  {
    date: "2025-04-07",
    calories: 2150,
    protein: 120, // g
    carbs: 210, // g
    fat: 65, // g
    water: 2200, // ml
    meals: [
      {
        name: "Breakfast",
        calories: 520,
        items: ["Oatmeal with berries", "Greek yogurt", "Coffee"],
      },
      {
        name: "Lunch",
        calories: 680,
        items: ["Grilled chicken salad", "Whole grain bread", "Apple"],
      },
      {
        name: "Dinner",
        calories: 750,
        items: ["Salmon", "Quinoa", "Roasted vegetables", "Olive oil"],
      },
      {
        name: "Snacks",
        calories: 200,
        items: ["Protein bar", "Almonds"],
      },
    ],
  },
  // More days...
];

// Upcoming workout schedule
export const upcomingWorkouts = [
  {
    id: 101,
    name: "Morning Run",
    type: "Cardio",
    scheduled: "2025-04-09T06:30:00",
    duration: 35,
    notes: "5k target",
  },
  {
    id: 102,
    name: "Full Body HIIT",
    type: "HIIT",
    scheduled: "2025-04-10T18:00:00",
    duration: 30,
    notes: "Focus on form",
  },
  {
    id: 103,
    name: "Yoga & Stretching",
    type: "Flexibility",
    scheduled: "2025-04-11T07:00:00",
    duration: 45,
    notes: "Morning routine for better day",
  },
  {
    id: 104,
    name: "Upper Body",
    type: "Strength",
    scheduled: "2025-04-12T16:00:00",
    duration: 50,
    notes: "Increase weights from last session",
  },
];

// Monthly progress data for charts
export const monthlyProgressData = {
  stepCounts: [7832, 8943, 10247, 9652, 11324, 8763, 9856, 12043, 10278, 9645, 8752, 10532, 11856, 12321, 10123, 9743, 8654, 9954, 10543, 11434, 10876, 9832, 10342, 11756, 12102, 10342, 9876, 10123, 10873, 11234],
  sleepHours: [7.2, 6.8, 7.5, 8.1, 7.4, 6.9, 7.3, 7.8, 8.2, 7.6, 7.0, 7.5, 7.9, 8.3, 7.7, 7.2, 6.8, 7.4, 7.9, 8.0, 7.8, 7.3, 7.6, 8.1, 7.9, 7.4, 7.0, 7.5, 7.8, 8.2],
  caloriesBurned: [2100, 2300, 2500, 2400, 2700, 2200, 2400, 2800, 2600, 2450, 2150, 2550, 2750, 2900, 2500, 2350, 2100, 2400, 2600, 2700, 2650, 2400, 2500, 2750, 2850, 2550, 2300, 2450, 2600, 2700],
  activeMinutes: [65, 78, 95, 88, 105, 72, 85, 115, 98, 82, 70, 92, 108, 120, 95, 82, 68, 85, 97, 110, 102, 88, 94, 112, 118, 95, 85, 90, 100, 105],
  waterIntake: [1800, 1900, 2100, 2000, 2200, 1850, 1950, 2300, 2100, 2050, 1900, 2050, 2250, 2350, 2100, 1950, 1800, 2000, 2150, 2300, 2200, 2000, 2100, 2300, 2400, 2100, 1950, 2000, 2200, 2300],
};

// Calendar events
export const calendarEvents = [
  {
    id: 1001,
    title: "Morning Run",
    start: "2025-04-09T06:30:00",
    end: "2025-04-09T07:15:00",
    type: "workout",
  },
  {
    id: 1002,
    title: "Yoga Class",
    start: "2025-04-11T08:00:00",
    end: "2025-04-11T09:00:00",
    type: "workout",
  },
  {
    id: 1003,
    title: "Weight Training",
    start: "2025-04-12T17:00:00",
    end: "2025-04-12T18:00:00",
    type: "workout",
  },
  {
    id: 1004,
    title: "Nutritionist Call",
    start: "2025-04-15T14:00:00",
    end: "2025-04-15T14:30:00",
    type: "appointment",
  },
  {
    id: 1005,
    title: "Group Run",
    start: "2025-04-18T07:00:00",
    end: "2025-04-18T08:30:00",
    type: "event",
  },
  {
    id: 1006,
    title: "Meal Prep",
    start: "2025-04-14T16:00:00",
    end: "2025-04-14T17:30:00",
    type: "personal",
  },
];

// Today's data (for dashboard)
export const todayData = {
  date: "2025-04-08",
  steps: 7254,
  caloriesBurned: 1842,
  activeMinutes: 62,
  distance: 5.2,
  heartRate: {
    current: 72,
    resting: 58,
    min: 56,
    max: 135,
  },
  water: 1500, // ml out of target 2000ml
  sleep: {
    last: {
      duration: 7.5,
      quality: "good",
      cycles: 4,
      deepSleep: 2.2,
      remSleep: 1.8,
    },
  },
  completion: {
    steps: 72.5, // percentage of goal
    calories: 73.7,
    water: 75,
    activeMinutes: 77.5,
  },
};
