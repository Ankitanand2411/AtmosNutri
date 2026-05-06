import type {
  CircadianWindow,
  MealSuggestion,
  HabitDay,
  FoodEntry,
  BodyMetric,
} from "./types";

// ─── Circadian Clock ─────────────────────────────────────────────────────────
export const CIRCADIAN_WINDOWS: CircadianWindow[] = [
  { hour: 6,  label: "Dawn Fuel",    type: "Optimal", description: "Cortisol peaks naturally. Prioritise protein and complex carbs to ride the wave.",   foods: ["Eggs", "Oats", "Banana"] },
  { hour: 8,  label: "Power Meal",   type: "Eat",     description: "Metabolism is ramping up. Best window for your largest, most nutrient-dense meal.", foods: ["Avocado toast", "Greek yogurt"] },
  { hour: 10, label: "Snack Zone",   type: "Eat",     description: "Light top-up to sustain focus before midday without spiking blood sugar.",           foods: ["Almonds", "Apple"] },
  { hour: 12, label: "Solar Noon",   type: "Optimal", description: "Digestive enzymes and core temp both peak. Ideal for a balanced, filling lunch.",    foods: ["Salmon bowl", "Lentil soup"] },
  { hour: 14, label: "Dip Window",   type: "Avoid",   description: "Post-lunch circadian dip. Avoid heavy carbs. A walk or protein snack beats coffee.", foods: ["Protein shake", "Nuts"] },
  { hour: 16, label: "Athlete Hour", type: "Eat",     description: "Strength and reaction time are at their daily peak. Fuel a workout or focused work.", foods: ["Banana", "Rice cakes"] },
  { hour: 18, label: "Sunset Meal",  type: "Eat",     description: "Last substantial meal. Favour fibre, vegetables, and healthy fats over refined carbs.", foods: ["Stir-fry", "Quinoa bowl"] },
  { hour: 20, label: "Wind Down",    type: "Fast",    description: "Begin tapering. Herbal tea or a small handful of walnuts if genuinely hungry.",       foods: ["Chamomile tea", "Walnuts"] },
  { hour: 22, label: "Night Fast",   type: "Fast",    description: "Fasting window starts. Let your gut repair. Sleep is the best metabolic reset.",      foods: [] },
];

// ─── Meal Suggestions (muted semantic colours) ────────────────────────────────
export const MEAL_SUGGESTIONS: MealSuggestion[] = [
  {
    id: "m1", name: "Matcha Chia Bowl",         icon: "Coffee",
    prepTime: 5,  macros: { p: 14, c: 38, f: 12 },
    benefit: "L-theanine + slow-release glucose → sustained focus",
    moodTarget: ["Deep Work", "Focused", "Peak Performance"] as never,
    color: "#5A8F76",
  },
  {
    id: "m2", name: "Salmon & Avocado Wrap",    icon: "Fish",
    prepTime: 12, macros: { p: 32, c: 28, f: 18 },
    benefit: "Omega-3 + DHA → direct brain fuel",
    moodTarget: ["Peak Performance", "Deep Work"] as never,
    color: "#4A7FA5",
  },
  {
    id: "m3", name: "Golden Milk Latte",        icon: "CupSoda",
    prepTime: 3,  macros: { p: 6,  c: 14, f: 8  },
    benefit: "Curcumin lowers cortisol, supports calm",
    moodTarget: ["Calm", "Recovery", "Sleep Ready"] as never,
    color: "#B8872A",
  },
  {
    id: "m4", name: "Banana Almond Oats",       icon: "Apple",
    prepTime: 0,  macros: { p: 18, c: 54, f: 10 },
    benefit: "Slow-release glucose → no energy crashes",
    moodTarget: ["Deep Work", "Peak Performance"] as never,
    color: "#8875D4",
  },
  {
    id: "m5", name: "Tryptophan Sleep Smoothie",icon: "CupSoda",
    prepTime: 4,  macros: { p: 12, c: 30, f: 6  },
    benefit: "Tryptophan + magnesium primes melatonin",
    moodTarget: ["Sleep Ready", "Recovery", "Calm"] as never,
    color: "#5A8F76",
  },
  {
    id: "m6", name: "Electrolyte Berry Bowl",   icon: "Apple",
    prepTime: 7,  macros: { p: 10, c: 42, f: 4  },
    benefit: "Potassium + antioxidants for active recovery",
    moodTarget: ["Recovery", "Calm"] as never,
    color: "#A0603A",
  },
];

// ─── Habit history (35 days) ──────────────────────────────────────────────────
const today = new Date();
export const HABIT_HISTORY: HabitDay[] = Array.from({ length: 35 }, (_, i) => {
  const d = new Date(today);
  d.setDate(d.getDate() - (34 - i));
  const score =
    i > 28 ? 80 + Math.floor(Math.random() * 20) :
    i > 20 ? 50 + Math.floor(Math.random() * 40) :
    10  + Math.floor(Math.random() * 70);
  return { date: d.toISOString().split("T")[0], score, logged: score > 20, streak: score > 70 };
});

// ─── Today's food log ─────────────────────────────────────────────────────────
export const FOOD_LOG: FoodEntry[] = [
  { id: "f1", name: "Greek Yogurt & Berries", icon: "Apple",   logged: true,  calories: 210, protein: 18, carbs: 26, fat: 4,  time: "07:30", color: "#8875D4" },
  { id: "f2", name: "Matcha Latte",           icon: "Coffee",  logged: true,  calories: 90,  protein: 4,  carbs: 12, fat: 3,  time: "09:00", color: "#5A8F76" },
  { id: "f3", name: "Salmon Buddha Bowl",     icon: "Fish",    logged: true,  calories: 480, protein: 34, carbs: 48, fat: 14, time: "12:30", color: "#4A7FA5" },
  { id: "f4", name: "Afternoon Snack",        icon: "Carrot",  logged: false, calories: 160, protein: 6,  carbs: 8,  fat: 12, time: "16:00", color: "#B8872A" },
  { id: "f5", name: "Dinner",                 icon: "Utensils",logged: false, calories: 520, protein: 28, carbs: 56, fat: 16, time: "19:00", color: "#5A8F76" },
];

// ─── Body metrics ─────────────────────────────────────────────────────────────
export const BODY_METRICS: BodyMetric[] = [
  { label: "Hydration",    value: "72",   unit: "%",    trend: "up",      color: "#4A7FA5" },
  { label: "Energy Score", value: "81",   unit: "pts",  trend: "up",      color: "#8875D4" },
  { label: "Recovery",     value: "68",   unit: "%",    trend: "neutral", color: "#5A8F76" },
  { label: "Gut Load",     value: "1240", unit: "kcal", trend: "down",    color: "#B8872A" },
];
