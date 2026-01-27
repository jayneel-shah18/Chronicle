import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Navigation from '../common/Navigation';
import Card from '../common/Card';
import useStore from '../../store/useStore';
import { getDateKey, formatDate } from '../../utils/date';

export default function JournalPage() {
  const [selectedDate] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { journalEntries, updateJournal } = useStore();

  const dateKey = getDateKey(selectedDate);
  const currentEntry = journalEntries[dateKey] || '';
  const wordCount = currentEntry.trim().split(/\s+/).filter(w => w).length;

  const handleEntryChange = (value: string) => {
    updateJournal(dateKey, value);
    setIsSaving(true);
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const pastEntries = Object.entries(journalEntries)
    .filter(([key]) => key !== dateKey)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-chronicle-bg-dark text-chronicle-text-light">
      <Navigation />
      <div className="p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-chronicle-card-bg text-chronicle-text-light px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-white/10 hover:bg-accent-emerald/10 hover:border-accent-emerald mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent-emerald to-accent-blue bg-clip-text text-transparent">
                Journal
              </h1>
              <div className="flex items-center justify-between mb-6">
                <p className="text-chronicle-text-muted">
                  {formatDate(selectedDate)}
                </p>
                <span className="text-sm text-chronicle-text-muted">
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </span>
              </div>

              <textarea
                value={currentEntry}
                onChange={(e) => handleEntryChange(e.target.value)}
                placeholder="How was your day? What are you thinking about?"
                className="w-full min-h-[400px] bg-chronicle-bg-dark/60 border-2 border-white/10 rounded-xl p-4 text-chronicle-text-light resize-none focus:outline-none focus:border-accent-emerald transition-all"
                autoFocus
              />

              <div className="flex items-center justify-between text-xs mt-3">
                <span className="text-chronicle-text-muted">
                  {isSaving ? (
                    <span className="text-accent-emerald">Saving...</span>
                  ) : (
                    'Auto-saved ✓'
                  )}
                </span>
                <span className="text-chronicle-text-muted">
                  Press Ctrl+S to manually save
                </span>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-accent-emerald" />
                Past Entries
              </h2>
              <div className="space-y-3">
                {pastEntries.length === 0 ? (
                  <p className="text-chronicle-text-muted text-sm">
                    No past entries yet. Start writing!
                  </p>
                ) : (
                  pastEntries.map(([date, entry]) => (
                    <div
                      key={date}
                      className="p-3 bg-chronicle-bg-dark/60 rounded-lg hover:bg-chronicle-bg-dark/80 transition-colors cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-accent-emerald mb-1">
                        {new Date(date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <p className="text-sm text-chronicle-text-muted line-clamp-2">
                        {entry}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
