import { Loader2 } from 'lucide-react';

export function Spinner({ size = 24, className = '' }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={`animate-spin ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-chronicle-bg-dark/60 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-3 bg-chronicle-bg-dark/60 rounded w-3/4"></div>
        <div className="h-3 bg-chronicle-bg-dark/60 rounded w-1/2"></div>
        <div className="h-3 bg-chronicle-bg-dark/60 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-chronicle-bg-dark/60 rounded-xl animate-pulse">
          <div className="h-3 bg-chronicle-card-bg rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-chronicle-card-bg rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
        <Spinner size={40} className="text-accent-blue" />
        <p className="text-chronicle-text-light font-medium">{message}</p>
      </div>
    </div>
  );
}
