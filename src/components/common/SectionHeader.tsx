import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export default function SectionHeader({ 
  icon: Icon, 
  title, 
  subtitle,
  badge,
  actions 
}: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-soft bg-chronicle-sage/10">
            <Icon size={24} className="text-chronicle-sage-dark" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-display font-bold text-chronicle-ink">
                {title}
              </h2>
              {badge && (
                <span className="badge-success">{badge}</span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-chronicle-stone mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
}
