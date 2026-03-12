import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, AppActions, Todo, Goal, Habit, HabitStatus, Expense } from '../types/index';

const useStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      // Initial State
      selectedDate: new Date(),
      todos: {},
      goals: [],
      journalEntries: {},
      habits: [],
      habitData: {},
      expenses: [],
      checklist: {
        rewards: [],
        punishments: [],
      },

      // Actions
      setSelectedDate: (date: Date) => set({ selectedDate: date }),

      addTodo: (dateKey: string, text: string) => {
        const currentTodos = get().todos[dateKey] || [];
        set({
          todos: {
            ...get().todos,
            [dateKey]: [...currentTodos, { id: Date.now(), text, completed: false }],
          },
        });
      },

      toggleTodo: (dateKey: string, id: number) => {
        const currentTodos = get().todos[dateKey] || [];
        set({
          todos: {
            ...get().todos,
            [dateKey]: currentTodos.map((todo: Todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          },
        });
      },

      deleteTodo: (dateKey: string, id: number) => {
        const currentTodos = get().todos[dateKey] || [];
        set({
          todos: {
            ...get().todos,
            [dateKey]: currentTodos.filter((todo: Todo) => todo.id !== id),
          },
        });
      },

      addGoal: (title: string) => {
        set({
          goals: [...get().goals, { id: Date.now(), title, progress: 0 }],
        });
      },

      updateGoalProgress: (id: number, delta: number) => {
        set({
          goals: get().goals.map((goal: Goal) =>
            goal.id === id
              ? { ...goal, progress: Math.max(0, Math.min(100, goal.progress + delta)) }
              : goal
          ),
        });
      },

      deleteGoal: (id: number) => {
        set({
          goals: get().goals.filter((goal: Goal) => goal.id !== id),
        });
      },

      updateJournal: (dateKey: string, content: string) => {
        set({
          journalEntries: {
            ...get().journalEntries,
            [dateKey]: content,
          },
        });
      },

      addHabit: (name: string) => {
        set({
          habits: [...get().habits, { id: Date.now(), name }],
        });
      },

      updateHabitStatus: (habitName: string, dateKey: string, status: HabitStatus) => {
        const key = `${habitName}-${dateKey}`;
        set({
          habitData: {
            ...get().habitData,
            [key]: status,
          },
        });
      },

      deleteHabit: (name: string) => {
        set({
          habits: get().habits.filter((h: Habit) => h.name !== name),
        });
      },

      addExpense: (expense: Omit<Expense, 'id' | 'date'>) => {
        set({
          expenses: [
            { ...expense, id: Date.now(), date: new Date().toISOString() },
            ...get().expenses,
          ],
        });
      },

      updateExpense: (id: number, expense: Omit<Expense, 'id' | 'date'>) => {
        set({
          expenses: get().expenses.map((exp: Expense) =>
            exp.id === id ? { ...exp, ...expense } : exp
          ),
        });
      },

      deleteExpense: (id: number) => {
        set({
          expenses: get().expenses.filter((exp: Expense) => exp.id !== id),
        });
      },

      loadFromLocalStorage: () => {
        // This is handled automatically by zustand persist middleware
      },
    }),
    {
      name: 'chronicle-storage',
    }
  )
);

export default useStore;
