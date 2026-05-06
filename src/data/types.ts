export type MoodType = "Energized" | "Focused" | "Anxious" | "Tired" | "Calm" | "Stressed";
export type GoalType = "Deep Work" | "Recovery" | "Sleep Ready" | "Peak Performance" | "Calm";

export interface FoodEntry {
  id: string;
  name: string;
  emoji: string;
  logged: boolean;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  color: string;
}

export interface CircadianWindow {
  hour: number;
  label: string;
  type: "Eat" | "Fast" | "Optimal" | "Avoid";
  description: string;
  foods?: string[];
}

export interface HabitDay {
  date: string;
  score: number; // 0-100
  logged: boolean;
  streak: boolean;
}

export interface MealSuggestion {
  id: string;
  name: string;
  emoji: string;
  prepTime: number;
  macros: { p: number; c: number; f: number };
  benefit: string;
  moodTarget: GoalType[];
  color: string;
}

export interface BodyMetric {
  label: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "neutral";
  color: string;
}
