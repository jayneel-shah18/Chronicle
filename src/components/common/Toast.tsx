import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));
    
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 3000);
    
    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} className="text-accent-emerald" />,
    error: <AlertCircle size={20} className="text-accent-rose" />,
    warning: <AlertTriangle size={20} className="text-accent-amber" />,
    info: <Info size={20} className="text-accent-blue" />,
  };

  const backgrounds = {
    success: 'bg-accent-emerald/10 border-accent-emerald/20',
    error: 'bg-accent-rose/10 border-accent-rose/20',
    warning: 'bg-accent-amber/10 border-accent-amber/20',
    info: 'bg-accent-blue/10 border-accent-blue/20',
  };

  return (
    <div
      className={`${backgrounds[toast.type]} border backdrop-blur-sm rounded-xl p-4 shadow-lg animate-slide-down flex items-center gap-3 min-w-[300px]`}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium text-chronicle-text-light">{toast.message}</p>
      <button
        onClick={onClose}
        className="text-chronicle-text-muted hover:text-chronicle-text-light transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export const toast = {
  success: (message: string) => useToastStore.getState().addToast(message, 'success'),
  error: (message: string) => useToastStore.getState().addToast(message, 'error'),
  warning: (message: string) => useToastStore.getState().addToast(message, 'warning'),
  info: (message: string) => useToastStore.getState().addToast(message, 'info'),
};
