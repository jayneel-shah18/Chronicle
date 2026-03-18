import { useState, FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Flame, Trash2, Check, X } from 'lucide-react';
import Navigation from '../common/Navigation';
import Card from '../common/Card';
import useStore from '../../store/useStore';
import { getDateKey, addDays } from '../../utils/date';
import { toast } from '../common/Toast';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export default function HabitsPage() {
  const [newHabit, setNewHabit] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { habits, habitData, addHabit, updateHabitStatus, deleteHabit } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newHabit.trim()) {
      addHabit(newHabit.trim());
      toast.success('Habit added! 🔥');
      setNewHabit('');
    }
  };

  const handleDeleteHabit = (name: string) => {
    deleteHabit(name);
    toast.info('Habit deleted');
  };

  useKeyboardShortcuts([
    {
      key: 'n',
      callback: () => inputRef.current?.focus(),
    },
  ]);

  // Get current week (7 days starting from today)
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));

  const getStatus = (habitName: string, date: Date) => {
    const key = `${habitName}-${getDateKey(date)}`;
    return habitData[key] || 'none';
  };

  const handleStatusClick = (habitName: string, date: Date, currentStatus: string) => {
    const key = getDateKey(date);
    if (currentStatus === 'success') {
      updateHabitStatus(habitName, key, 'none');
    } else {
      updateHabitStatus(habitName, key, 'success');
      toast.success('Habit completed! 🔥');
    }
  };

  const handleSkip = (habitName: string, date: Date) => {
    const key = getDateKey(date);
    const currentStatus = getStatus(habitName, date);
    if (currentStatus === 'fail') {
      updateHabitStatus(habitName, key, 'none');
    } else {
      updateHabitStatus(habitName, key, 'fail');
    }
  };

  return (
    <div className="min-h-screen bg-chronicle-bg-dark text-chronicle-text-light">
      <Navigation />
      <div className="p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-chronicle-card-bg text-chronicle-text-light px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-white/10 hover:bg-accent-orange/10 hover:border-accent-orange mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <Card className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent-orange to-accent-emerald bg-clip-text text-transparent">
            Habit Tracker
          </h1>
          <p className="text-chronicle-text-muted mb-8">
            Build consistency, one day at a time
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              ref={inputRef}
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="What habit do you want to track?"
              className="input flex-1"
              autoFocus
            />
            <button type="submit" className="btn-primary flex items-center justify-center gap-2 sm:w-auto w-full">
              <Plus size={20} />
              Add Habit
            </button>
          </form>
        </Card>

        {habits.length === 0 ? (
          <Card>
            <p className="text-center text-chronicle-text-muted py-8">
              No habits yet. Add one above to start tracking!
            </p>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-semibold text-chronicle-text-muted">
                      Habit
                    </th>
                    {weekDays.map(day => (
                      <th
                        key={getDateKey(day)}
                        className="text-center py-3 px-2 font-semibold text-chronicle-text-muted min-w-[80px]"
                      >
                        <div className="text-xs">
                          {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-sm">
                          {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </th>
                    ))}
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {habits.map(habit => (
                    <tr key={habit.id} className="border-b border-white/5 hover:bg-white/5 group">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Flame size={16} className="text-accent-orange" />
                          <span className="font-medium">{habit.name}</span>
                        </div>
                      </td>
                      {weekDays.map(day => {
                        const status = getStatus(habit.name, day);
                        return (
                          <td key={getDateKey(day)} className="py-4 px-2">
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleStatusClick(habit.name, day, status)}
                                className={`w-full py-2 rounded-lg transition-all ${
                                  status === 'success'
                                    ? 'bg-accent-emerald text-white'
                                    : 'bg-chronicle-bg-dark/60 hover:bg-accent-emerald/20 text-chronicle-text-muted'
                                }`}
                              >
                                <Check size={16} className="mx-auto" />
                              </button>
                              <button
                                onClick={() => handleSkip(habit.name, day)}
                                className={`w-full py-2 rounded-lg transition-all ${
                                  status === 'fail'
                                    ? 'bg-accent-rose text-white'
                                    : 'bg-chronicle-bg-dark/60 hover:bg-accent-rose/20 text-chronicle-text-muted'
                                }`}
                              >
                                <X size={16} className="mx-auto" />
                              </button>
                            </div>
                          </td>
                        );
                      })}
                      <td className="py-4 px-2">
                        <button
                          onClick={() => handleDeleteHabit(habit.name)}
                          className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-accent-rose hover:scale-110 transform"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
}
