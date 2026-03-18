import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Eye, Trash2 } from 'lucide-react';
import Navigation from '../common/Navigation';
import Card from '../common/Card';
import useStore from '../../store/useStore';
import { getDateKey, getDateLookupKeys, formatDate } from '../../utils/date';
import { toast } from '../common/Toast';

export default function JournalPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { journalEntries, updateJournal, deleteJournalEntry } = useStore();

  const dateKey = getDateKey(selectedDate);
  const lookupKeys = getDateLookupKeys(selectedDate);
  const resolvedEntryKey = lookupKeys.find((key) => key in journalEntries) || dateKey;
  const currentEntry = journalEntries[resolvedEntryKey] || '';
  const wordCount = currentEntry.trim().split(/\s+/).filter(w => w).length;
  const todayKey = getDateKey(new Date());
  const isViewingPastEntry = dateKey !== todayKey;

  const handleEntryChange = (value: string) => {
    if (isViewingPastEntry) {
      return;
    }

    updateJournal(dateKey, value);
    setIsSaving(true);
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const parseDateKey = (key: string) => new Date(`${key}T12:00:00`);

  const handleViewEntry = (entryDateKey: string) => {
    setSelectedDate(parseDateKey(entryDateKey));
    setIsSaving(false);
  };

  const handleDeleteEntry = (entryDateKey: string) => {
    const confirmed = window.confirm('Delete this journal entry permanently?');
    if (!confirmed) {
      return;
    }

    deleteJournalEntry(entryDateKey);
    toast.success('Journal entry deleted');

    if (entryDateKey === dateKey || entryDateKey === resolvedEntryKey) {
      setSelectedDate(new Date());
      setIsSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const pastEntries = Object.entries(journalEntries)
    .filter(([key, entry]) => key !== dateKey && key !== resolvedEntryKey && entry.trim().length > 0)
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
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent-emerald to-accent-blue bg-clip-text text-transparent">
                Journal
              </h1>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
                <p className="text-chronicle-text-muted">
                  {formatDate(selectedDate)}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-chronicle-text-muted">
                    {wordCount} {wordCount === 1 ? 'word' : 'words'}
                  </span>
                  {isViewingPastEntry && (
                    <button
                      type="button"
                      onClick={() => setSelectedDate(new Date())}
                      className="text-xs px-3 py-1.5 rounded-soft bg-chronicle-bg-dark/60 border border-white/10 text-chronicle-text-light hover:bg-chronicle-bg-dark/80"
                    >
                      Back to Today
                    </button>
                  )}
                </div>
              </div>

              <textarea
                value={currentEntry}
                onChange={(e) => handleEntryChange(e.target.value)}
                placeholder={isViewingPastEntry ? 'Viewing past entry (read-only)' : 'How was your day? What are you thinking about?'}
                className="w-full min-h-[320px] md:min-h-[400px] bg-chronicle-bg-dark/60 border-2 border-white/10 rounded-xl p-4 text-chronicle-text-light resize-none focus:outline-none focus:border-accent-emerald transition-all"
                readOnly={isViewingPastEntry}
                autoFocus
              />

              <div className="text-xs mt-3">
                <span className="text-chronicle-text-muted">
                  {isViewingPastEntry
                    ? 'Viewing a past entry in read-only mode.'
                    : isSaving ? (
                    <span className="text-accent-emerald">Saving changes...</span>
                  ) : (
                    'Auto-saved automatically as you type ✓'
                  )}
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
                      className="p-3 bg-chronicle-bg-dark/60 rounded-lg hover:bg-chronicle-bg-dark/80 transition-colors"
                    >
                      <div className="text-sm font-semibold text-accent-emerald mb-1">
                        {parseDateKey(date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <p className="text-sm text-chronicle-text-muted line-clamp-2">
                        {entry}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewEntry(date)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-soft text-xs border border-white/10 text-chronicle-text-light hover:bg-chronicle-bg-dark/80"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEntry(date)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-soft text-xs border border-accent-rose/40 text-accent-rose hover:bg-accent-rose/10"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
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
