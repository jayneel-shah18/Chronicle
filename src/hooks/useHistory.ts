import { create } from 'zustand';

interface HistoryAction {
  type: 'add' | 'update' | 'delete';
  feature: 'todo' | 'goal' | 'journal' | 'habit' | 'expense';
  data: unknown;
  timestamp: number;
}

interface HistoryStore {
  past: HistoryAction[];
  future: HistoryAction[];
  addAction: (action: HistoryAction) => void;
  undo: () => HistoryAction | null;
  redo: () => HistoryAction | null;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
}

export const useHistory = create<HistoryStore>((set, get) => ({
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,

  addAction: (action) =>
    set((state) => ({
      past: [...state.past, action],
      future: [], // Clear redo stack when new action is performed
      canUndo: true,
      canRedo: false,
    })),

  undo: () => {
    const { past, future } = get();
    if (past.length === 0) return null;

    const action = past[past.length - 1];
    set({
      past: past.slice(0, -1),
      future: [action, ...future],
      canUndo: past.length > 1,
      canRedo: true,
    });
    return action;
  },

  redo: () => {
    const { past, future } = get();
    if (future.length === 0) return null;

    const action = future[0];
    set({
      past: [...past, action],
      future: future.slice(1),
      canUndo: true,
      canRedo: future.length > 1,
    });
    return action;
  },

  clear: () =>
    set({
      past: [],
      future: [],
      canUndo: false,
      canRedo: false,
    }),
}));
