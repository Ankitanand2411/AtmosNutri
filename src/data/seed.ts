import type {
  CircadianWindow,
  MealSuggestion,
  HabitDay,
  FoodEntry,
  BodyMetric,
} from "./types";

// ─── Circadian Clock Data ────────────────────────────────────────────────────
export const CIRCADIAN_WINDOWS: CircadianWindow[] = [
  { hour: 6,  label: "Dawn Fuel",   type: "Optimal", description: "Cortisol peak. Ideal for protein + complex carbs.", foods: ["Eggs", "Oats", "Banana"] },
  { hour: 8,  label: "Power Meal",  type: "Eat",     description: "Metabolic rate is high. Best time for your biggest meal.", foods: ["Avocado toast", "Greek yogurt"] },
  { hour: 10, label: "Snack Zone",  type: "Eat",     description: "Light snack to sustain focus before midday.", foods: ["Almonds", "Apple"] },
  { hour: 12, label: "Solar Noon",  type: "Optimal", description: "Digestive enzymes peak. Eat a balanced lunch.", foods: ["Salmon bowl", "Lentil soup"] },
  { hour: 14, label: "Dip Window",  type: "Avoid",   description: "Post-lunch dip. Avoid heavy carbs. Opt for protein.", foods: ["Protein shake", "Nuts"] },
  { hour: 16, label: "Athlete Hour",type: "Eat",     description: "Core temp and strength peak. Pre-workout window.", foods: ["Banana", "Rice cakes"] },
  { hour: 18, label: "Sunset Meal", type: "Eat",     description: "Last substantial meal. Prioritize fibre and healthy fats.", foods: ["Stir-fry", "Quinoa bowl"] },
  { hour: 20, label: "Wind Down",   type: "Fast",    description: "Start tapering. Light snacks only if needed.", foods: ["Chamomile tea", "Walnuts"] },
  { hour: 22, label: "Night Fast",  type: "Fast",    description: "Fasting window begins. Let your gut repair itself.", foods: [] },
];

// ─── Meal Suggestions ─────────────────────────────────────────────────────────
export const MEAL_SUGGESTIONS: MealSuggestion[] = [
  {
    id: "m1", name: "Matcha Chia Bowl", emoji: "🍵",
    prepTime: 5,
    macros: { p: 14, c: 38, f: 12 },
    benefit: "Steady caffeine + L-theanine for flow state",
    moodTarget: ["Deep Work", "Focused", "Peak Performance"] as never,
    color: "#10B981",
  },
  {
    id: "m2", name: "Salmon & Avocado Wrap", emoji: "🐟",
    prepTime: 12,
    macros: { p: 32, c: 28, f: 18 },
    benefit: "Omega-3 + healthy fats = brain fuel",
    moodTarget: ["Peak Performance", "Deep Work"] as never,
    color: "#F97316",
  },
  {
    id: "m3", name: "Golden Milk Latte", emoji: "🌿",
    prepTime: 3,
    macros: { p: 6, c: 14, f: 8 },
    benefit: "Curcumin reduces cortisol & inflammation",
    moodTarget: ["Calm", "Recovery", "Sleep Ready"] as never,
    color: "#F59E0B",
  },
  {
    id: "m4", name: "Banana Almond Overnight Oats", emoji: "🍌",
    prepTime: 0,
    macros: { p: 18, c: 54, f: 10 },
    benefit: "Slow-release glucose prevents energy crashes",
    moodTarget: ["Deep Work", "Peak Performance"] as never,
    color: "#8B5CF6",
  },
  {
    id: "m5", name: "Tryptophan Sleep Smoothie", emoji: "🫐",
    prepTime: 4,
    macros: { p: 12, c: 30, f: 6 },
    benefit: "Tryptophan + magnesium primes melatonin",
    moodTarget: ["Sleep Ready", "Recovery", "Calm"] as never,
    color: "#06B6D4",
  },
  {
    id: "m6", name: "Electrolyte Berry Bowl", emoji: "🍓",
    prepTime: 7,
    macros: { p: 10, c: 42, f: 4 },
    benefit: "Potassium + antioxidants for recovery",
    moodTarget: ["Recovery", "Calm"] as never,
    color: "#EC4899",
  },
];

// ─── Habit DNA (last 35 days) ─────────────────────────────────────────────────
const today = new Date();
export const HABIT_HISTORY: HabitDay[] = Array.from({ length: 35 }, (_, i) => {
  const d = new Date(today);
  d.setDate(d.getDate() - (34 - i));
  const score = i > 28 ? 80 + Math.floor(Math.random() * 20) :
                i > 20 ? 50 + Math.floor(Math.random() * 40) :
                10 + Math.floor(Math.random() * 70);
  return {
    date: d.toISOString().split("T")[0],
    score,
    logged: score > 20,
    streak: score > 70,
  };
});

// ─── Today's Food Log ─────────────────────────────────────────────────────────
export const FOOD_LOG: FoodEntry[] = [
  { id: "f1", name: "Greek Yogurt & Berries", emoji: "🫐", logged: true,  calories: 210, protein: 18, carbs: 26, fat: 4,  time: "07:30", color: "#8B5CF6" },
  { id: "f2", name: "Matcha Latte",           emoji: "🍵", logged: true,  calories: 90,  protein: 4,  carbs: 12, fat: 3,  time: "09:00", color: "#10B981" },
  { id: "f3", name: "Salmon Buddha Bowl",     emoji: "🐟", logged: true,  calories: 480, protein: 34, carbs: 48, fat: 14, time: "12:30", color: "#F97316" },
  { id: "f4", name: "Afternoon Snack",        emoji: "🥜", logged: false, calories: 160, protein: 6,  carbs: 8,  fat: 12, time: "16:00", color: "#F59E0B" },
  { id: "f5", name: "Dinner",                 emoji: "🍽️", logged: false, calories: 520, protein: 28, carbs: 56, fat: 16, time: "19:00", color: "#06B6D4" },
];

// ─── Body Metrics ─────────────────────────────────────────────────────────────
export const BODY_METRICS: BodyMetric[] = [
  { label: "Hydration",    value: "72",  unit: "%", trend: "up",      color: "#06B6D4" },
  { label: "Energy Score", value: "81",  unit: "pts", trend: "up",    color: "#8B5CF6" },
  { label: "Recovery",     value: "68",  unit: "%", trend: "neutral", color: "#10B981" },
  { label: "Gut Load",     value: "1240",unit: "kcal", trend: "down", color: "#F97316" },
];
