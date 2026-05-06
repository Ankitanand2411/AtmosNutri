"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { MoodType, GoalType, FoodEntry } from "@/data/types";
import { FOOD_LOG } from "@/data/seed";

interface NutriState {
  currentMood: MoodType;
  setMood: (m: MoodType) => void;
  currentGoal: GoalType;
  setGoal: (g: GoalType) => void;
  foodLog: FoodEntry[];
  toggleFoodLog: (id: string) => void;
  totalCalories: number;
  targetCalories: number;
  currentHour: number;
  streak: number;
}

const NutriContext = createContext<NutriState | undefined>(undefined);

export function NutriProvider({ children }: { children: ReactNode }) {
  const [currentMood, setMood] = useState<MoodType>("Focused");
  const [currentGoal, setGoal] = useState<GoalType>("Deep Work");
  const [foodLog, setFoodLog] = useState<FoodEntry[]>(FOOD_LOG);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

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

  const totalCalories = foodLog
    .filter((f) => f.logged)
    .reduce((s, f) => s + f.calories, 0);

  return (
    <NutriContext.Provider
      value={{
        currentMood,
        setMood,
        currentGoal,
        setGoal,
        foodLog,
        toggleFoodLog,
        totalCalories,
        targetCalories: 2100,
        currentHour,
        streak: 7,
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
