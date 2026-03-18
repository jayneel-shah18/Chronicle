// Type definitions for Chronicle application

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodosByDate {
  [dateKey: string]: Todo[];
}

export interface Goal {
  id: number;
  title: string;
  progress: number;
}

export interface JournalEntries {
  [dateKey: string]: string;
}

export interface Habit {
  id: number;
  name: string;
}

export type HabitStatus = 'none' | 'success' | 'fail';

export interface HabitData {
  [key: string]: HabitStatus; // key format: "habitName-YYYY-MM-DD"
}

export interface Expense {
  id?: number;
  name: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';
  date: string;
}

export interface Checklist {
  rewards: Array<{
    id: number;
    text: string;
    cost: string;
    achieved: boolean;
  }>;
  punishments: Array<{
    id: number;
    text: string;
    triggered: boolean;
  }>;
}

// Store types
export interface AppState {
  selectedDate: Date;
  todos: TodosByDate;
  goals: Goal[];
  journalEntries: JournalEntries;
  habits: Habit[];
  habitData: HabitData;
  expenses: Expense[];
  checklist: Checklist;
}

// Action types
export interface AppActions {
  setSelectedDate: (date: Date) => void;
  addTodo: (dateKey: string, text: string) => void;
  toggleTodo: (dateKey: string, id: number) => void;
  deleteTodo: (dateKey: string, id: number) => void;
  addGoal: (title: string) => void;
  updateGoalProgress: (id: number, delta: number) => void;
  deleteGoal: (id: number) => void;
  updateJournal: (dateKey: string, content: string) => void;
  deleteJournalEntry: (dateKey: string) => void;
  addHabit: (name: string) => void;
  updateHabitStatus: (habitName: string, dateKey: string, status: HabitStatus) => void;
  deleteHabit: (name: string) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  updateExpense: (id: number, expense: Omit<Expense, 'id' | 'date'>) => void;
  deleteExpense: (id: number) => void;
  loadFromLocalStorage: () => void;
}
