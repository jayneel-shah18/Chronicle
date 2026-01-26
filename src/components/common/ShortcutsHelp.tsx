import { Command } from 'lucide-react';

interface ShortcutBadgeProps {
  keys: string[];
  className?: string;
}

export function ShortcutBadge({ keys, className = '' }: ShortcutBadgeProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {keys.map((key, i) => (
        <kbd
          key={i}
          className="px-2 py-1 text-xs font-semibold bg-chronicle-bg-dark border border-white/10 rounded shadow-sm"
        >
          {key === 'mod' ? (
            <Command size={12} className="inline" />
          ) : (
            key
          )}
        </kbd>
      ))}
    </div>
  );
}

export function ShortcutsHelp() {
  const shortcuts = [
    { keys: ['n'], description: 'New item' },
    { keys: ['j'], description: 'Next item' },
    { keys: ['k'], description: 'Previous item' },
    { keys: ['d'], description: 'Delete selected' },
    { keys: ['Esc'], description: 'Cancel/Close' },
    { keys: ['mod', 'z'], description: 'Undo' },
    { keys: ['mod', 'shift', 'z'], description: 'Redo' },
    { keys: ['mod', '/'], description: 'Show shortcuts' },
    { keys: ['/'], description: 'Search (when available)' },
  ];

  return (
    <div className="card max-w-md">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Command size={20} className="text-accent-blue" />
        Keyboard Shortcuts
      </h2>
      <div className="space-y-2">
        {shortcuts.map((shortcut, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <span className="text-sm text-chronicle-text-muted">{shortcut.description}</span>
            <ShortcutBadge keys={shortcut.keys} />
          </div>
        ))}
      </div>
    </div>
  );
}
