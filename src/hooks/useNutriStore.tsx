"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { MoodType, GoalType, FoodEntry, MealSuggestion, BodyMetric } from "@/data/types";
import { FOOD_LOG } from "@/data/seed";

interface NutriState {
  currentMood: MoodType;
  setMood: (m: MoodType) => void;
  currentGoal: GoalType;
  setGoal: (g: GoalType) => void;
  foodLog: FoodEntry[];
  toggleFoodLog: (id: string) => void;
  addFoodToLog: (meal: MealSuggestion) => void;
  totalCalories: number;
  targetCalories: number;
  currentHour: number;
  streak: number;
  dynamicMetrics: BodyMetric[];
}

const NutriContext = createContext<NutriState | undefined>(undefined);

export function NutriProvider({ children }: { children: ReactNode }) {
  const [currentMood, setMood] = useState<MoodType>("Focused");
  const [currentGoal, setGoal] = useState<GoalType>("Deep Work");
  const [foodLog, setFoodLog] = useState<FoodEntry[]>(FOOD_LOG);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nutrios_foodlog");
    if (saved) {
      try {
        setFoodLog(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save to local storage when foodLog changes
  useEffect(() => {
    localStorage.setItem("nutrios_foodlog", JSON.stringify(foodLog));
  }, [foodLog]);

  // Keep clock in sync
  useEffect(() => {
    const tick = setInterval(() => setCurrentHour(new Date().getHours()), 60_000);
    return () => clearInterval(tick);
  }, []);

  const toggleFoodLog = useCallback((id: string) => {
    setFoodLog((prev) =>
      prev.map((f) => (f.id === id ? { ...f, logged: !f.logged } : f))
    );
  }, []);

  const addFoodToLog = useCallback((meal: MealSuggestion) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const newEntry: FoodEntry = {
      id: `f_${Date.now()}`,
      name: meal.name,
      icon: meal.icon,
      logged: true,
      calories: meal.macros.p * 4 + meal.macros.c * 4 + meal.macros.f * 9,
      protein: meal.macros.p,
      carbs: meal.macros.c,
      fat: meal.macros.f,
      time: timeStr,
      color: meal.color,
    };
    setFoodLog((prev) => [...prev, newEntry]);
  }, []);

  const loggedItems = foodLog.filter((f) => f.logged);
  const totalCalories = loggedItems.reduce((s, f) => s + f.calories, 0);
  const totalProtein = loggedItems.reduce((s, f) => s + f.protein, 0);
  const targetCalories = 2100;
  
  // Dynamic Body Metrics Calculation
  const gutLoadPct = Math.min((totalCalories / targetCalories) * 100, 100);
  const energyScore = 40 + Math.min(gutLoadPct, 50) + (totalProtein > 50 ? 10 : 0);
  const recoveryScore = 50 + (totalProtein / 140) * 50;

  const dynamicMetrics: BodyMetric[] = [
    { label: "Hydration",    value: "75",   unit: "%",    trend: "up",      color: "#588EB6" },
    { label: "Energy Score", value: Math.round(energyScore).toString(),   unit: "pts",  trend: energyScore > 70 ? "up" : "down", color: "#9381DF" },
    { label: "Recovery",     value: Math.round(recoveryScore).toString(),   unit: "%",    trend: "neutral", color: "#689A82" },
    { label: "Gut Load",     value: totalCalories.toString(), unit: "kcal", trend: gutLoadPct > 100 ? "up" : "down",    color: "#C49537" },
  ];

  return (
    <NutriContext.Provider
      value={{
        currentMood,
        setMood,
        currentGoal,
        setGoal,
        foodLog,
        toggleFoodLog,
        addFoodToLog,
        totalCalories,
        targetCalories,
        currentHour,
        streak: 7,
        dynamicMetrics,
      }}
    >
      {children}
    </NutriContext.Provider>
  );
}

export function useNutriStore() {
  const ctx = useContext(NutriContext);
  if (!ctx) throw new Error("useNutriStore must be inside NutriProvider");
  return ctx;
}
