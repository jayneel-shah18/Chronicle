import { toast } from '../components/common/Toast';

export default function useToast() {
  return {
    showToast: (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
      toast[type](message);
    },
  };
}
